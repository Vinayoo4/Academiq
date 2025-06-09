import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="mb-8">
        <Icon icon="lucide:map-off" width={80} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-default-500 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          as={RouterLink}
          to="/"
          color="primary"
          startContent={<Icon icon="lucide:home" width={16} />}
        >
          Back to Dashboard
        </Button>
        <Button
          as={RouterLink}
          to="/courses"
          variant="flat"
          startContent={<Icon icon="lucide:book-open" width={16} />}
        >
          Browse Courses
        </Button>
      </div>
    </div>
  );
};