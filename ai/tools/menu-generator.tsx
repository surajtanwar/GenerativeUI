import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { CUSTOM_UI_YIELD_NAME } from "@/utils/server";
import { dispatchCustomEvent } from "@langchain/core/callbacks/dispatch/web";
import { HierarchicalMenu, HierarchicalMenuLoading } from "@/components/prebuilt/hierarchical-menu";
import { MenuStructure, MenuItem, UserRole } from "@/types/menu";
import { UserProfile, createUserProfile } from "@/types/user";

const menuRequestSchema = z.object({
  user_query: z
    .string()
    .describe("User's request for settings menu or configuration"),
  device_type: z
    .string()
    .optional()
    .default("generic")
    .describe("Type of smart home device"),
});

/**
 * Detect user role from query text
 */
function detectRoleFromQuery(query: string): UserRole | null {
  const lowerQuery = query.toLowerCase();
  
  // Parent mode indicators
  const parentIndicators = [
    "parent",
    "parent mode",
    "parent settings",
    "full control",
    "full access",
    "advanced",
    "advanced settings",
    "all features",
    "complete",
    "admin",
    "administrator",
  ];
  
  // Child mode indicators
  const childIndicators = [
    "child",
    "child mode",
    "child settings",
    "simple",
    "simplified",
    "safe",
    "safe mode",
    "limited",
    "basic",
    "kid",
    "kids",
  ];
  
  // Guest mode indicators
  const guestIndicators = [
    "guest",
    "guest mode",
    "guest settings",
    "temporary",
    "quick",
    "quick access",
    "temporary access",
  ];
  
  // Check for parent indicators
  if (parentIndicators.some(indicator => lowerQuery.includes(indicator))) {
    return "parent";
  }
  
  // Check for child indicators
  if (childIndicators.some(indicator => lowerQuery.includes(indicator))) {
    return "child";
  }
  
  // Check for guest indicators
  if (guestIndicators.some(indicator => lowerQuery.includes(indicator))) {
    return "guest";
  }
  
  return null;
}

/**
 * Generate hierarchical menu structure based on role and intent
 */
function generateMenuStructure(
  query: string,
  userProfile: UserProfile,
): MenuStructure {
  const lowerQuery = query.toLowerCase();
  const role = userProfile.role;

  // Detect what menu they're asking for
  const isBluetoothRequest =
    lowerQuery.includes("bluetooth") ||
    lowerQuery.includes("headphone") ||
    lowerQuery.includes("connect") ||
    lowerQuery.includes("pair");

  // Generate menu based on role
  if (role === "parent") {
    return generateParentMenu(isBluetoothRequest);
  } else if (role === "child") {
    return generateChildMenu(isBluetoothRequest);
  } else {
    return generateGuestMenu(isBluetoothRequest);
  }
}

/**
 * Generate Parent role menu - Full control, advanced options
 */
