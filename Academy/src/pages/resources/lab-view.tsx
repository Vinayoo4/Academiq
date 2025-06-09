import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Tabs, 
  Tab, 
  Divider,
  Chip
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { CodeEditor } from "../../components/code-editor";
import { DiscussionForum } from "../../components/discussion-forum";

interface LabViewParams {
  labId: string;
}

export const LabView: React.FC = () => {
  const { labId } = useParams<LabViewParams>();
  const [activeTab, setActiveTab] = React.useState("lab");
  
  // Mock lab data
  const lab = {
    id: labId,
    title: "HTML & CSS Sandbox",
    description: "Practice your HTML and CSS skills in this interactive sandbox environment.",
    category: "Web Development",
    difficulty: "beginner" as const,
    instructions: `
      <h2>HTML & CSS Sandbox Lab</h2>
      
      <p>This lab provides an interactive environment where you can practice your HTML and CSS skills. Use the code editor to write and test your code in real-time.</p>
      
      <h3>Instructions:</h3>
      <ol>
        <li>Use the HTML panel to create your page structure</li>
        <li>Use the CSS panel to style your HTML elements</li>
        <li>Click "Run" to see your changes in the preview panel</li>
        <li>Click "Save" to save your progress</li>
      </ol>
      
      <h3>Challenge:</h3>
      <p>Try creating a simple personal profile card with the following elements:</p>
      <ul>
        <li>A heading with your name</li>
        <li>A profile image (you can use a placeholder)</li>
        <li>A short bio paragraph</li>
        <li>A list of skills or interests</li>
        <li>Style it with CSS to make it visually appealing</li>
      </ul>
      
      <h3>Hints:</h3>
      <ul>
        <li>Use semantic HTML elements like <code>&lt;header&gt;</code>, <code>&lt;section&gt;</code>, etc.</li>
        <li>Try using CSS Flexbox or Grid for layout</li>
        <li>Experiment with colors, fonts, and spacing</li>
        <li>Add hover effects to make it interactive</li>
      </ul>
    `,
    initialHtml: `<!DOCTYPE html>
<html>
<head>
  <title>My Profile Card</title>
</head>
<body>
  <!-- Create your profile card here -->
  <div class="card">
    <h1>Your Name</h1>
    <p>Web Developer</p>
    <!-- Add more content here -->
  </div>
</body>
</html>`,
    initialCss: `/* Add your styles here */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
}

h1 {
  color: #333;
  margin-bottom: 5px;
}

/* Add more styles here */`,
    initialJs: "// You can add JavaScript here if needed",
    comments: [
      {
        id: "comment-1",
        userId: "user-2",
        userName: "Sarah Johnson",
        userAvatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
        content: "This lab was really helpful for practicing CSS flexbox. I was struggling with centering elements vertically, but now I understand how to use align-items and justify-content properly.",
        timestamp: "2023-11-15T14:30:00Z",
        likes: 5,
        isLiked: false,
        replies: [
          {
            id: "reply-1",
            userId: "user-3",
            userName: "Michael Chen",
            userAvatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3",
            content: "I agree! I also found the CSS Grid section really useful for creating responsive layouts.",
            timestamp: "2023-11-15T15:45:00Z",
            likes: 2,
            isLiked: false,
            replies: []
          }
        ]
      },
      {
        id: "comment-2",
        userId: "user-4",
        userName: "Emily Rodriguez",
        userAvatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4",
        content: "Does anyone have tips for making the profile card responsive? Mine looks good on desktop but breaks on mobile.",
        timestamp: "2023-11-16T09:20:00Z",
        likes: 3,
        isLiked: false,
        replies: [
          {
            id: "reply-2",
            userId: "user-5",
            userName: "David Kim",
            userAvatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
            content: "Try using media queries! Add @media (max-width: 768px) { ... } to adjust styles for smaller screens.",
            timestamp: "2023-11-16T10:05:00Z",
            likes: 4,
            isLiked: true,
            replies: []
          }
        ]
      }
    ]
  };

  const handleSaveCode = (code: { html: string; css: string; js: string }) => {
    console.log("Saving code:", code);
    // In a real app, this would save to the backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button
              as={RouterLink}
              to="/resources/labs"
              variant="light"
              size="sm"
              startContent={<Icon icon="lucide:arrow-left" width={16} />}
            >
              Back to Labs
            </Button>
          </div>
          <h1 className="text-2xl font-bold">{lab.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Chip color="primary" variant="flat" size="sm">
              {lab.category}
            </Chip>
            <Chip 
              color={
                lab.difficulty === "beginner" 
                  ? "success" 
                  : lab.difficulty === "intermediate" 
                    ? "warning" 
                    : "danger"
              } 
              variant="flat" 
              size="sm"
            >
              {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
            </Chip>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="flat"
            startContent={<Icon icon="lucide:bookmark" width={16} />}
          >
            Save
          </Button>
          <Button
            color="primary"
            startContent={<Icon icon="lucide:share-2" width={16} />}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Lab Content */}
      <Tabs 
        selectedKey={activeTab} 
        onSelectionChange={(key) => setActiveTab(key as string)}
        aria-label="Lab Content"
      >
        <Tab key="lab" title="Lab">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Instructions</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <div 
                className="prose dark:prose-invert max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: lab.instructions }}
              />
              
              <CodeEditor
                initialHtml={lab.initialHtml}
                initialCss={lab.initialCss}
                initialJs={lab.initialJs}
                onSave={handleSaveCode}
                height="400px"
              />
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="discussion" title="Discussion">
          <DiscussionForum
            title="Lab Discussion"
            comments={lab.comments}
          />
        </Tab>
      </Tabs>
    </div>
  );
};