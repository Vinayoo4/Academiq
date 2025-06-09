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

export const Register: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [termsError, setTermsError] = React.useState("");
  const [registerError, setRegisterError] = React.useState("");
  
  const { register } = useAuth();
  const history = useHistory();

  const validateName = (name: string) => {
    if (!name) {
      setNameError("Name is required");
      return false;
    }
    setNameError("");
    return true;
  };

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
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordError("Password must include uppercase, lowercase, and numbers");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const validateTerms = (agreed: boolean) => {
    if (!agreed) {
      setTermsError("You must agree to the terms and conditions");
      return false;
    }
    setTermsError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isTermsAgreed = validateTerms(agreeTerms);
    
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsAgreed) {
      setIsLoading(true);
      setRegisterError("");
      
      try {
        const success = await register(name, email, password);
        
        if (success) {
          history.push("/");
        } else {
          setRegisterError("Registration failed. Please try again with different credentials.");
        }
      } catch (error) {
        setRegisterError("An error occurred during registration. Please try again.");
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="w-full">
      <CardBody className="p-6">
        {registerError && (
          <div className="bg-danger-50 text-danger border border-danger-200 p-3 rounded-md mb-4 text-sm">
            {registerError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onValueChange={setName}
              onBlur={() => validateName(name)}
              isInvalid={!!nameError}
              errorMessage={nameError}
              isRequired
              startContent={
                <Icon icon="lucide:user" width={16} className="text-default-400" />
              }
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onValueChange={(value) => {
                setPassword(value);
                if (confirmPassword) {
                  validateConfirmPassword(confirmPassword);
                }
              }}
              onBlur={() => validatePassword(password)}
              isInvalid={!!passwordError}
              errorMessage={passwordError}
              isRequired
              startContent={
                <Icon icon="lucide:lock" width={16} className="text-default-400" />
              }
            />
            <p className="text-xs text-default-400">
              Password must be at least 8 characters and include uppercase, lowercase, and numbers.
            </p>
          </div>

          <div className="space-y-2">
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              onBlur={() => validateConfirmPassword(confirmPassword)}
              isInvalid={!!confirmPasswordError}
              errorMessage={confirmPasswordError}
              isRequired
              startContent={
                <Icon icon="lucide:lock" width={16} className="text-default-400" />
              }
            />
          </div>

          <div className="space-y-2">
            <Checkbox 
              isSelected={agreeTerms} 
              onValueChange={(value) => {
                setAgreeTerms(value);
                validateTerms(value);
              }}
              size="sm"
              isInvalid={!!termsError}
            >
              <span className="text-sm">
                I agree to the <Link href="#" size="sm">Terms of Service</Link> and <Link href="#" size="sm">Privacy Policy</Link>
              </span>
            </Checkbox>
            {termsError && <p className="text-xs text-danger">{termsError}</p>}
          </div>

          <Button 
            type="submit" 
            color="primary" 
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
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
          <span className="text-default-500">Already have an account?</span>{" "}
          <Link as={RouterLink} to="/auth/login" className="font-semibold">
            Sign in
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};