function generateParentMenu(isBluetooth: boolean): MenuStructure {
  if (isBluetooth) {
    return {
      root: {
        id: "settings",
        label: "Settings",
        icon: "settings",
        children: [
          {
            id: "network",
            label: "Network",
            type: "menu",
            icon: "network",
            children: [
              {
                id: "connections",
                label: "Connections",
                type: "menu",
                icon: "wifi",
                children: [
                  {
                    id: "bluetooth",
                    label: "Bluetooth",
                    type: "submenu",
                    icon: "bluetooth",
                    description: "Manage Bluetooth connections and devices",
                    children: [
                      {
                        id: "bluetooth_enable",
                        label: "Enable / Disable",
                        type: "toggle",
                        action: "toggle_bluetooth",
                        value: true,
                        description: "Turn Bluetooth on or off",
                      },
                      {
                        id: "bluetooth_pair",
                        label: "Pair New Device",
                        type: "action",
                        action: "pair_device",
                        description: "Search and pair a new Bluetooth device",
                        icon: "device",
                      },
                      {
                        id: "bluetooth_paired",
                        label: "Paired Devices",
                        type: "submenu",
                        action: "view_paired_devices",
                        description: "View and manage paired devices",
                        children: [
                          {
                            id: "device_1",
                            label: "My Headphones",
                            type: "action",
                            action: "connect_device",
                            description: "Connect to this device",
                          },
                          {
                            id: "device_2",
                            label: "Car Audio",
                            type: "action",
                            action: "connect_device",
                            description: "Connect to this device",
                          },
                        ],
                      },
                      {
                        id: "bluetooth_permissions",
                        label: "Permissions (Child Access)",
                        type: "submenu",
                        action: "manage_permissions",
                        description: "Control which devices children can connect to",
                        icon: "lock",
                        children: [
                          {
                            id: "allow_all",
                            label: "Allow All Devices",
                            type: "toggle",
                            action: "toggle_child_permission",
                            description: "Allow children to connect to any device",
                          },
                          {
                            id: "allowed_devices",
                            label: "Allowed Devices List",
                            type: "submenu",
                            description: "Devices children can connect to",
                            children: [
                              {
                                id: "allowed_1",
                                label: "Study Room Speaker",
                                type: "toggle",
                                action: "toggle_allowed_device",
                                description: "Allow children to use this device",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "bluetooth_security",
                        label: "Security",
                        type: "submenu",
                        action: "security_settings",
                        icon: "security",
                        description: "Bluetooth security and pairing settings",
                        children: [
                          {
                            id: "pairing_mode",
                            label: "Pairing Mode",
                            type: "action",
                            action: "set_pairing_mode",
                            description: "Open/Close pairing mode",
                          },
                          {
                            id: "auto_pair",
                            label: "Auto-Pair Trusted Devices",
                            type: "toggle",
                            action: "toggle_auto_pair",
                            description: "Automatically pair previously trusted devices",
                          },
                        ],
                      },
                      {
                        id: "bluetooth_advanced",
                        label: "Advanced",
                        type: "submenu",
                        action: "advanced_settings",
                        description: "Advanced Bluetooth configuration",
                        children: [
                          {
                            id: "codec",
                            label: "Audio Codec",
                            type: "action",
                            action: "select_codec",
                            description: "Select audio codec (AAC, SBC, aptX)",
                          },
                          {
                            id: "range",
                            label: "Transmission Range",
                            type: "action",
                            action: "set_range",
                            description: "Adjust Bluetooth range",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      breadcrumb: ["Settings", "Network", "Connections", "Bluetooth"],
      role_context: {
        role: "parent",
        design_intent: [
          "Full control",
          "Configuration & security",
          "Advanced visibility",
        ],
        restrictions: [],
      },
    };
  }

  // Default parent menu
  return {
    root: {
      id: "settings",
      label: "Settings",
      icon: "settings",
      children: [
        {
          id: "network",
          label: "Network",
          type: "menu",
          icon: "network",
          children: [],
        },
      ],
    },
    role_context: {
      role: "parent",
      design_intent: ["Full control", "Configuration & security"],
      restrictions: [],
    },
  };
}

/**
 * Generate Child role menu - Safety-first, minimal options
 */
function generateChildMenu(isBluetooth: boolean): MenuStructure {
  if (isBluetooth) {
    return {
      root: {
        id: "settings",
        label: "Settings",
        icon: "settings",
        children: [
          {
            id: "connectivity",
            label: "Connectivity",
            type: "menu",
            icon: "wifi",
            children: [
              {
                id: "bluetooth",
                label: "Bluetooth",
                type: "submenu",
                icon: "bluetooth",
                description: "Connect to your devices",
                children: [
                  {
                    id: "bluetooth_on_off",
                    label: "On / Off",
                    type: "toggle",
                    action: "toggle_bluetooth",
                    value: true,
                    description: "Turn Bluetooth on or off",
                  },
                  {
                    id: "my_devices",
                    label: "My Devices",
                    type: "submenu",
                    action: "view_my_devices",
                    description: "Devices you can connect to",
                    icon: "device",
                    children: [
                      {
                        id: "device_allowed_1",
                        label: "Study Room Speaker",
                        type: "action",
                        action: "connect_allowed_device",
                        description: "Tap to connect",
                        badge: "Allowed",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      breadcrumb: ["Settings", "Connectivity", "Bluetooth"],
      role_context: {
        role: "child",
        design_intent: [
          "Safety-first",
          "No system-level changes",
          "Minimal cognitive load",
        ],
        restrictions: [
          "Cannot pair new devices",
          "Can only connect to pre-approved devices",
          "No access to security settings",
        ],
      },
    };
  }

  // Default child menu
  return {
    root: {
      id: "settings",
      label: "Settings",
      icon: "settings",
      children: [
        {
          id: "connectivity",
          label: "Connectivity",
          type: "menu",
          icon: "wifi",
          children: [],
        },
      ],
    },
    role_context: {
      role: "child",
      design_intent: ["Safety-first", "No system-level changes"],
      restrictions: ["Limited device access"],
    },
  };
}

/**
 * Generate Guest role menu - Temporary access, no persistent changes
 */
function generateGuestMenu(isBluetooth: boolean): MenuStructure {
  if (isBluetooth) {
    return {
      root: {
        id: "settings",
        label: "Settings",
        icon: "settings",
        children: [
          {
            id: "quick_connectivity",
            label: "Quick Connectivity",
            type: "menu",
            icon: "wifi",
            description: "Temporary connections only",
            children: [
              {
                id: "bluetooth",
                label: "Bluetooth",
                type: "submenu",
                icon: "bluetooth",
                description: "Temporary Bluetooth connections",
                children: [
                  {
                    id: "connect_temp",
                    label: "Connect Temporary Device",
                    type: "action",
                    action: "connect_temporary",
                    description: "Connect a device (will disconnect when you leave)",
                    icon: "device",
                    badge: "Temporary",
                  },
                  {
                    id: "disconnect",
                    label: "Disconnect",
                    type: "action",
                    action: "disconnect_all",
                    description: "Disconnect all temporary connections",
                  },
                ],
              },
            ],
          },
        ],
      },
      breadcrumb: ["Settings", "Quick Connectivity", "Bluetooth"],
      role_context: {
        role: "guest",
        design_intent: [
          "Temporary access",
          "No persistent changes",
          "Frictionless experience",
        ],
        restrictions: [
          "Connections reset on session end",
          "Cannot pair new devices",
          "No permanent changes",
        ],
      },
    };
  }

  // Default guest menu
  return {
    root: {
      id: "settings",
      label: "Settings",
      icon: "settings",
      children: [
        {
          id: "quick_connectivity",
          label: "Quick Connectivity",
          type: "menu",
          icon: "wifi",
          children: [],
        },
      ],
    },
    role_context: {
      role: "guest",
      design_intent: ["Temporary access", "No persistent changes"],
      restrictions: ["All changes are temporary"],
    },
  };
}

export const menuGeneratorTool = tool(
  async (input, config) => {
    // First, try to detect role from query
    const detectedRole = detectRoleFromQuery(input.user_query);
    
    // Extract user profile from config metadata
    const configUserProfile = config?.metadata?.userProfile as UserProfile | undefined;
    
    // Determine which role to use: query detection > config userProfile > default to guest
    let userProfile: UserProfile;
    if (detectedRole) {
      // Use role detected from query
      userProfile = createUserProfile(detectedRole);
    } else if (configUserProfile) {
      // Use role from config metadata
      userProfile = configUserProfile;
    } else {
      // Default to guest if nothing is available
      userProfile = createUserProfile("guest");
    }

    // Show loading state
    await dispatchCustomEvent(
      CUSTOM_UI_YIELD_NAME,
      {
        output: {
          value: <HierarchicalMenuLoading />,
          type: "append",
        },
      },
      config,
    );

    // Generate menu structure
    const menuStructure = generateMenuStructure(
      input.user_query,
      userProfile,
    );

    // Show generated menu
    await dispatchCustomEvent(
      CUSTOM_UI_YIELD_NAME,
      {
        output: {
          value: <HierarchicalMenu menuStructure={menuStructure} />,
          type: "update",
        },
      },
      config,
    );

    return JSON.stringify(menuStructure, null, 2);
  },
  {
    name: "generate_settings_menu",
    description:
      "Generate a hierarchical settings menu structure based on user role. ALWAYS use this tool when users ask for: 'settings', 'Bluetooth settings', 'connect headphones', 'Bluetooth menu', 'configure', 'setup', or any request related to device configuration or settings menus. The menu structure automatically adapts to the user's role (Parent: full control with Network/Connections/Bluetooth hierarchy, Child: simplified Connectivity/Bluetooth with On/Off and My Devices, Guest: Quick Connectivity/Bluetooth with temporary connection options).",
    schema: menuRequestSchema,
  },
);

