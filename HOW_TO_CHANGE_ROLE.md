# How to Change User Role

## Overview

The application supports three user roles: **Parent**, **Child**, and **Guest**. Each role has different permissions and generates different UI structures, especially for settings menus.

## Changing Roles

### Step 1: Open the Chat Interface

1. Launch the application
2. The chat interface will display a **User Profile Selector** at the top

### Step 2: Select Your Role

The User Profile Selector displays three buttons:

- **Child Mode** 👶
  - Description: "Limited controls, safe content only"
  - Color: Blue theme
  
- **Parent Mode** 👨‍👩‍👧
  - Description: "Full control and all features"
  - Color: Green theme
  
- **Guest Mode** 👤
  - Description: "Quick presets, basic features"
  - Color: Gray theme

### Step 3: Click on Your Desired Role

Simply click the button for the role you want to use. The selected role will be highlighted with an "Active" badge.

## What Changes When You Switch Roles?

### Immediate Changes

1. **Role Badge**: The active role is highlighted
2. **User Profile**: The application updates the internal user profile
3. **Future Requests**: All subsequent requests will use the new role

### Menu Structure Changes

When you request settings menus (e.g., "Show me Bluetooth settings"), you'll see different menu structures:

#### Parent Role
```
Settings
 └─ Network
     └─ Connections
         └─ Bluetooth
             ├─ Enable / Disable
             ├─ Pair New Device
             ├─ Paired Devices
             ├─ Permissions (Child Access)
             ├─ Security
             └─ Advanced
```

#### Child Role
```
Settings
 └─ Connectivity
     └─ Bluetooth
         ├─ On / Off
         └─ My Devices
```

#### Guest Role
```
Settings
 └─ Quick Connectivity
     └─ Bluetooth
         ├─ Connect Temporary Device
         └─ Disconnect
```

### Permission Changes

#### Parent Mode
- ✅ Full access to all tools
- ✅ Can upload files
- ✅ Advanced settings visible
- ✅ Can modify all settings
- ✅ Complete menu hierarchy

#### Child Mode
- ✅ Can use weather tool only
- ❌ Cannot use GitHub, web scraping, invoice tools
- ❌ Cannot upload files
- ❌ Limited menu options
- ✅ Safe, simplified interface

#### Guest Mode
- ✅ Can use weather tool only
- ❌ Cannot use advanced tools
- ❌ Cannot upload files
- ❌ Quick access menus only
- ✅ Temporary connections

## Example Usage

### Switching to Parent Mode

1. Click the **"Parent Mode"** button
2. Ask: *"Show me Bluetooth settings"*
3. You'll see the full hierarchical menu with all options including Security and Advanced settings

### Switching to Child Mode

1. Click the **"Child Mode"** button
2. Ask: *"I want to connect my headphones"*
3. You'll see a simplified menu with only "On/Off" toggle and "My Devices" (pre-approved devices only)

### Switching to Guest Mode

1. Click the **"Guest Mode"** button
2. Ask: *"Connect Bluetooth device"*
3. You'll see a quick menu with "Connect Temporary Device" and "Disconnect" options

## Visual Indicators

- **Active Role Badge**: Shows which role is currently selected
- **Color Coding**: Each role has a distinct color theme
  - Parent: Green
  - Child: Blue
  - Guest: Gray
- **Menu Theme**: Generated menus match the role's color theme

## Technical Details

The role selection:
- Stores the role in component state
- Creates a UserProfile object with role-specific permissions
- Passes the profile to the agent function
- Agent passes profile to LangGraph via state
- LangGraph passes profile to tools via config metadata
- Tools generate role-appropriate UI

## Best Practices

1. **Test Different Roles**: Switch between roles to see how the UI adapts
2. **Parent for Full Access**: Use Parent mode when you need all features
3. **Child for Safety**: Use Child mode to test restricted access
4. **Guest for Quick Access**: Use Guest mode for temporary, quick interactions

## Troubleshooting

### Role Not Changing?

- Make sure you clicked the role button (it should show an "Active" badge)
- Refresh the page if the change doesn't seem to apply
- Check the browser console for any errors

### Menu Structure Not Adapting?

- Make sure you're asking for settings menus (e.g., "Show me Bluetooth settings")
- The menu generator tool will use your current selected role
- Try switching roles and asking the same question to see the difference

## Summary

Changing roles is as simple as:
1. **Look for** the User Profile Selector at the top of the chat interface
2. **Click** the role button you want (Child, Parent, or Guest)
3. **See** the "Active" badge appear on your selected role
4. **Experience** role-appropriate UI and menus in subsequent requests

The role change takes effect immediately for all new requests!


