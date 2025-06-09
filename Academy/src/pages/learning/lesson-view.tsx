import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  Button, 
  Progress, 
  Divider,
  Tabs,
  Tab
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface LessonParams {
  lessonId: string;
}

export const LessonView: React.FC = () => {
  const { lessonId } = useParams<LessonParams>();
  const [activeTab, setActiveTab] = React.useState("content");
  const [lessonProgress, setLessonProgress] = React.useState(0);
  
  // Mock lesson data
  const lesson = {
    id: lessonId,
    title: "The CSS Box Model",
    courseId: "html-css-basics",
    courseName: "HTML & CSS Fundamentals",
    moduleId: "module-2",
    moduleName: "Introduction to CSS",
    duration: 60,
    content: `
      <h2>Introduction to the CSS Box Model</h2>
      <p>The CSS Box Model is a fundamental concept that describes how elements are rendered in web browsers. Every HTML element is treated as a box with specific properties that determine its size and position.</p>
      
      <h3>Components of the Box Model</h3>
      <p>The CSS Box Model consists of four main components:</p>
      <ul>
        <li><strong>Content</strong>: The actual content of the element (text, images, etc.)</li>
        <li><strong>Padding</strong>: The space between the content and the border</li>
        <li><strong>Border</strong>: The line that surrounds the padding</li>
        <li><strong>Margin</strong>: The space outside the border</li>
      </ul>
      
      <h3>Box Sizing</h3>
      <p>By default, the width and height properties in CSS only apply to the content area. This means that padding, border, and margin are added to the specified width and height. This is known as the "content-box" box-sizing model.</p>
      
      <p>However, you can change this behavior using the <code>box-sizing</code> property:</p>
      <pre><code>
      .element {
        box-sizing: border-box;
      }
      </code></pre>
      
      <p>With <code>box-sizing: border-box</code>, the width and height properties include the padding and border, but not the margin. This makes it easier to create layouts because the total width and height of an element are more predictable.</p>
      
      <h3>Example</h3>
      <p>Let's look at an example to understand the box model better:</p>
      <pre><code>
      .box {
        width: 300px;
        height: 200px;
        padding: 20px;
        border: 5px solid #333;
        margin: 30px;
      }
      </code></pre>
      
      <p>With the default <code>box-sizing: content-box</code>:</p>
      <ul>
        <li>Content width: 300px</li>
        <li>Total width: 300px (content) + 40px (padding) + 10px (border) = 350px</li>
        <li>Total width including margin: 350px + 60px (margin) = 410px</li>
      </ul>
      
      <p>With <code>box-sizing: border-box</code>:</p>
      <ul>
        <li>Total width (content + padding + border): 300px</li>
        <li>Content width: 300px - 40px (padding) - 10px (border) = 250px</li>
        <li>Total width including margin: 300px + 60px (margin) = 360px</li>
      </ul>
      
      <h3>Practical Application</h3>
      <p>Understanding the box model is crucial for creating accurate layouts. It helps you predict how elements will be sized and positioned on the page.</p>
      
      <p>Many developers prefer to use <code>box-sizing: border-box</code> for all elements to make layout calculations easier. You can apply it globally like this:</p>
      <pre><code>
      * {
        box-sizing: border-box;
      }
      </code></pre>
      
      <h3>Browser Developer Tools</h3>
      <p>Most browser developer tools provide a visual representation of the box model for any selected element. This can be extremely helpful for debugging layout issues.</p>
    `,
    nextLessonId: "css-lab",
    nextLessonTitle: "CSS Styling Lab",
    prevLessonId: "css-selectors",
    prevLessonTitle: "CSS Selectors",
    resources: [
      {
        title: "CSS Box Model Cheat Sheet",
        type: "pdf",
        url: "#"
      },
      {
        title: "Interactive Box Model Demo",
        type: "demo",
        url: "#"
      }
    ],
    quiz: [
      {
        question: "Which of the following is NOT a component of the CSS Box Model?",
        options: [
          "Content",
          "Padding",
          "Border",
          "Spacing"
        ],
        correctAnswer: 3
      },
      {
        question: "What does the 'box-sizing: border-box' property do?",
        options: [
          "Makes the element a flex container",
          "Includes padding and border in the element's width and height",
          "Removes all margins from the element",
          "Creates a visible box around the element"
        ],
        correctAnswer: 1
      },
      {
        question: "If an element has width: 200px, padding: 10px, border: 5px, and margin: 20px, what is its total width with the default box-sizing?",
        options: [
          "200px",
          "230px",
          "250px",
          "270px"
        ],
        correctAnswer: 2
      }
    ]
  };

  // Simulate progress tracking
  React.useEffect(() => {
    const timer = setInterval(() => {
      setLessonProgress(prev => {
        const newProgress = prev + 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button
              as={RouterLink}
              to={`/courses/${lesson.courseId}`}
              variant="light"
              size="sm"
              startContent={<Icon icon="lucide:arrow-left" width={16} />}
            >
              Back to Course
            </Button>
          </div>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="text-default-500">
            {lesson.courseName} &gt; {lesson.moduleName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="flat"
            isDisabled={!lesson.prevLessonId}
            startContent={<Icon icon="lucide:arrow-left" width={16} />}
            as={RouterLink}
            to={`/lesson/${lesson.prevLessonId}`}
          >
            Previous
          </Button>
          <Button
            color="primary"
            endContent={<Icon icon="lucide:arrow-right" width={16} />}
            as={RouterLink}
            to={`/lesson/${lesson.nextLessonId}`}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardBody className="p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Lesson Progress</span>
            <span>{lessonProgress}%</span>
          </div>
          <Progress 
            value={lessonProgress} 
            color="primary"
            aria-label="Lesson progress"
          />
        </CardBody>
      </Card>

      {/* Lesson Content */}
      <Card className="overflow-hidden">
        <Tabs 
          selectedKey={activeTab} 
          onSelectionChange={(key) => setActiveTab(key as string)}
          aria-label="Lesson Content"
        >
          <Tab key="content" title="Lesson Content">
            <CardBody className="p-6">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            </CardBody>
          </Tab>
          
          <Tab key="quiz" title="Knowledge Check">
            <CardBody className="p-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Knowledge Check</h2>
                  <p className="text-default-500 mb-6">
                    Test your understanding of the CSS Box Model with these questions.
                  </p>
                </div>
                
                {lesson.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {qIndex + 1}. {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div 
                          key={oIndex} 
                          className="flex items-center gap-2 p-3 rounded-md border border-default-200 hover:bg-default-100 cursor-pointer transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full border-2 border-default-300 flex items-center justify-center">
                            <span className="text-sm">{String.fromCharCode(65 + oIndex)}</span>
                          </div>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <Button color="primary">
                    Check Answers
                  </Button>
                </div>
              </div>
            </CardBody>
          </Tab>
          
          <Tab key="resources" title="Resources">
            <CardBody className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Lesson Resources</h2>
                  <p className="text-default-500 mb-6">
                    Additional materials to help you understand the CSS Box Model.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lesson.resources.map((resource, index) => (
                    <Card key={index}>
                      <CardBody className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary-100">
                            <Icon 
                              icon={resource.type === "pdf" ? "lucide:file-text" : "lucide:layout"} 
                              width={24} 
                              className="text-primary" 
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{resource.title}</h3>
                            <p className="text-sm text-default-500 mb-2">
                              {resource.type === "pdf" ? "PDF Document" : "Interactive Demo"}
                            </p>
                            <Button 
                              size="sm" 
                              variant="flat" 
                              color="primary"
                              startContent={
                                resource.type === "pdf" 
                                  ? <Icon icon="lucide:download" width={14} /> 
                                  : <Icon icon="lucide:external-link" width={14} />
                              }
                              as="a"
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {resource.type === "pdf" ? "Download" : "Open Demo"}
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">External Resources</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:link" width={16} className="text-primary" />
                      <a href="#" className="text-primary hover:underline">MDN Web Docs - CSS Box Model</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:link" width={16} className="text-primary" />
                      <a href="#" className="text-primary hover:underline">CSS-Tricks - The Box Model</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:link" width={16} className="text-primary" />
                      <a href="#" className="text-primary hover:underline">W3Schools - CSS Box Model Tutorial</a>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Tab>
        </Tabs>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between">
        <Button
          variant="flat"
          isDisabled={!lesson.prevLessonId}
          startContent={<Icon icon="lucide:arrow-left" width={16} />}
          as={RouterLink}
          to={`/lesson/${lesson.prevLessonId}`}
        >
          Previous: {lesson.prevLessonTitle}
        </Button>
        <Button
          color="primary"
          endContent={<Icon icon="lucide:arrow-right" width={16} />}
          as={RouterLink}
          to={`/lesson/${lesson.nextLessonId}`}
        >
          Next: {lesson.nextLessonTitle}
        </Button>
      </div>
    </div>
  );
};