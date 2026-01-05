/**
 * User roles for adaptive multi-user interface
 */
export type UserRole = "child" | "parent" | "guest";

/**
 * User permissions based on role
 */
export interface UserPermissions {
  canUseWeather: boolean;
  canUseGitHub: boolean;
  canUseWebScraping: boolean;
  canUseInvoice: boolean;
  canUploadFiles: boolean;
  canSeeAdvancedOptions: boolean;
  canModifySettings: boolean;
  maxResponseLength?: number;
  allowedDomains?: string[];
  blockedKeywords?: string[];
}

/**
 * User profile with role and permissions
 */
export interface UserProfile {
  role: UserRole;
  name?: string;
  permissions: UserPermissions;
}

/**
 * Role-based permission presets
 */
export const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  child: {
    canUseWeather: true,
    canUseGitHub: false,
    canUseWebScraping: false,
    canUseInvoice: false,
    canUploadFiles: false,
    canSeeAdvancedOptions: false,
    canModifySettings: false,
    maxResponseLength: 500,
  },
  parent: {
    canUseWeather: true,
    canUseGitHub: true,
    canUseWebScraping: true,
    canUseInvoice: true,
    canUploadFiles: true,
    canSeeAdvancedOptions: true,
    canModifySettings: true,
  },
  guest: {
    canUseWeather: true,
    canUseGitHub: false,
    canUseWebScraping: false,
    canUseInvoice: false,
    canUploadFiles: false,
    canSeeAdvancedOptions: false,
    canModifySettings: false,
    maxResponseLength: 300,
  },
};

/**
 * Get permissions for a user role
 */
export function getPermissionsForRole(role: UserRole): UserPermissions {
  return ROLE_PERMISSIONS[role];
}

/**
 * Create a user profile
 */
export function createUserProfile(role: UserRole, name?: string): UserProfile {
  return {
    role,
    name,
    permissions: getPermissionsForRole(role),
  };
}

