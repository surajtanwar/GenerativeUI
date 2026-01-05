# Settings Menu Structure Visual Guide

This document shows the exact menu structures generated for each user role when requesting Bluetooth settings.

---

## Parent Role Menu Structure

**Design Intent:**
1. Full control
2. Configuration & security
3. Advanced visibility

### Full Menu Tree

```
Settings
│
└─ Network
   │
   └─ Connections
      │
      └─ Bluetooth
         │
         ├─ Enable / Disable
         │  └─ [Toggle Switch]
         │
         ├─ Pair New Device
         │  └─ [Action Button]
         │     └─ Description: "Search and pair a new Bluetooth device"
         │
         ├─ Paired Devices
         │  └─ [Submenu]
         │     ├─ My Headphones
         │     │  └─ [Action: Connect to this device]
         │     │
         │     └─ Car Audio
         │        └─ [Action: Connect to this device]
         │
         ├─ Permissions (Child Access)
         │  └─ [Submenu with Lock Icon]
         │     │ Description: "Control which devices children can connect to"
         │     │
         │     ├─ Allow All Devices
         │     │  └─ [Toggle Switch]
         │     │     Description: "Allow children to connect to any device"
         │     │
         │     └─ Allowed Devices List
         │        └─ [Submenu]
         │           └─ Study Room Speaker
         │              └─ [Toggle Switch]
         │                 Description: "Allow children to use this device"
         │
         ├─ Security
         │  └─ [Submenu with Security Icon]
         │     │ Description: "Bluetooth security and pairing settings"
         │     │
         │     ├─ Pairing Mode
         │     │  └─ [Action Button]
         │     │     Description: "Open/Close pairing mode"
         │     │
         │     ├─ Auto-Pair Trusted Devices
         │     │  └─ [Toggle Switch]
         │     │     Description: "Automatically pair previously trusted devices"
         │     │
         │     └─ Device Visibility
         │        └─ [Action Button]
         │           Description: "Make device discoverable"
         │
         └─ Advanced
            └─ [Submenu]
               │ Description: "Advanced Bluetooth configuration"
               │
               ├─ Audio Codec
               │  └─ [Action Button]
               │     Description: "Select audio codec (AAC, SBC, aptX)"
               │
               ├─ Transmission Range
               │  └─ [Action Button]
               │     Description: "Adjust Bluetooth range"
               │
               └─ Reset Bluetooth
                  └─ [Action Button - Requires Confirmation]
                     Description: "Reset all Bluetooth settings"
                     Warning: "This will unpair all devices"
```

### Features Available

- ✅ Full menu hierarchy (4 levels deep)
- ✅ All configuration options visible
- ✅ Security settings accessible
- ✅ Advanced options available
- ✅ Child permission controls
- ✅ Device management
- ✅ No restrictions

### Visual Appearance

- **Theme Color**: Green (bg-green-50 border-green-200)
- **Role Badge**: Green badge showing "PARENT"
- **Icons**: Network, WiFi, Bluetooth, Security, Device icons
- **Breadcrumb**: Settings → Network → Connections → Bluetooth

---

## Child Role Menu Structure

**Design Intent:**
1. Safety-first
2. No system-level changes
3. Minimal cognitive load

### Simplified Menu Tree

```
Settings
│
└─ Connectivity
   │
   └─ Bluetooth
      │
      ├─ On / Off
      │  └─ [Toggle Switch]
      │     Description: "Turn Bluetooth on or off"
      │
      └─ My Devices
         └─ [Submenu with Device Icon]
            │ Description: "Devices you can connect to"
            │
            └─ Study Room Speaker
               └─ [Action Button with "Allowed" Badge]
                  Description: "Tap to connect"
```

### Features Available

- ✅ Simplified 2-level menu structure
- ✅ Basic toggle (On/Off only)
- ✅ Pre-approved devices only
- ❌ Cannot pair new devices
- ❌ No security settings
- ❌ No advanced options
- ❌ No permission controls

### Visual Appearance

- **Theme Color**: Blue (bg-blue-50 border-blue-200)
- **Role Badge**: Blue badge showing "CHILD"
- **Icons**: WiFi, Bluetooth, Device icons
- **Breadcrumb**: Settings → Connectivity → Bluetooth

### Restrictions Displayed

- "Cannot pair new devices"
- "Can only connect to pre-approved devices"
- "No access to security settings"

---

## Guest Role Menu Structure

**Design Intent:**
1. Temporary access
2. No persistent changes
3. Frictionless experience

### Quick Access Menu Tree

```
Settings
│
└─ Quick Connectivity
   │ Description: "Temporary connections only"
   │
   └─ Bluetooth
      │ Description: "Temporary Bluetooth connections"
      │
      ├─ Connect Temporary Device
      │  └─ [Action Button with "Temporary" Badge]
      │     Description: "Connect a device (will disconnect when you leave)"
      │     Icon: Device
      │
      └─ Disconnect
         └─ [Action Button]
            Description: "Disconnect all temporary connections"
```

### Features Available

- ✅ Minimal 2-level menu structure
- ✅ Quick connection option
- ✅ Simple disconnect option
- ❌ Cannot pair devices
- ❌ No persistent settings
- ❌ No advanced options
- ❌ No security settings

