import { BaseMessage } from "@langchain/core/messages";
import { RunnableConfig } from "@langchain/core/runnables";
import { StateGraph, START, END } from "@langchain/langgraph";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { githubTool, invoiceTool, weatherTool, websiteDataTool, menuGeneratorTool } from "./tools";
import { ChatOpenAI } from "@langchain/openai";
import { UserProfile } from "@/types/user";

interface AgentExecutorState {
  input: string;
  chat_history: BaseMessage[];
  userProfile?: UserProfile;
  /**
   * The plain text result of the LLM if
   * no tool was used.
   */
  result?: string;
  /**
   * The parsed tool result that was called.
   */
  toolCall?: {
    name: string;
    parameters: Record<string, any>;
  };
  /**
   * The result of a tool.  
   */
  toolResult?: Record<string, any>;
}

const invokeModel = async (
  state: AgentExecutorState,
  config?: RunnableConfig, //it contains informatio about callbacks and other settings
): Promise<Partial<AgentExecutorState>> => { // Partial- makes all properties optional
  const initialPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a helpful assistant. You're provided a list of tools, and an input from the user.\n
Your job is to determine whether or not you have a tool which can handle the users input, or respond with plain text.`,
    ],
    new MessagesPlaceholder({
      variableName: "chat_history",
      optional: true,
    }),
    ["human", "{input}"],
  ]);

  console.log("Initial Prompt:", initialPrompt);

  const tools = [githubTool, invoiceTool, weatherTool, websiteDataTool, menuGeneratorTool];

  // Create the LLM with tools bound
  const llm = new ChatOpenAI({
    temperature: 0,
    model: "gpt-4o",
    streaming: true,
  }).bindTools(tools);


  const chain = initialPrompt.pipe(llm);
  const result = await chain.invoke(
    {
      input: state.input,
      chat_history: state.chat_history,
    },
    config,
  );

  // Check if the result contains a tool call
  if (result.tool_calls && result.tool_calls.length > 0) {
    return {
      toolCall: { //updating the state with tool call info
        name: result.tool_calls[0].name,
        parameters: result.tool_calls[0].args,
      },
    };
  }
  // Otherwise, return the plain text result
  return { //updating the state with result info
    result: result.content as string,
  };
};

// Conditional function to determine next step
const invokeToolsOrReturn = (state: AgentExecutorState) => {
  if (state.toolCall) {
    return "invokeTools";
  }
  if (state.result) {
    return END;
  }
  throw new Error("No tool call or result found.");
};

// Node to invoke the selected tool
const invokeTools = async (
  state: AgentExecutorState,
  config?: RunnableConfig,
): Promise<Partial<AgentExecutorState>> => {
  if (!state.toolCall) {
    throw new Error("No tool call found.");
  }
  // Map tool names to tool instances
  const toolMap = {
    [githubTool.name]: githubTool,
    [invoiceTool.name]: invoiceTool,
    [weatherTool.name]: weatherTool,
    [websiteDataTool.name]: websiteDataTool,
    [menuGeneratorTool.name]: menuGeneratorTool,
  };

  const selectedTool = toolMap[state.toolCall.name];
  if (!selectedTool) {
    throw new Error("No tool found in tool map.");
  }
  // Pass user profile in config metadata for tools that need it
  const enhancedConfig = {
    ...config,
    metadata: {
      ...config?.metadata,
      userProfile: state.userProfile,
    },
  };

  const toolResult = await selectedTool.invoke(
    state.toolCall.parameters as any,
    enhancedConfig,
  );
  return { // Updating state with tool result
    toolResult: JSON.parse(toolResult),
  };
};


//
export function agentExecutor() {
  const workflow = new StateGraph<AgentExecutorState>({
    channels: {
      input: null,
      chat_history: null,
      userProfile: null,
      result: null,
      toolCall: null,
      toolResult: null,
    },
  })
    .addNode("invokeModel", invokeModel)
    .addNode("invokeTools", invokeTools)
    .addConditionalEdges("invokeModel", invokeToolsOrReturn)
    
    .addEdge(START, "invokeModel")
    .addEdge("invokeTools", END);

  const graph = workflow.compile();
  return graph;
}
