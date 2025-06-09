import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Progress, 
  Divider,
  Chip
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { RoadmapItem } from "../../components/roadmap-item";

interface RoadmapParams {
  courseId: string;
}

export const RoadmapView: React.FC = () => {
  const { courseId } = useParams<RoadmapParams>();
  
  // Mock course data
  const course = {
    id: courseId,
    title: "HTML & CSS Fundamentals",
    description: "Learn the building blocks of web development with HTML and CSS.",
    progress: 65,
    modules: [
      {
        id: "module-1",
        title: "Introduction to HTML",
        progress: 100,
        items: [
          {
            id: "html-intro",
            title: "Introduction to HTML",
            type: "lesson",
            status: "completed",
            duration: 30,
            description: "Learn the basics of HTML and its role in web development.",
            yourScore: 100
          },
          {
            id: "html-structure",
            title: "HTML Document Structure",
            type: "lesson",
            status: "completed",
            duration: 45,
            description: "Understand how to structure an HTML document with proper elements.",
            yourScore: 100
          },
          {
            id: "html-elements",
            title: "Common HTML Elements",
            type: "lesson",
            status: "completed",
            duration: 60,
            description: "Explore the most commonly used HTML elements and their purposes.",
            yourScore: 90
          },
          {
            id: "html-quiz",
            title: "HTML Basics Quiz",
            type: "quiz",
            status: "completed",
            duration: 15,
            description: "Test your knowledge of HTML basics.",
            requiredScore: 75,
            yourScore: 85
          }
        ]
      },
      {
        id: "module-2",
        title: "Introduction to CSS",
        progress: 60,
        items: [
          {
            id: "css-intro",
            title: "Introduction to CSS",
            type: "lesson",
            status: "completed",
            duration: 30,
            description: "Learn the basics of CSS and how it styles HTML content.",
            yourScore: 100
          },
          {
            id: "css-selectors",
            title: "CSS Selectors",
            type: "lesson",
            status: "completed",
            duration: 45,
            description: "Master different types of CSS selectors and their specificity.",
            yourScore: 90
          },
          {
            id: "css-box-model",
            title: "The CSS Box Model",
            type: "lesson",
            status: "in-progress",
            duration: 60,
            description: "Understand the CSS box model and how it affects layout."
          },
          {
            id: "css-lab",
            title: "CSS Styling Lab",
            type: "lab",
            status: "locked",
            duration: 90,
            description: "Practice applying CSS styles to an HTML document."
          }
        ]
      },
      {
        id: "module-3",
        title: "Responsive Design",
        progress: 0,
        items: [
          {
            id: "responsive-intro",
            title: "Introduction to Responsive Design",
            type: "lesson",
            status: "locked",
            duration: 45,
            description: "Learn the principles of responsive web design."
          },
          {
            id: "media-queries",
            title: "CSS Media Queries",
            type: "lesson",
            status: "locked",
            duration: 60,
            description: "Master media queries for responsive layouts."
          },
          {
            id: "responsive-layout",
            title: "Building a Responsive Layout",
            type: "assignment",
            status: "locked",
            duration: 120,
            description: "Create a fully responsive webpage layout.",
            requiredScore: 75
          }
        ]
      },
      {
        id: "module-4",
        title: "Advanced CSS Techniques",
        progress: 0,
        items: [
          {
            id: "flexbox",
            title: "CSS Flexbox Layout",
            type: "lesson",
            status: "locked",
            duration: 60,
            description: "Master the flexible box layout model."
          },
          {
            id: "grid",
            title: "CSS Grid Layout",
            type: "lesson",
            status: "locked",
            duration: 60,
            description: "Learn the powerful CSS Grid layout system."
          },
          {
            id: "animations",
            title: "CSS Transitions and Animations",
            type: "lesson",
            status: "locked",
            duration: 45,
            description: "Add movement and interactivity with CSS."
          },
          {
            id: "final-project",
            title: "Final Project: Portfolio Website",
            type: "assignment",
            status: "locked",
            duration: 180,
            description: "Build a complete portfolio website using HTML and CSS.",
            requiredScore: 75
          }
        ]
      }
    ]
  };

  // Calculate overall progress
  const totalItems = course.modules.reduce((acc, module) => acc + module.items.length, 0);
  const completedItems = course.modules.reduce((acc, module) => {
    return acc + module.items.filter(item => item.status === "completed").length;
  }, 0);
  const overallProgress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button
              as={RouterLink}
              to={`/courses/${courseId}`}
              variant="light"
              size="sm"
              startContent={<Icon icon="lucide:arrow-left" width={16} />}
            >
              Back to Course
            </Button>
          </div>
          <h1 className="text-2xl font-bold">{course.title} - Learning Roadmap</h1>
          <p className="text-default-500">
            Follow this structured path to complete your course
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Icon icon="lucide:play" width={16} />}
          as={RouterLink}
          to={`/lesson/css-box-model`}
        >
          Continue Learning
        </Button>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{overallProgress}% Complete</span>
              </div>
              <Progress 
                value={overallProgress} 
                color={overallProgress >= 75 ? "success" : "primary"}
                className="mb-2"
                aria-label="Course progress"
              />
              <p className="text-xs text-default-500">
                Complete at least 75% of the course to earn your certificate
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{completedItems}</div>
                <div className="text-xs text-default-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalItems - completedItems}</div>
                <div className="text-xs text-default-500">Remaining</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Roadmap Modules */}
      <div className="space-y-6">
        {course.modules.map((module, index) => (
          <Card key={module.id} className="overflow-hidden">
            <CardHeader className="bg-content2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  module.progress === 100 
                    ? "bg-success text-white" 
                    : module.progress > 0 
                      ? "bg-primary text-white" 
                      : "bg-default-100 text-default-500"
                }`}>
                  {module.progress === 100 ? (
                    <Icon icon="lucide:check" width={16} />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <h2 className="text-lg font-semibold">{module.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{module.progress}%</span>
                <Chip 
                  size="sm" 
                  color={
                    module.progress === 100 
                      ? "success" 
                      : module.progress > 0 
                        ? "primary" 
                        : "default"
                  }
                >
                  {module.progress === 100 
                    ? "Completed" 
                    : module.progress > 0 
                      ? "In Progress" 
                      : "Not Started"}
                </Chip>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-4">
              <div className="space-y-3">
                {module.items.map((item) => (
                  <RoadmapItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    type={item.type as any}
                    status={item.status as any}
                    duration={item.duration}
                    description={item.description}
                    requiredScore={item.requiredScore}
                    yourScore={item.yourScore}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Certificate Information */}
      <Card className="bg-gradient-to-r from-primary-100 to-primary-50 dark:from-primary-900/20 dark:to-primary-800/20">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <Icon icon="lucide:award" width={64} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Course Certificate</h3>
              <p className="mb-4">
                Complete at least 75% of the course content and pass all required assignments to earn your HTML & CSS Fundamentals certificate.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="flat"
                  color="primary"
                  startContent={<Icon icon="lucide:info" width={16} />}
                >
                  Certificate Requirements
                </Button>
                <Button
                  color="primary"
                  startContent={<Icon icon="lucide:eye" width={16} />}
                  isDisabled={overallProgress < 75}
                >
                  Preview Certificate
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};