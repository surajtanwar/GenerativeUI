import { agentExecutor } from "@/ai/graph";
import { exposeEndpoints, streamRunnableUI } from "@/utils/server";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { UserProfile } from "@/types/user";

const convertChatHistoryToMessages = (
  chat_history: [role: string, content: string][],
) => {
  return chat_history.map(([role, content]) => {
    switch (role) {
      case "human":
        return new HumanMessage(content);
      case "assistant":
      case "ai":
        return new AIMessage(content);
      default:
        return new HumanMessage(content);
    }
  });
};

function processFile(input: {
  input: string;
  chat_history: [role: string, content: string][];
  file?: {
    base64: string;
    extension: string;
  };
  userProfile?: UserProfile;
}) {
  const baseResult = {
    input: input.input,
    chat_history: input.file
      ? [
          ...convertChatHistoryToMessages(input.chat_history),
          new HumanMessage({
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:image/${input.file.extension};base64,${input.file.base64}`,
                },
              },
            ],
          }),
        ]
      : convertChatHistoryToMessages(input.chat_history),
    userProfile: input.userProfile,
  };

  return baseResult;
}

async function agent(inputs: {
  input: string;
  chat_history: [role: string, content: string][];
  file?: {
    base64: string;
    extension: string;
  };
  userProfile?: UserProfile;
}) {
  "use server";
  const processedInputs = processFile(inputs);

  return streamRunnableUI(agentExecutor(), processedInputs);
 }

export const EndpointsContext = exposeEndpoints({ agent });
