# Menu Testing Guide

## Current Status

The settings menu generator is implemented and should work according to the MENU_GENERATOR_README.md specifications.

## How to Test

### Step 1: Start the Application
```bash
npm run dev
```

### Step 2: Test Menu Generation

Since the role selector has been removed, the application defaults to **Guest** role. 

Ask the AI one of these queries:
- "Show me Bluetooth settings"
- "I want to connect my headphones"
- "Bluetooth menu"
- "Configure Bluetooth"

### Expected Result for Guest Role

You should see a menu with this structure:
```
Settings
 └─ Quick Connectivity
     └─ Bluetooth
         ├─ Connect Temporary Device [Temporary badge]
         └─ Disconnect
```

### Testing Different Roles

Currently, the role is hardcoded to "guest" in `components/prebuilt/chat.tsx`:

```typescript
const [userRole, setUserRole] = useState<UserRole>("guest");
```

To test different roles, you can temporarily change this line:

**For Parent Role:**
```typescript
const [userRole, setUserRole] = useState<UserRole>("parent");
```

**For Child Role:**
```typescript
const [userRole, setUserRole] = useState<UserRole>("child");
```

### Menu Structures by Role

#### Parent Role
- **Path:** Settings → Network → Connections → Bluetooth
- **Items:** Enable/Disable, Pair New Device, Paired Devices, Permissions (Child Access), Security, Advanced
- **Color:** Green theme

#### Child Role
- **Path:** Settings → Connectivity → Bluetooth  
- **Items:** On/Off toggle, My Devices
- **Color:** Blue theme

#### Guest Role (Default)
- **Path:** Settings → Quick Connectivity → Bluetooth
- **Items:** Connect Temporary Device, Disconnect
- **Color:** Gray theme

## Troubleshooting

### Menu Not Appearing?

1. **Check the browser console** for any errors
2. **Verify the tool is being called** - The LLM should automatically recognize settings-related queries
3. **Check the userProfile** is being passed correctly

### Menu Structure Doesn't Match?

1. **Verify the role** - Check what role is set in chat.tsx
2. **Check the query** - Make sure your query includes words like "settings", "Bluetooth", "connect", etc.
3. **Verify the menu generator** - The tool should detect Bluetooth-related requests automatically

### LLM Not Calling the Tool?

The tool description has been enhanced to be more explicit. If the LLM still doesn't call it, you can:

1. Be more explicit in your query: "Use the generate_settings_menu tool to show me Bluetooth settings"
2. Check if the tool is in the tools array in `ai/graph.tsx`
3. Verify the tool description is clear enough

## Implementation Files

- `ai/tools/menu-generator.tsx` - Menu generation logic
- `components/prebuilt/hierarchical-menu.tsx` - Menu UI renderer
- `types/menu.ts` - Menu type definitions
- `types/user.ts` - User profile types
- `ai/graph.tsx` - Graph integration
- `components/prebuilt/chat.tsx` - Default role setting

## Next Steps

If you want to test different roles easily, consider:
1. Adding the role selector back
2. Adding a URL parameter to set the role
3. Adding a debug menu to switch roles
4. Using environment variables to set default role


