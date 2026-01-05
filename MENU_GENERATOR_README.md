# Hierarchical Menu Generator Tool

## Overview

This tool generates role-aware hierarchical settings menu structures for smart home appliances. The menu structure adapts based on user role (Parent, Child, or Guest) with different design intents and restrictions.

## Menu Structures

### Parent Role

**Design Intent:**
1. Full control
2. Configuration & security
3. Advanced visibility

**Menu Structure:**
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

### Child Role

**Design Intent:**
1. Safety-first
2. No system-level changes
3. Minimal cognitive load

**Menu Structure:**
```
Settings
 └─ Connectivity
     └─ Bluetooth
         ├─ On / Off
         └─ My Devices
```

### Guest Role

**Design Intent:**
1. Temporary access
2. No persistent changes
3. Frictionless experience

**Menu Structure:**
```
Settings
 └─ Quick Connectivity
     └─ Bluetooth
         ├─ Connect Temporary Device
         └─ Disconnect
```

## Usage

### Tool Name
`generate_settings_menu`

### Example Queries
- "Show me Bluetooth settings"
- "I want to connect my headphones"
- "Configure network settings"
- "Bluetooth menu"

### Response
The tool generates a hierarchical menu structure with:
- Collapsible menu items
- Role-appropriate options
- Design intent indicators
- Restriction warnings
- Interactive toggles and actions

## Implementation

The tool is integrated into the LangGraph agent and automatically:
1. Detects user intent from query
2. Determines user role (defaults to guest if not provided)
3. Generates appropriate menu structure
4. Renders UI via streaming React components

## Files

- `types/menu.ts` - Type definitions
- `ai/tools/menu-generator.tsx` - Tool implementation
- `components/prebuilt/hierarchical-menu.tsx` - UI renderer
- `types/user.ts` - User profile types


