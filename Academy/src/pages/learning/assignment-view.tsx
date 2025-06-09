import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  CardHeader,
  CardFooter,
  Button, 
  Progress, 
  Divider,
  Tabs,
  Tab,
  Textarea,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface AssignmentParams {
  assignmentId: string;
}

export const AssignmentView: React.FC = () => {
  const { assignmentId } = useParams<AssignmentParams>();
  const [activeTab, setActiveTab] = React.useState("instructions");
  const [submissionText, setSubmissionText] = React.useState("");
  const [submissionUrl, setSubmissionUrl] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // Mock assignment data
  const assignment = {
    id: assignmentId,
    title: "Building a Responsive Layout",
    courseId: "html-css-basics",
    courseName: "HTML & CSS Fundamentals",
    moduleId: "module-3",
    moduleName: "Responsive Design",
    dueDate: "2023-12-15",
    status: "not-submitted", // not-submitted, submitted, graded
    requiredScore: 75,
    maxScore: 100,
    yourScore: null,
    timeEstimate: 120,
    instructions: `
      <h2>Assignment: Building a Responsive Layout</h2>
      
      <p>In this assignment, you will apply what you've learned about responsive design by creating a webpage that adapts to different screen sizes.</p>
      
      <h3>Requirements</h3>
      <ol>
        <li>Create a webpage with a header, navigation menu, main content area with at least two columns, and a footer.</li>
        <li>The layout should be responsive and adapt to at least three different screen sizes:
          <ul>
            <li>Mobile (less than 600px wide)</li>
            <li>Tablet (600px to 1024px wide)</li>
            <li>Desktop (more than 1024px wide)</li>
          </ul>
        </li>
        <li>Use media queries to adjust the layout for different screen sizes.</li>
        <li>The navigation menu should collapse into a hamburger menu on mobile devices.</li>
        <li>The content columns should stack vertically on mobile devices.</li>
        <li>Include at least one responsive image that scales appropriately.</li>
        <li>Use relative units (em, rem, %, vh, vw) for sizing elements.</li>
        <li>Ensure the text is readable on all screen sizes.</li>
      </ol>
      
      <h3>Submission Guidelines</h3>
      <p>Submit your assignment in one of the following ways:</p>
      <ol>
        <li>Upload a ZIP file containing your HTML, CSS, and any image files.</li>
        <li>Provide a link to a GitHub repository containing your code.</li>
        <li>Share a link to a live demo of your webpage (e.g., GitHub Pages, CodePen, etc.).</li>
      </ol>
      
      <h3>Grading Criteria</h3>
      <ul>
        <li><strong>Functionality (40%)</strong>: The webpage displays correctly and adapts to different screen sizes as specified.</li>
        <li><strong>Code Quality (30%)</strong>: The HTML and CSS are well-organized, properly indented, and include appropriate comments.</li>
        <li><strong>Design (20%)</strong>: The webpage has a clean, professional appearance with good use of color, typography, and spacing.</li>
        <li><strong>Creativity (10%)</strong>: The webpage demonstrates creativity and originality in its design and implementation.</li>
      </ul>
      
      <h3>Resources</h3>
      <p>You may find the following resources helpful:</p>
      <ul>
        <li>MDN Web Docs: <a href="#">Responsive Design</a></li>
        <li>CSS-Tricks: <a href="#">A Complete Guide to Media Queries</a></li>
        <li>Smashing Magazine: <a href="#">Responsive Design Patterns</a></li>
      </ul>
      
      <h3>Tips for Success</h3>
      <ul>
        <li>Start by sketching your layout for each screen size.</li>
        <li>Use a mobile-first approach, designing for mobile devices first and then adding media queries for larger screens.</li>
        <li>Test your webpage on actual devices or using browser developer tools to simulate different screen sizes.</li>
        <li>Pay attention to details like font sizes, spacing, and touch target sizes on mobile devices.</li>
      </ul>
    `,
    rubric: [
      {
        category: "Functionality",
        weight: 40,
        criteria: [
          "Webpage adapts to all three specified screen sizes",
          "Navigation menu collapses on mobile devices",
          "Content columns stack vertically on mobile devices",
          "Images are responsive and scale appropriately",
          "All elements use relative units for sizing"
        ]
      },
      {
        category: "Code Quality",
        weight: 30,
        criteria: [
          "HTML is semantically correct and well-structured",
          "CSS is organized and follows best practices",
          "Code is properly indented and formatted",
          "Appropriate comments are included",
          "No unnecessary or redundant code"
        ]
      },
      {
        category: "Design",
        weight: 20,
        criteria: [
          "Clean and professional appearance",
          "Good use of color and typography",
          "Appropriate spacing and alignment",
          "Consistent design across screen sizes",
          "Text is readable on all screen sizes"
        ]
      },
      {
        category: "Creativity",
        weight: 10,
        criteria: [
          "Original design elements",
          "Creative use of CSS techniques",
          "Thoughtful user experience considerations",
          "Goes beyond basic requirements"
        ]
      }
    ],
    resources: [
      {
        title: "Responsive Design Cheat Sheet",
        type: "pdf",
        url: "#"
      },
      {
        title: "Starter Code Template",
        type: "code",
        url: "#"
      }
    ]
  };

  const handleSubmit = () => {
    if (!submissionText && !submissionUrl) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpen();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button
              as={RouterLink}
              to={`/courses/${assignment.courseId}`}
              variant="light"
              size="sm"
              startContent={<Icon icon="lucide:arrow-left" width={16} />}
            >
              Back to Course
            </Button>
          </div>
          <h1 className="text-2xl font-bold">{assignment.title}</h1>
          <p className="text-default-500">
            {assignment.courseName} &gt; {assignment.moduleName}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Chip 
            color={
              assignment.status === "graded" 
                ? "success" 
                : assignment.status === "submitted" 
                  ? "warning" 
                  : "danger"
            }
            variant="flat"
          >
            {assignment.status === "graded" 
              ? "Graded" 
              : assignment.status === "submitted" 
                ? "Submitted" 
                : "Not Submitted"}
          </Chip>
          <p className="text-sm text-default-500 mt-1">
            Due: {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Assignment Info Card */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-warning-100">
                <Icon icon="lucide:file-check" width={24} className="text-warning" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{assignment.title}</h2>
                <p className="text-sm text-default-500">
                  Estimated time: {assignment.timeEstimate} minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm text-default-500">Required Score</div>
                <div className="text-lg font-bold">{assignment.requiredScore}%</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-default-500">Maximum Score</div>
                <div className="text-lg font-bold">{assignment.maxScore}</div>
              </div>
              {assignment.yourScore !== null && (
                <div className="text-center">
                  <div className="text-sm text-default-500">Your Score</div>
                  <div className={`text-lg font-bold ${
                    assignment.yourScore >= assignment.requiredScore 
                      ? "text-success" 
                      : "text-danger"
                  }`}>
                    {assignment.yourScore}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Assignment Content */}
      <Card className="overflow-hidden">
        <Tabs 
          selectedKey={activeTab} 
          onSelectionChange={(key) => setActiveTab(key as string)}
          aria-label="Assignment Content"
        >
          <Tab key="instructions" title="Instructions">
            <CardBody className="p-6">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: assignment.instructions }}
              />
            </CardBody>
          </Tab>
          
          <Tab key="rubric" title="Grading Rubric">
            <CardBody className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Grading Rubric</h2>
                  <p className="text-default-500 mb-6">
                    Your assignment will be graded according to the following criteria.
                  </p>
                </div>
                
                {assignment.rubric.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{section.category}</h3>
                      <Chip size="sm" variant="flat">
                        {section.weight}% of total grade
                      </Chip>
                    </div>
                    
                    <Card>
                      <CardBody className="p-4">
                        <ul className="space-y-2">
                          {section.criteria.map((criterion, cIndex) => (
                            <li key={cIndex} className="flex items-start gap-2">
                              <Icon icon="lucide:check-circle" className="text-primary mt-1" width={16} />
                              <span>{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </CardBody>
                    </Card>
                    
                    {index < assignment.rubric.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
            </CardBody>
          </Tab>
          
          <Tab key="resources" title="Resources">
            <CardBody className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Assignment Resources</h2>
                  <p className="text-default-500 mb-6">
                    The following resources will help you complete this assignment.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignment.resources.map((resource, index) => (
                    <Card key={index}>
                      <CardBody className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary-100">
                            <Icon 
                              icon={resource.type === "pdf" ? "lucide:file-text" : "lucide:code"} 
                              width={24} 
                              className="text-primary" 
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{resource.title}</h3>
                            <p className="text-sm text-default-500 mb-2">
                              {resource.type === "pdf" ? "PDF Document" : "Code Template"}
                            </p>
                            <Button 
                              size="sm" 
                              variant="flat" 
                              color="primary"
                              startContent={<Icon icon="lucide:download" width={14} />}
                              as="a"
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </CardBody>
          </Tab>
          
          <Tab key="submit" title="Submit Assignment">
            <CardBody className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Submit Your Assignment</h2>
                  <p className="text-default-500">
                    Submit your completed assignment using one of the methods below.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Option 1: Submit a URL</h3>
                    <p className="text-sm text-default-500 mb-3">
                      Provide a link to your GitHub repository, CodePen, or other online platform.
                    </p>
                    <Input
                      label="Submission URL"
                      placeholder="https://github.com/yourusername/responsive-layout"
                      value={submissionUrl}
                      onValueChange={setSubmissionUrl}
                      startContent={<Icon icon="lucide:link" width={16} className="text-default-400" />}
                    />
                  </div>
                  
                  <Divider>
                    <span className="text-xs text-default-500">OR</span>
                  </Divider>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Option 2: Write a Description</h3>
                    <p className="text-sm text-default-500 mb-3">
                      Describe your approach and implementation details.
                    </p>
                    <Textarea
                      label="Submission Description"
                      placeholder="Describe your implementation approach, challenges faced, and how you solved them..."
                      value={submissionText}
                      onValueChange={setSubmissionText}
                      minRows={5}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      color="primary"
                      isLoading={isSubmitting}
                      onPress={handleSubmit}
                      isDisabled={!submissionText && !submissionUrl}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Assignment"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Tab>
        </Tabs>
      </Card>

      {/* Submission Success Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Assignment Submitted</ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
                    <Icon icon="lucide:check" width={32} className="text-success" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Submission Successful!</h3>
                  <p className="text-default-500 mb-4">
                    Your assignment has been submitted successfully. You'll receive feedback once it's been reviewed.
                  </p>
                  <div className="bg-default-100 p-3 rounded-md w-full mb-4">
                    <div className="text-sm">
                      <div className="font-medium">Submission Details:</div>
                      <div className="text-default-500">
                        {submissionUrl ? `URL: ${submissionUrl}` : "Description submitted"}
                      </div>
                      <div className="text-default-500">
                        Date: {new Date().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="primary" 
                  onPress={() => {
                    onClose();
                    // In a real app, you might redirect here
                  }}
                >
                  Return to Course
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};