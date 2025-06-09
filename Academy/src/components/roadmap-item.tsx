import React from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";

export interface RoadmapItemProps {
  id: string;
  title: string;
  type: "lesson" | "assignment" | "lab" | "quiz";
  status: "completed" | "in-progress" | "locked";
  duration: number; // in minutes
  description: string;
  requiredScore?: number;
  yourScore?: number;
}

export const RoadmapItem: React.FC<RoadmapItemProps> = ({
  id,
  title,
  type,
  status,
  duration,
  description,
  requiredScore,
  yourScore,
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case "lesson":
        return "lucide:book-open";
      case "assignment":
        return "lucide:file-check";
      case "lab":
        return "lucide:flask-conical";
      case "quiz":
        return "lucide:help-circle";
      default:
        return "lucide:file";
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "lesson":
        return "primary";
      case "assignment":
        return "warning";
      case "lab":
        return "success";
      case "quiz":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return "lucide:check-circle";
      case "in-progress":
        return "lucide:clock";
      case "locked":
        return "lucide:lock";
      default:
        return "lucide:circle";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      case "locked":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "locked":
        return "Locked";
      default:
        return "Not Started";
    }
  };

  const getPath = () => {
    switch (type) {
      case "lesson":
        return `/lesson/${id}`;
      case "assignment":
        return `/assignment/${id}`;
      case "lab":
        return `/resources/labs/${id}`;
      case "quiz":
        return `/quiz/${id}`;
      default:
        return `/lesson/${id}`;
    }
  };

  return (
    <Card 
      className={`border-l-4 ${status === "locked" ? "opacity-70" : ""}`}
      style={{ borderLeftColor: `hsl(var(--heroui-${getTypeColor()}))` }}
    >
      <CardBody className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Chip 
              color={getTypeColor()} 
              variant="flat" 
              size="sm"
              startContent={<Icon icon={getTypeIcon()} width={14} />}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Chip>
            <Chip 
              color={getStatusColor()} 
              variant="dot" 
              size="sm"
            >
              {getStatusText()}
            </Chip>
          </div>
          
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-default-500 mb-2">{description}</p>
          
          <div className="flex flex-wrap gap-3 text-xs text-default-500">
            <div className="flex items-center gap-1">
              <Icon icon="lucide:clock" width={14} />
              <span>{duration} minutes</span>
            </div>
            
            {(type === "assignment" || type === "quiz") && requiredScore && (
              <div className="flex items-center gap-1">
                <Icon icon="lucide:target" width={14} />
                <span>Required: {requiredScore}%</span>
              </div>
            )}
            
            {status === "completed" && yourScore && (
              <div className="flex items-center gap-1">
                <Icon icon="lucide:check" width={14} className="text-success" />
                <span className="text-success">Your score: {yourScore}%</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            as={RouterLink}
            to={getPath()}
            color={status === "locked" ? "default" : getTypeColor()}
            variant={status === "locked" ? "flat" : "solid"}
            isDisabled={status === "locked"}
            endContent={
              status === "locked" ? (
                <Icon icon="lucide:lock" width={16} />
              ) : (
                <Icon icon="lucide:chevron-right" width={16} />
              )
            }
          >
            {status === "completed" ? "Review" : status === "in-progress" ? "Continue" : "Start"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};