# Adaptive Multi-User Interface Implementation

## Overview

This implementation adds adaptive multi-user interface capabilities to the Generative UI application. The system adapts the UI, permissions, and available features based on the user's role (Child, Parent, or Guest).

## Features Implemented

### 1. **User Role System**
- Three user roles: `child`, `parent`, `guest`
- Each role has specific permissions and restrictions
- Role-based tool access control

### 2. **Role-Specific Permissions**

#### **Child Mode** 👶
- ✅ Can use weather tool
- ❌ Cannot use GitHub, web scraping, or invoice tools
- ❌ Cannot upload files
- ❌ Cannot access advanced options
- ❌ Cannot modify settings
- 📏 Response length limited to 500 characters
- 🔒 Content filtering (blocked keywords)

#### **Parent Mode** 👨‍👩‍👧
- ✅ Full access to all tools (weather, GitHub, web scraping, invoice)
- ✅ Can upload files
- ✅ Can access advanced options
- ✅ Can modify settings
- 📏 No response length restrictions

#### **Guest Mode** 👤
- ✅ Can use weather tool
- ❌ Cannot use GitHub, web scraping, or invoice tools
- ❌ Cannot upload files
- ❌ Cannot access advanced options
- ❌ Cannot modify settings
- 📏 Response length limited to 300 characters

### 3. **UI Components**

#### **UserSelector Component**
- Visual role selector with descriptions
- Shows active role badge
- Easy role switching

#### **RoleBasedLayout Component**
- Role indicator banner
- Visual permission indicators (lock/unlock icons)
- Color-coded by role:
  - Child: Blue theme
  - Parent: Green theme
  - Guest: Gray theme

### 4. **Adaptive AI Behavior**

The LangGraph agent now:
- Receives user profile context
- Filters available tools based on permissions
- Adjusts system prompts based on role
- Provides role-appropriate responses
- Enforces permission checks before tool execution

### 5. **Permission Enforcement**

- **Tool Level**: Tools are filtered before being bound to the LLM
- **Execution Level**: Permission checks before tool invocation
- **UI Level**: File upload and advanced features hidden/disabled based on role

## File Structure

```
types/
  └── user.ts                    # User role types and permissions

components/prebuilt/
  ├── user-selector.tsx          # Role selection component
  ├── role-based-layout.tsx      # Layout wrapper with role indicators
  └── chat.tsx                   # Updated with user profile support

app/
  └── agent.tsx                  # Updated to accept userProfile

ai/
  └── graph.tsx                  # Updated with role-aware logic
```

## Usage Example

### Switching Roles

1. User selects role from the `UserSelector` component
2. UI immediately adapts:
   - File upload button appears/disappears
   - Input placeholder changes
   - Role indicator banner updates
   - Permission icons update

### Making Requests

```typescript
// Child tries to use GitHub tool
User: "Show me the facebook/react repository"
AI: "Sorry, you don't have permission to use the github_repo tool. 
     Please contact an administrator or switch to a different user profile."

// Parent uses GitHub tool
User: "Show me the facebook/react repository"
AI: [Displays GitHub repository card with full details]
```

## Implementation Details

### 1. User Profile Type System

```typescript
// types/user.ts
export type UserRole = "child" | "parent" | "guest";

export interface UserProfile {
  role: UserRole;
  name?: string;
  permissions: UserPermissions;
}
```

### 2. Role-Aware System Prompt

The LangGraph agent receives a customized system prompt based on the user's role:

- **Child**: "Keep responses simple, safe, and age-appropriate"
- **Parent**: "Full access to all tools and detailed responses"
- **Guest**: "Quick, preset responses with basic features only"

### 3. Tool Filtering

Tools are filtered before being bound to the LLM:

```typescript
const tools = permissions
  ? allTools.filter((tool) => {
      // Check permission for each tool
      if (toolName === "get_weather") return permissions.canUseWeather;
      // ... etc
    })
  : allTools;
```

### 4. Permission Checks

Before tool execution:

```typescript
if (permissions && !isAllowed) {
  return {
    result: "Sorry, you don't have permission to use this tool..."
  };
}
```

## Testing the Implementation

### Test Child Mode
1. Select "Child Mode" from the selector
2. Try: "What's the weather in San Francisco?" ✅ Should work
3. Try: "Show me the facebook/react repository" ❌ Should be blocked
4. Try to upload a file ❌ File upload should be hidden

### Test Parent Mode
1. Select "Parent Mode" from the selector
2. All tools should be available ✅
3. File upload should be visible ✅
4. All features should work ✅

### Test Guest Mode
1. Select "Guest Mode" from the selector
2. Weather tool should work ✅
3. Other tools should be blocked ❌
4. Responses should be shorter (300 char limit)

## Future Enhancements

1. **Persistent User Sessions**: Save user preferences
2. **Custom Roles**: Allow creating custom role configurations
3. **Time-based Restrictions**: Limit child access during certain hours
4. **Activity Logging**: Track tool usage by role
5. **Parental Controls Dashboard**: Parents can configure child restrictions
6. **Multi-user Support**: Multiple users on same device with profiles

## Benefits

✅ **Security**: Role-based access control prevents unauthorized tool usage
✅ **User Experience**: UI adapts to user needs and capabilities
✅ **Content Safety**: Child mode filters inappropriate content
✅ **Flexibility**: Easy to add new roles or modify permissions
✅ **Generative UI**: Demonstrates adaptive UI generation based on context

## Conclusion

This implementation successfully demonstrates how Generative UI can adapt to different user profiles, providing personalized experiences while maintaining security and appropriate access controls. The system is extensible and can be easily modified to support additional roles or permission configurations.


