import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  Input, 
  Button, 
  Checkbox, 
  Link, 
  Divider 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../../contexts/auth-context";
import { useHistory } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  
  // Add auth context and history
  const { login } = useAuth();
  const history = useHistory();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!re.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      setLoginError("");
      
      try {
        const success = await login(email, password);
        
        if (success) {
          history.push("/");
        } else {
          setLoginError("Invalid email or password. Please try again.");
        }
      } catch (error) {
        setLoginError("An error occurred during login. Please try again.");
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="w-full">
      <CardBody className="p-6">
        {loginError && (
          <div className="bg-danger-50 text-danger border border-danger-200 p-3 rounded-md mb-4 text-sm">
            {loginError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onValueChange={setEmail}
              onBlur={() => validateEmail(email)}
              isInvalid={!!emailError}
              errorMessage={emailError}
              isRequired
              startContent={
                <Icon icon="lucide:mail" width={16} className="text-default-400" />
              }
            />
          </div>

          <div className="space-y-2">
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onValueChange={setPassword}
              onBlur={() => validatePassword(password)}
              isInvalid={!!passwordError}
              errorMessage={passwordError}
              isRequired
              startContent={
                <Icon icon="lucide:lock" width={16} className="text-default-400" />
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Checkbox 
              isSelected={rememberMe} 
              onValueChange={setRememberMe}
              size="sm"
            >
              Remember me
            </Checkbox>
            <Link href="#" size="sm">Forgot password?</Link>
          </div>

          <Button 
            type="submit" 
            color="primary" 
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Divider />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-content1 px-2 text-default-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button 
              variant="flat" 
              startContent={<Icon icon="logos:google-icon" width={18} />}
            >
              Google
            </Button>
            <Button 
              variant="flat" 
              startContent={<Icon icon="logos:github-icon" width={18} />}
            >
              GitHub
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-default-500">Don't have an account?</span>{" "}
          <Link as={RouterLink} to="/auth/register" className="font-semibold">
            Sign up
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};