/**
 * Hierarchical Menu Generator Types
 */

export type UserRole = "child" | "parent" | "guest";
export type MenuItemType = "menu" | "action" | "toggle" | "submenu" | "separator" | "info";
export type MenuIcon = "bluetooth" | "wifi" | "network" | "security" | "settings" | "device" | "lock";

export interface MenuItem {
  id: string;
  label: string;
  type: MenuItemType;
  icon?: MenuIcon;
  description?: string;
  action?: string;
  value?: any;
  disabled?: boolean;
  hidden?: boolean;
  requires_confirmation?: boolean;
  children?: MenuItem[];
  category?: string;
  badge?: string;
  warning?: string;
}

export interface MenuStructure {
  root: {
    id: string;
    label: string;
    icon?: MenuIcon;
    children: MenuItem[];
  };
  breadcrumb?: string[];
  role_context: {
    role: UserRole;
    design_intent: string[];
    restrictions: string[];
  };
}

export interface MenuGenerationRequest {
  user_query: string;
  user_role: UserRole;
  device_type?: string;
  context?: string;
}


