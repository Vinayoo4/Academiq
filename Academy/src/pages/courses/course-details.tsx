import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Progress, 
  Tabs, 
  Tab, 
  Chip,
  Divider,
  Avatar
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { RoadmapItem } from "../../components/roadmap-item";

interface CourseParams {
  courseId: string;
}

export const CourseDetail: React.FC = () => {
  const { courseId } = useParams<CourseParams>();
  const [activeTab, setActiveTab] = React.useState("overview");

  // Mock course data
  const course = {
    id: courseId,
    title: "HTML & CSS Fundamentals",
    description: "Learn the building blocks of web development with HTML and CSS. This comprehensive course will take you from beginner to proficient in creating modern, responsive web pages.",
    category: "Web Development",
    level: "Beginner",
    progress: 65,
    image: "https://img.heroui.chat/image/dashboard?w=1200&h=600&u=1",
    duration: "20 hours",
    lessons: 12,
    assignments: 4,
    labs: 3,
    students: 1245,
    rating: 4.8,
    reviews: 124,
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Web Developer",
      bio: "Sarah has 10+ years of experience in web development and has taught over 50,000 students online.",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10"
    },
    topics: [
      "HTML5 Structure and Semantics",
      "CSS Selectors and Properties",
      "Responsive Design Principles",
      "Flexbox and Grid Layouts",
      "CSS Variables and Custom Properties",
      "Forms and Form Validation",
      "CSS Animations and Transitions"
    ],
    prerequisites: [
      "Basic computer skills",
      "No prior coding experience required"
    ],
    modules: [
      {
        id: "module-1",
        title: "Introduction to HTML",
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
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="relative rounded-lg overflow-hidden">
        <div className="h-64 md:h-80">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex flex-wrap gap-2 mb-2">
            <Chip color="primary" variant="flat">
              {course.category}
            </Chip>
            <Chip color={course.level === "Beginner" ? "success" : course.level === "Intermediate" ? "warning" : "danger"} variant="flat">
              {course.level}
            </Chip>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-1">
              <Icon icon="lucide:clock" width={16} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="lucide:book-open" width={16} />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="lucide:users" width={16} />
              <span>{course.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="lucide:star" width={16} className="text-warning" />
              <span>{course.rating} ({course.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Course Progress</span>
                <span>{course.progress}% Complete</span>
              </div>
              <Progress 
                value={course.progress} 
                color={course.progress >= 75 ? "success" : "primary"}
                className="mb-2"
                aria-label="Course progress"
              />
              <p className="text-xs text-default-500">
                Complete at least 75% of the course to earn your certificate
              </p>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Button
                as={RouterLink}
                to={`/roadmap/${course.id}`}
                variant="flat"
                startContent={<Icon icon="lucide:map" width={16} />}
              >
                View Roadmap
              </Button>
              <Button
                color="primary"
                startContent={<Icon icon="lucide:play" width={16} />}
                as={RouterLink}
                to={`/lesson/css-box-model`}
              >
                Continue Learning
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Course Content Tabs */}
      <Tabs 
        selectedKey={activeTab} 
        onSelectionChange={(key) => setActiveTab(key as string)}
        aria-label="Course Content"
      >
        <Tab key="overview" title="Overview">
          <Card>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Course Description */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">About This Course</h2>
                    <p className="text-default-700">{course.description}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">What You'll Learn</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {course.topics.map((topic, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Prerequisites</h2>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Icon icon="lucide:info" className="text-primary mt-1" width={16} />
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Right Column - Instructor & Course Info */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-0">
                      <h3 className="text-lg font-semibold">Your Instructor</h3>
                    </CardHeader>
                    <CardBody>
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar
                          src={course.instructor.avatar}
                          size="lg"
                          isBordered
                          color="primary"
                        />
                        <div>
                          <h4 className="font-semibold">{course.instructor.name}</h4>
                          <p className="text-sm text-default-500">{course.instructor.title}</p>
                        </div>
                      </div>
                      <p className="text-sm">{course.instructor.bio}</p>
                    </CardBody>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-0">
                      <h3 className="text-lg font-semibold">Course Includes</h3>
                    </CardHeader>
                    <CardBody>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:book-open" width={16} className="text-primary" />
                          <span>{course.lessons} lessons</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:file-check" width={16} className="text-warning" />
                          <span>{course.assignments} assignments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:flask-conical" width={16} className="text-success" />
                          <span>{course.labs} interactive labs</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:award" width={16} className="text-primary" />
                          <span>Completion certificate</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:infinity" width={16} className="text-primary" />
                          <span>Lifetime access</span>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="content" title="Course Content">
          <Card>
            <CardBody className="p-6">
              <div className="space-y-6">
                {course.modules.map((module, index) => (
                  <div key={module.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Module {index + 1}: {module.title}
                      </h3>
                      <Chip size="sm" variant="flat">
                        {module.items.length} items
                      </Chip>
                    </div>
                    
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
                    
                    {index < course.modules.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="resources" title="Resources">
          <Card>
            <CardBody className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Course Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary-100">
                            <Icon icon="lucide:file-text" width={24} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">HTML Cheat Sheet</h3>
                            <p className="text-sm text-default-500 mb-2">Quick reference guide for HTML elements and attributes</p>
                            <Button 
                              size="sm" 
                              variant="flat" 
                              color="primary"
                              startContent={<Icon icon="lucide:download" width={14} />}
                            >
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary-100">
                            <Icon icon="lucide:file-text" width={24} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">CSS Cheat Sheet</h3>
                            <p className="text-sm text-default-500 mb-2">Quick reference guide for CSS properties and selectors</p>
                            <Button 
                              size="sm" 
                              variant="flat" 
                              color="primary"
                              startContent={<Icon icon="lucide:download" width={14} />}
                            >
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-success-100">
                            <Icon icon="lucide:flask-conical" width={24} className="text-success" />
                          </div>
                          <div>
                            <h3 className="font-semibold">HTML & CSS Sandbox</h3>
                            <p className="text-sm text-default-500 mb-2">Interactive environment to practice your HTML and CSS skills</p>
                            <Button 
                              size="sm" 
                              color="success"
                              startContent={<Icon icon="lucide:external-link" width={14} />}
                              as={RouterLink}
                              to="/resources/labs/html-css-sandbox"
                            >
                              Open Lab
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-warning-100">
                            <Icon icon="lucide:clipboard-list" width={24} className="text-warning" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Practice Worksheets</h3>
                            <p className="text-sm text-default-500 mb-2">Additional exercises to reinforce your learning</p>
                            <Button 
                              size="sm" 
                              color="warning"
                              startContent={<Icon icon="lucide:external-link" width={14} />}
                              as={RouterLink}
                              to="/resources/worksheets/html-css"
                            >
                              View Worksheets
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:link" width={16} className="text-primary" />
                      <a href="#" className="text-primary hover:underline">MDN Web Docs - HTML Reference</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:link" width={16} className="text-primary" />
                      <a href="#" className="text-primary hover:underline">MDN Web Docs - CSS Reference</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:link" width={16} className="text-primary" />
                      <a href="#" className="text-primary hover:underline">W3C HTML Validator</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:link" width={16} className="text-primary" />
                      <a href="#" className="text-primary hover:underline">CSS Tricks - Flexbox Guide</a>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};