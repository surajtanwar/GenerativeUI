# Settings Menu Quick Reference

This is a quick reference showing exactly what menu structures you'll see for each role when you ask for Bluetooth settings.

---

## 🟢 Parent Role - Full Menu

**When you ask:** *"Show me Bluetooth settings"* or *"I want to connect my headphones"*

**You'll see:**

### Menu Card Header
- **Title:** Settings
- **Role Badge:** PARENT (green badge)
- **Breadcrumb:** Settings → Network → Connections → Bluetooth
- **Design Intent Badges:** [Full control] [Configuration & security] [Advanced visibility]

### Menu Items (All Expandable)

1. **Network** ▶ (Click to expand)
   - **Connections** ▶ (Click to expand)
     - **Bluetooth** ▼ (Expanded by default)
       - **[Toggle Switch]** Enable / Disable
       - **[Button]** Pair New Device
       - **Paired Devices** ▶
         - My Headphones [Connect button]
         - Car Audio [Connect button]
       - **Permissions (Child Access)** 🔒 ▶
         - **[Toggle]** Allow All Devices
         - **Allowed Devices List** ▶
           - Study Room Speaker [Toggle]
       - **Security** 🛡️ ▶
         - Pairing Mode [Button]
         - Auto-Pair Trusted Devices [Toggle]
       - **Advanced** ▶
         - Audio Codec [Button]
         - Transmission Range [Button]

**Total Items:** ~15+ menu items across 4 levels

---

## 🔵 Child Role - Simplified Menu

**When you ask:** *"Show me Bluetooth settings"* or *"I want to connect my headphones"*

**You'll see:**

### Menu Card Header
- **Title:** Settings
- **Role Badge:** CHILD (blue badge)
- **Breadcrumb:** Settings → Connectivity → Bluetooth
- **Design Intent Badges:** [Safety-first] [No system-level changes] [Minimal cognitive load]
- **Restrictions List:**
  - Cannot pair new devices
  - Can only connect to pre-approved devices
  - No access to security settings

### Menu Items (Simplified)

1. **Connectivity** ▶ (Click to expand)
   - **Bluetooth** ▼ (Expanded by default)
     - **[Toggle Switch]** On / Off
     - **My Devices** ▶
       - Study Room Speaker [Allowed Badge] [Connect button]

**Total Items:** 3 menu items across 2 levels

---

## ⚪ Guest Role - Quick Menu

**When you ask:** *"Show me Bluetooth settings"* or *"I want to connect my headphones"*

**You'll see:**

### Menu Card Header
- **Title:** Settings
- **Role Badge:** GUEST (gray badge)
- **Breadcrumb:** Settings → Quick Connectivity → Bluetooth
- **Design Intent Badges:** [Temporary access] [No persistent changes] [Frictionless experience]
- **Restrictions List:**
  - Connections reset on session end
  - Cannot pair new devices
  - No permanent changes

### Menu Items (Quick Access)

1. **Quick Connectivity** ▶ (Click to expand)
   - **Bluetooth** ▼ (Expanded by default)
     - **[Button with Badge]** Connect Temporary Device [Temporary]
     - **[Button]** Disconnect

**Total Items:** 2 menu items across 2 levels

---

## 🎯 How to See It In Action

### Step-by-Step Instructions

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Select a role** (use the role selector at the top)
   - Click "Parent Mode", "Child Mode", or "Guest Mode"

3. **Ask for Bluetooth settings**
   Type one of these queries:
   - "Show me Bluetooth settings"
   - "I want to connect my headphones"
   - "Configure Bluetooth"
   - "Bluetooth menu"

4. **Observe the menu**
   - The menu will appear with the appropriate structure for your selected role
   - Click items to expand/collapse submenus
   - Toggle switches and click buttons to interact

---

## 📊 Side-by-Side Comparison

| Aspect | Parent | Child | Guest |
|--------|--------|-------|-------|
| **Menu Levels** | 4 deep | 2 deep | 2 deep |
| **Total Options** | ~15+ | 3 | 2 |
| **Can Pair Devices** | ✅ | ❌ | ❌ |
| **Security Settings** | ✅ | ❌ | ❌ |
| **Advanced Options** | ✅ | ❌ | ❌ |
| **Color Theme** | Green | Blue | Gray |
| **Complexity** | High | Low | Minimal |

