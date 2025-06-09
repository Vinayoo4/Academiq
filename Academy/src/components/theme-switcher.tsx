import React from "react";
import { Icon } from "@iconify/react";
import { Switch, Tooltip } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  
  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };
  
  return (
    <Tooltip 
      content={`Switch to ${isDark ? "light" : "dark"} mode`}
      placement="bottom"
    >
      <div className="flex items-center gap-2">
        <Icon icon="lucide:sun" className={`text-default-500 ${!isDark && "text-primary-500"}`} />
        <Switch 
          isSelected={isDark}
          onValueChange={handleToggle}
          size="sm"
          color="primary"
          className="mx-1"
        />
        <Icon icon="lucide:moon" className={`text-default-500 ${isDark && "text-primary-500"}`} />
      </div>
    </Tooltip>
  );
};