### Visual Appearance

- **Theme Color**: Gray (bg-gray-50 border-gray-200)
- **Role Badge**: Gray badge showing "GUEST"
- **Icons**: WiFi, Bluetooth, Device icons
- **Breadcrumb**: Settings → Quick Connectivity → Bluetooth

### Restrictions Displayed

- "Connections reset on session end"
- "Cannot pair new devices"
- "No permanent changes"

---

## Comparison Table

| Feature | Parent | Child | Guest |
|---------|--------|-------|-------|
| **Menu Depth** | 4 levels | 2 levels | 2 levels |
| **Total Menu Items** | ~15+ items | 3 items | 2 items |
| **Can Pair Devices** | ✅ Yes | ❌ No | ❌ No |
| **Security Settings** | ✅ Yes | ❌ No | ❌ No |
| **Advanced Options** | ✅ Yes | ❌ No | ❌ No |
| **Child Permissions** | ✅ Yes | ❌ No | ❌ No |
| **Device Management** | ✅ Full | ✅ Limited | ❌ No |
| **Persistent Changes** | ✅ Yes | ✅ Yes | ❌ No |
| **Theme Color** | Green | Blue | Gray |

---

## Example Queries and Results

### Query: "Show me Bluetooth settings"

#### Parent Role Response:
```
[Full hierarchical menu with all 15+ options including:
 - Enable/Disable toggle
 - Pair New Device button
 - Paired Devices submenu
 - Permissions (Child Access) submenu
 - Security submenu
 - Advanced submenu]
```

#### Child Role Response:
```
[Simplified menu with:
 - On/Off toggle
 - My Devices submenu (pre-approved devices only)]
```

#### Guest Role Response:
```
[Quick menu with:
 - Connect Temporary Device button
 - Disconnect button]
```

---

## Visual Representation

### Parent Menu (Collapsed View)
```
┌─────────────────────────────────────────┐
│ 🔧 Settings            [PARENT] [92%]   │
│ Settings → Network → Connections → BT   │
│                                          │
│ Design Intent:                          │
│ [Full control] [Config & security]      │
│ [Advanced visibility]                   │
│                                          │
│ ▼ Network                               │
│   ▼ Connections                         │
│     ▼ Bluetooth                         │
│       [ ] Enable / Disable              │
│       [Button] Pair New Device          │
│       [>] Paired Devices                │
│       [🔒] Permissions (Child Access)   │
│       [🛡️] Security                     │
│       [>] Advanced                      │
└─────────────────────────────────────────┘
```

### Child Menu (Collapsed View)
```
┌─────────────────────────────────────────┐
│ 🔧 Settings            [CHILD] [92%]    │
│ Settings → Connectivity → Bluetooth     │
│                                          │
│ Design Intent:                          │
│ [Safety-first] [No system changes]      │
│ [Minimal cognitive load]                │
│                                          │
│ Restrictions:                           │
│ • Cannot pair new devices               │
│ • Can only connect to pre-approved      │
│ • No access to security settings        │
│                                          │
│ ▼ Connectivity                          │
│   ▼ Bluetooth                           │
│       [ ] On / Off                      │
│       [>] My Devices                    │
└─────────────────────────────────────────┘
```

### Guest Menu (Collapsed View)
```
┌─────────────────────────────────────────┐
│ 🔧 Settings            [GUEST] [92%]    │
│ Settings → Quick Connectivity → BT      │
│                                          │
│ Design Intent:                          │
│ [Temporary access] [No persistent]      │
│ [Frictionless experience]               │
│                                          │
│ Restrictions:                           │
│ • Connections reset on session end      │
│ • Cannot pair new devices               │
│ • No permanent changes                  │
│                                          │
│ ▼ Quick Connectivity                    │
│   ▼ Bluetooth                           │
│       [Button] Connect Temporary Device │
│              [Temporary]                │
│       [Button] Disconnect               │
└─────────────────────────────────────────┘
```

---

## Interactive Features

### Toggle Switches
- **Parent**: All toggles are enabled and functional
- **Child**: Only basic toggles (On/Off) are enabled
- **Guest**: Toggles are limited or disabled

### Action Buttons
- **Parent**: All action buttons are clickable
- **Child**: Only approved device actions are clickable
- **Guest**: Only temporary connection actions are clickable

### Submenus (Collapsible)
- Click to expand/collapse
- Shows chevron icon (▶ when closed, ▼ when open)
- Parent: Deep nesting (4 levels)
- Child: Shallow nesting (2 levels)
- Guest: Shallow nesting (2 levels)

### Badges
- **Parent**: No restriction badges
- **Child**: "Allowed" badge on approved devices
- **Guest**: "Temporary" badge on connection options

---

## How to Test

1. **Select Parent Role**
   - Click "Parent Mode" button
   - Ask: "Show me Bluetooth settings"
   - See: Full hierarchical menu with all options

2. **Select Child Role**
   - Click "Child Mode" button
   - Ask: "Show me Bluetooth settings"
   - See: Simplified menu with On/Off and My Devices

3. **Select Guest Role**
   - Click "Guest Mode" button
   - Ask: "Show me Bluetooth settings"
   - See: Quick menu with temporary connection options

Each role will generate a completely different menu structure based on the design intent and restrictions!


