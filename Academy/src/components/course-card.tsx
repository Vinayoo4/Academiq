import React from "react";
import { Card, CardBody, CardFooter, Button, Progress, Chip, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  image: string;
  lessons: number;
  assignments: number;
  labs: number;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  category,
  progress,
  image,
  lessons,
  assignments,
  labs,
  level,
}) => {
  const getLevelColor = () => {
    switch (level) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Card className="h-full">
      <CardBody className="p-0 overflow-hidden">
        <div className="relative h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <Chip color={getLevelColor()} variant="flat" size="sm">
              {level}
            </Chip>
          </div>
          <div className="absolute top-2 right-2">
            <Chip color="primary" variant="flat" size="sm">
              {category}
            </Chip>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-default-500 line-clamp-2 mb-4">{description}</p>
          
          <div className="flex items-center justify-between text-sm text-default-500 mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            color={progress >= 75 ? "success" : "primary"}
            className="mb-4"
            aria-label="Course progress"
          />
          
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Icon icon="lucide:book-open" width={14} />
              <span>{lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="lucide:file-check" width={14} />
              <span>{assignments} assignments</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="lucide:flask-conical" width={14} />
              <span>{labs} labs</span>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between gap-2">
        <Button 
          as={RouterLink} 
          to={`/roadmap/${id}`}
          variant="flat"
          startContent={<Icon icon="lucide:map" width={16} />}
        >
          Roadmap
        </Button>
        <Button 
          as={RouterLink} 
          to={`/courses/${id}`}
          color="primary"
          endContent={<Icon icon="lucide:chevron-right" width={16} />}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};