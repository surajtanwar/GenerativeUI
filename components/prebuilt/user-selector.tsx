"use client";
 
import { UserRole, createUserProfile } from "@/types/user";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface UserSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleDescriptions: Record<UserRole, { title: string; description: string; color: string }> = {
  child: {
    title: "Child Mode",
    description: "Limited controls, safe content only",
    color: "bg-blue-100 text-blue-800",
  },
  parent: {
    title: "Parent Mode",
    description: "Full control and all features",
    color: "bg-green-100 text-green-800",
  },
  guest: {
    title: "Guest Mode",
    description: "Quick presets, basic features",
    color: "bg-gray-100 text-gray-800",
  },
};

export function UserSelector({ selectedRole, onRoleChange }: UserSelectorProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Select User Profile</CardTitle>
        <CardDescription>Choose your role to adapt the interface and menu structure</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(roleDescriptions) as UserRole[]).map((role) => {
            const roleInfo = roleDescriptions[role];
            const isSelected = selectedRole === role;
            
            return (
              <Button
                key={role}
                variant={isSelected ? "default" : "outline"}
                onClick={() => onRoleChange(role)}
                className="flex flex-col items-start h-auto p-4"
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="font-semibold">{roleInfo.title}</span>
                  {isSelected && (
                    <Badge className={roleInfo.color}>Active</Badge>
                  )}
                </div>
                <span className="text-xs text-left text-muted-foreground mt-1">
                  {roleInfo.description}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}


