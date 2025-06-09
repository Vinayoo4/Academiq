import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Avatar,
  Badge
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Sidebar } from "../components/sidebar";
import { ThemeSwitcher } from "../components/theme-switcher";
import { useAuth } from "../contexts/auth-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Add auth context
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    // Redirect will happen automatically via ProtectedRoute
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        } pt-16`}
      >
        <Sidebar isCollapsed={!isSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "ml-64" : "ml-20"
      }`}>
        {/* Navbar */}
        <Navbar maxWidth="full" className="border-b border-divider">
          <NavbarContent className="gap-4">
            <Button 
              isIconOnly 
              variant="light" 
              onPress={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Icon icon="lucide:menu" width={20} />
            </Button>
            <NavbarBrand>
              <Link as={RouterLink} to="/" className="font-bold text-inherit flex items-center gap-2">
                <Icon icon="lucide:graduation-cap" width={24} className="text-primary" />
                <span className="text-primary">TechAcademy</span>
              </Link>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link 
                as={RouterLink} 
                to="/courses" 
                color={location.pathname.includes("/courses") ? "primary" : "foreground"}
              >
                Courses
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link 
                as={RouterLink} 
                to="/resources/labs" 
                color={location.pathname.includes("/resources") ? "primary" : "foreground"}
              >
                Resources
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link 
                as={RouterLink} 
                to="/certificates" 
                color={location.pathname.includes("/certificates") ? "primary" : "foreground"}
              >
                Certificates
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>
            <NavbarItem>
              <Badge content={3} color="danger">
                <Button 
                  isIconOnly 
                  variant="light" 
                  aria-label="Notifications"
                >
                  <Icon icon="lucide:bell" width={20} />
                </Button>
              </Badge>
            </NavbarItem>
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={user?.name || "User"}
                    size="sm"
                    src={user?.avatar || "https://img.heroui.chat/image/avatar?w=200&h=200&u=1"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">{user?.email || "user@example.com"}</p>
                  </DropdownItem>
                  <DropdownItem key="settings" as={RouterLink} to="/profile">
                    Profile Settings
                  </DropdownItem>
                  <DropdownItem key="certificates" as={RouterLink} to="/certificates">
                    My Certificates
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};