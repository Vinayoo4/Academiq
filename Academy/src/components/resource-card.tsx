import React from "react";
import { Card, CardBody, CardFooter, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";

export interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  type: "lab" | "worksheet" | "cheatsheet";
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  downloadUrl?: string;
  viewUrl: string;
  tags: string[];
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  title,
  description,
  type,
  category,
  difficulty,
  downloadUrl,
  viewUrl,
  tags,
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case "lab":
        return "lucide:flask-conical";
      case "worksheet":
        return "lucide:clipboard-list";
      case "cheatsheet":
        return "lucide:file-text";
      default:
        return "lucide:file";
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "lab":
        return "success";
      case "worksheet":
        return "warning";
      case "cheatsheet":
        return "primary";
      default:
        return "default";
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Card className="h-full">
      <CardBody>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-md bg-${getTypeColor()}-100`}>
              <Icon 
                icon={getTypeIcon()} 
                width={20} 
                className={`text-${getTypeColor()}-500`} 
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-xs text-default-500">{category}</p>
            </div>
          </div>
          <Chip 
            color={getDifficultyColor()} 
            variant="flat" 
            size="sm"
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Chip>
        </div>
        
        <p className="text-sm text-default-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <Chip key={index} size="sm" variant="flat" color="default">
              {tag}
            </Chip>
          ))}
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-between gap-2">
        {downloadUrl && (
          <Button
            variant="flat"
            color="default"
            startContent={<Icon icon="lucide:download" width={16} />}
            as="a"
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </Button>
        )}
        
        <Button
          as={RouterLink}
          to={viewUrl}
          color={getTypeColor()}
          endContent={<Icon icon="lucide:external-link" width={16} />}
          className="flex-1"
        >
          {type === "lab" ? "Start Lab" : "View"}
        </Button>
      </CardFooter>
    </Card>
  );
};