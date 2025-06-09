import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SidebarProps {
  isCollapsed: boolean;
}

interface NavItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
  children?: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();
  const [activeGroup, setActiveGroup] = React.useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: "lucide:layout-dashboard",
      path: "/",
    },
    {
      label: "My Courses",
      icon: "lucide:book-open",
      path: "/courses",
      badge: 3,
    },
    {
      label: "Resources",
      icon: "lucide:library",
      path: "/resources",
      children: [
        {
          label: "Labs",
          icon: "lucide:flask-conical",
          path: "/resources/labs",
        },
        {
          label: "Worksheets",
          icon: "lucide:clipboard-list",
          path: "/resources/worksheets",
        },
        {
          label: "Cheat Sheets",
          icon: "lucide:file-text",
          path: "/resources/cheat-sheets",
        },
      ],
    },
    {
      label: "Certificates",
      icon: "lucide:award",
      path: "/certificates",
    },
    {
      label: "Profile",
      icon: "lucide:user",
      path: "/profile",
    },
  ];

  const toggleGroup = (label: string) => {
    if (activeGroup === label) {
      setActiveGroup(null);
    } else {
      setActiveGroup(label);
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-full bg-content1 border-r border-divider overflow-y-auto">
      <div className="flex flex-col p-2 gap-1">
        {navItems.map((item) => (
          <React.Fragment key={item.label}>
            {item.children ? (
              <>
                <Tooltip
                  content={isCollapsed ? item.label : ""}
                  placement="right"
                  isDisabled={!isCollapsed}
                >
                  <Button
                    variant="flat"
                    color={isActive(item.path) ? "primary" : "default"}
                    className={`justify-start ${isCollapsed ? "px-0 min-w-0 h-10 w-10" : ""}`}
                    onPress={() => toggleGroup(item.label)}
                  >
                    <div className="flex items-center gap-2">
                      <Icon icon={item.icon} width={20} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          <Icon
                            icon={
                              activeGroup === item.label
                                ? "lucide:chevron-down"
                                : "lucide:chevron-right"
                            }
                            width={16}
                          />
                        </>
                      )}
                    </div>
                  </Button>
                </Tooltip>

                {activeGroup === item.label && (
                  <div
                    className={`ml-4 flex flex-col gap-1 mt-1 ${
                      isCollapsed ? "hidden" : ""
                    }`}
                  >
                    {item.children.map((child) => (
                      <Button
                        key={child.label}
                        as={RouterLink}
                        to={child.path}
                        variant="light"
                        color={isActive(child.path) ? "primary" : "default"}
                        className="justify-start"
                      >
                        <div className="flex items-center gap-2">
                          <Icon icon={child.icon} width={16} />
                          <span>{child.label}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Tooltip
                content={isCollapsed ? item.label : ""}
                placement="right"
                isDisabled={!isCollapsed}
              >
                <Button
                  as={RouterLink}
                  to={item.path}
                  variant="flat"
                  color={isActive(item.path) ? "primary" : "default"}
                  className={`justify-start ${isCollapsed ? "px-0 min-w-0 h-10 w-10" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon icon={item.icon} width={20} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-primary text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </Button>
              </Tooltip>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};