---

## 🖼️ Visual Mockup

### Parent Menu Structure
```
┌─────────────────────────────────────────────┐
│ ⚙️ Settings                    [PARENT]     │
│ Settings → Network → Connections → Bluetooth│
│                                              │
│ Design Intent:                               │
│ [Full control] [Config & security]          │
│ [Advanced visibility]                       │
│                                              │
│ ┌─────────────────────────────────────────┐ │
│ │ ▼ Network                               │ │
│ │   ▼ Connections                         │ │
│ │     ▼ Bluetooth                         │ │
│ │       ⚪ Enable / Disable               │ │
│ │       [  Pair New Device  ]            │ │
│ │       ▶ Paired Devices                 │ │
│ │       🔒 ▶ Permissions (Child Access)  │ │
│ │       🛡️ ▶ Security                    │ │
│ │       ▶ Advanced                       │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Child Menu Structure
```
┌─────────────────────────────────────────────┐
│ ⚙️ Settings                     [CHILD]     │
│ Settings → Connectivity → Bluetooth         │
│                                              │
│ Design Intent:                               │
│ [Safety-first] [No system changes]          │
│ [Minimal cognitive load]                    │
│                                              │
│ Restrictions:                                │
│ • Cannot pair new devices                    │
│ • Can only connect to pre-approved           │
│ • No access to security settings             │
│                                              │
│ ┌─────────────────────────────────────────┐ │
│ │ ▼ Connectivity                          │ │
│ │   ▼ Bluetooth                           │ │
│ │       ⚪ On / Off                       │ │
│ │       ▶ My Devices                      │ │
│ │         Study Room Speaker [Allowed]    │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Guest Menu Structure
```
┌─────────────────────────────────────────────┐
│ ⚙️ Settings                    [GUEST]      │
│ Settings → Quick Connectivity → Bluetooth   │
│                                              │
│ Design Intent:                               │
│ [Temporary access] [No persistent]          │
│ [Frictionless experience]                   │
│                                              │
│ Restrictions:                                │
│ • Connections reset on session end           │
│ • Cannot pair new devices                    │
│ • No permanent changes                       │
│                                              │
│ ┌─────────────────────────────────────────┐ │
│ │ ▼ Quick Connectivity                    │ │
│ │   ▼ Bluetooth                           │ │
│ │       [Connect Temporary Device] [Temp] │ │
│ │       [    Disconnect     ]            │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## ✨ Key Features to Notice

### Parent Role
- **Deep nesting:** Up to 4 levels of menu hierarchy
- **All options visible:** Nothing is hidden
- **Full control:** Every toggle and button is enabled
- **Security section:** Advanced security options
- **Child permissions:** Can manage what children can access

### Child Role
- **Flat structure:** Only 2 levels deep
- **Limited options:** Only essential controls
- **Safety indicators:** Restrictions clearly displayed
- **Pre-approved devices:** Can only see allowed devices
- **Simple language:** Clear, easy-to-understand labels

### Guest Role
- **Minimal interface:** Just 2 buttons
- **Temporary focus:** Everything is session-based
- **Quick actions:** No configuration needed
- **Clear restrictions:** Temporary nature is obvious
- **Frictionless:** Get connected quickly

---

## 🔍 Testing Different Scenarios

### Scenario 1: Full Configuration (Parent)
1. Select **Parent Mode**
2. Ask: *"Show me Bluetooth settings"*
3. Expand all submenus
4. You'll see: Complete hierarchy with all options

### Scenario 2: Simple Connection (Child)
1. Select **Child Mode**
2. Ask: *"I want to connect my headphones"*
3. You'll see: Simple toggle and "My Devices" list
4. Only approved devices are visible

### Scenario 3: Quick Connect (Guest)
1. Select **Guest Mode**
2. Ask: *"Connect Bluetooth device"*
3. You'll see: Two simple buttons
4. Connection will be temporary

---

## 💡 Tips

1. **Switch roles mid-session** to see how the same query produces different menus
2. **Click expandable items** (▶) to see nested options
3. **Hover over items** to see descriptions (if available)
4. **Check the restrictions list** to understand what's not available for each role
5. **Notice the color themes** - each role has a distinct color scheme

---

The menu generator automatically creates these structures based on your selected role and the query you provide!


