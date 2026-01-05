"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { MenuStructure, MenuItem } from "@/types/menu";
import {
  ChevronRight,
  ChevronDown,
  Bluetooth,
  Wifi,
  Network,
  Settings,
  Shield,
  Lock,
  Check,
  AlertTriangle,
} from "lucide-react";

interface HierarchicalMenuProps {
  menuStructure: MenuStructure;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bluetooth: Bluetooth,
  wifi: Wifi,
  network: Network,
  settings: Settings,
  security: Shield,
  device: Check,
  lock: Lock,
};

export function HierarchicalMenu({ menuStructure }: HierarchicalMenuProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [values, setValues] = useState<Record<string, any>>({});
  const { root, breadcrumb, role_context } = menuStructure;

  // Role-based theme colors
  const roleTheme = {
    parent: {
      card: "bg-green-50 border-green-200",
      badge: "bg-green-100 text-green-800 border-green-300",
      hover: "hover:bg-green-100",
      border: "border-green-200",
      accent: "text-green-700",
      icon: "text-green-600",
    },
    child: {
      card: "bg-blue-50 border-blue-200",
      badge: "bg-blue-100 text-blue-800 border-blue-300",
      hover: "hover:bg-blue-100",
      border: "border-blue-200",
      accent: "text-blue-700",
      icon: "text-blue-600",
    },
    guest: {
      card: "bg-gray-50 border-gray-200",
      badge: "bg-gray-100 text-gray-800 border-gray-300",
      hover: "hover:bg-gray-100",
      border: "border-gray-200",
      accent: "text-gray-700",
      icon: "text-gray-600",
    },
  };

  const currentTheme = roleTheme[role_context.role];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAction = (item: MenuItem) => {
    if (item.requires_confirmation) {
      if (
        confirm(
          item.warning ||
            "Are you sure you want to perform this action?",
        )
      ) {
        console.log("Action:", item.action, item);
      }
    } else {
      console.log("Action:", item.action, item);
    }
  };

  const handleToggle = (item: MenuItem, value: boolean) => {
    setValues((prev) => ({ ...prev, [item.id]: value }));
    console.log("Toggle:", item.action, value);
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const IconComponent = item.icon ? iconMap[item.icon] : null;
    const isOpen = openItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const indent = level * 24;

    switch (item.type) {
      case "separator":
        return <Separator key={item.id} className="my-2" />;

      case "info":
        return (
          <div
            key={item.id}
            className="text-sm text-muted-foreground p-2"
            style={{ paddingLeft: `${indent}px` }}
          >
            {item.description || item.label}
          </div>
        );

      case "toggle":
        return (
          <div
            key={item.id}
            className={`flex items-center justify-between py-2 px-4 ${currentTheme.hover} rounded-md transition-colors`}
            style={{ paddingLeft: `${indent + 16}px` }}
          >
            <div className="flex items-center gap-2 flex-1">
              {IconComponent && <IconComponent className={`h-4 w-4 ${currentTheme.icon}`} />}
              <div className="flex-1">
                <div className={`font-medium text-sm ${currentTheme.accent}`}>{item.label}</div>
                {item.description && (
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
            <Switch
              checked={values[item.id] ?? item.value ?? false}
              onCheckedChange={(checked) => handleToggle(item, checked)}
              disabled={item.disabled}
            />
          </div>
        );

      case "action":
        return (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start py-2 px-4 h-auto ${currentTheme.hover}`}
            style={{ paddingLeft: `${indent + 16}px` }}
            onClick={() => handleAction(item)}
            disabled={item.disabled}
          >
            <div className="flex items-center gap-2 flex-1 text-left">
              {IconComponent && <IconComponent className={`h-4 w-4 ${currentTheme.icon}`} />}
              <div className="flex-1">
                <div className={`font-medium text-sm ${currentTheme.accent}`}>{item.label}</div>
                {item.description && (
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                )}
              </div>
              {item.badge && (
                <Badge variant="secondary" className={`text-xs ${currentTheme.badge}`}>
                  {item.badge}
                </Badge>
              )}
              {item.requires_confirmation && (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
            </div>
          </Button>
        );

      case "menu":
      case "submenu":
        return (
          <div key={item.id}>
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between py-2 px-4 ${currentTheme.hover} rounded-md transition-colors`}
              style={{ paddingLeft: `${indent}px` }}
            >
              <div className="flex items-center gap-2 flex-1">
                {IconComponent && <IconComponent className={`h-4 w-4 ${currentTheme.icon}`} />}
                <div className="flex-1 text-left">
                  <div className={`font-medium text-sm ${currentTheme.accent}`}>{item.label}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  )}
                </div>
                {item.badge && (
                  <Badge variant="secondary" className={`text-xs ${currentTheme.badge}`}>
                    {item.badge}
                  </Badge>
                )}
              </div>
              {hasChildren &&
                (isOpen ? (
                  <ChevronDown className={`h-4 w-4 ${currentTheme.icon}`} />
                ) : (
                  <ChevronRight className={`h-4 w-4 ${currentTheme.icon}`} />
                ))}
            </button>
            {hasChildren && isOpen && (
              <div className="ml-2">
                {item.children!.map((child) =>
                  renderMenuItem(child, level + 1),
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={`w-full max-w-2xl ${currentTheme.card} ${currentTheme.border} border-2`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className={`h-5 w-5 ${currentTheme.icon}`} />
            <CardTitle className={currentTheme.accent}>{root.label}</CardTitle>
            <Badge className={currentTheme.badge}>
              {role_context.role.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
            {breadcrumb.map((crumb, idx) => (
              <span key={idx}>
                {crumb}
                {idx < breadcrumb.length - 1 && (
                  <ChevronRight className="h-3 w-3 inline mx-1" />
                )}
              </span>
            ))}
          </div>
        )}

        {/* Design Intent */}
        <div className="mt-4">
          <CardDescription className="font-medium mb-2">
            Design Intent:
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            {role_context.design_intent.map((intent, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {intent}
              </Badge>
            ))}
          </div>
        </div>

        {/* Restrictions */}
        {role_context.restrictions.length > 0 && (
          <div className="mt-4">
            <CardDescription className="font-medium mb-2 flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Restrictions:
            </CardDescription>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              {role_context.restrictions.map((restriction, idx) => (
                <li key={idx}>{restriction}</li>
              ))}
            </ul>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className={`space-y-1 ${currentTheme.border} border rounded-lg p-2 bg-background`}>
          {root.children.map((item) => renderMenuItem(item, 0))}
        </div>
      </CardContent>
    </Card>
  );
}

export function HierarchicalMenuLoading() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}


