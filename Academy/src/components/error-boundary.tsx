import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // In a production app, you would log this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <Card className="mx-auto my-8 max-w-lg">
          <CardBody className="p-6 text-center">
            <Icon 
              icon="lucide:alert-triangle" 
              className="mx-auto text-danger mb-4" 
              width={48} 
            />
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-default-500 mb-4">
              We're sorry, but an error occurred while rendering this component.
            </p>
            <div className="bg-default-100 p-3 rounded-md text-left mb-4 overflow-auto max-h-32">
              <code className="text-xs whitespace-pre-wrap">
                {this.state.error?.toString() || "Unknown error"}
              </code>
            </div>
            <Button 
              color="primary"
              onPress={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              Reload Page
            </Button>
          </CardBody>
        </Card>
      );
    }

    return this.props.children;
  }
}