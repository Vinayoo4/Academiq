import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardBody, CardHeader, Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CourseCard } from "../../components/course-card";
import { ProgressStats } from "../../components/progress-stats";
import { RoadmapItem } from "../../components/roadmap-item";

export const Dashboard: React.FC = () => {
  // Mock data for progress stats
  const progressStats = {
    overallProgress: 42,
    dailyStreak: 7,
    hoursSpent: 24,
    assignmentsCompleted: 12,
    certificatesEarned: 2,
    weeklyData: [
      { day: "Mon", minutes: 45 },
      { day: "Tue", minutes: 60 },
      { day: "Wed", minutes: 30 },
      { day: "Thu", minutes: 90 },
      { day: "Fri", minutes: 45 },
      { day: "Sat", minutes: 120 },
      { day: "Sun", minutes: 75 },
    ],
  };

  // Mock data for in-progress courses
  const inProgressCourses = [
    {
      id: "html-css-basics",
      title: "HTML & CSS Fundamentals",
      description: "Learn the building blocks of web development with HTML and CSS.",
      category: "Web Development",
      progress: 65,
      image: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=1",
      lessons: 12,
      assignments: 4,
      labs: 3,
      level: "Beginner" as const,
    },
    {
      id: "javascript-essentials",
      title: "JavaScript Essentials",
      description: "Master the core concepts of JavaScript programming language.",
      category: "Web Development",
      progress: 35,
      image: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=2",
      lessons: 15,
      assignments: 6,
      labs: 4,
      level: "Intermediate" as const,
    },
    {
      id: "python-basics",
      title: "Python Basics",
      description: "Get started with Python programming language fundamentals.",
      category: "Programming",
      progress: 20,
      image: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=3",
      lessons: 10,
      assignments: 5,
      labs: 3,
      level: "Beginner" as const,
    },
  ];

  // Mock data for upcoming tasks
  const upcomingTasks = [
    {
      id: "css-flexbox",
      title: "CSS Flexbox Layout",
      type: "lesson" as const,
      status: "in-progress" as const,
      duration: 30,
      description: "Learn how to create flexible layouts with CSS Flexbox.",
    },
    {
      id: "html-portfolio",
      title: "Build Your First Portfolio",
      type: "assignment" as const,
      status: "in-progress" as const,
      duration: 120,
      description: "Create a personal portfolio website using HTML and CSS.",
      requiredScore: 75,
    },
    {
      id: "js-variables",
      title: "JavaScript Variables & Data Types",
      type: "quiz" as const,
      status: "locked" as const,
      duration: 15,
      description: "Test your knowledge of JavaScript variables and data types.",
      requiredScore: 80,
    },
    {
      id: "css-grid-lab",
      title: "CSS Grid Layout Lab",
      type: "lab" as const,
      status: "locked" as const,
      duration: 45,
      description: "Practice building complex layouts with CSS Grid.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, John! 👋</h1>
          <p className="text-default-500">
            Continue your learning journey. You're making great progress!
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="flat"
            color="primary"
            startContent={<Icon icon="lucide:search" width={16} />}
            as={RouterLink}
            to="/courses"
          >
            Explore Courses
          </Button>
          <Button
            color="primary"
            startContent={<Icon icon="lucide:play" width={16} />}
            as={RouterLink}
            to="/courses/html-css-basics"
          >
            Resume Learning
          </Button>
        </div>
      </div>

      {/* Progress Stats */}
      <ProgressStats {...progressStats} />

      {/* In Progress Courses */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">In Progress Courses</h2>
          <Button
            variant="light"
            color="primary"
            endContent={<Icon icon="lucide:chevron-right" width={16} />}
            as={RouterLink}
            to="/courses"
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Continue Learning</h2>
          <Button
            variant="light"
            color="primary"
            endContent={<Icon icon="lucide:chevron-right" width={16} />}
            as={RouterLink}
            to="/roadmap/html-css-basics"
          >
            View Roadmap
          </Button>
        </div>
        <div className="space-y-4">
          {upcomingTasks.map((task) => (
            <RoadmapItem key={task.id} {...task} />
          ))}
        </div>
      </div>

      {/* Resources & Help */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Resources */}
        <Card>
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:book" width={24} className="text-primary" />
            <div className="flex flex-col">
              <p className="text-md">Quick Resources</p>
              <p className="text-small text-default-500">Helpful materials for your studies</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:file-text" width={18} />}
              className="w-full justify-start"
              as={RouterLink}
              to="/resources/cheat-sheets"
            >
              HTML & CSS Cheat Sheet
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:clipboard-list" width={18} />}
              className="w-full justify-start"
              as={RouterLink}
              to="/resources/worksheets"
            >
              JavaScript Practice Worksheets
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:flask-conical" width={18} />}
              className="w-full justify-start"
              as={RouterLink}
              to="/resources/labs"
            >
              Interactive Coding Labs
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:map" width={18} />}
              className="w-full justify-start"
              as={RouterLink}
              to="/roadmap/html-css-basics"
            >
              Learning Roadmaps
            </Button>
          </CardBody>
        </Card>

        {/* Help & Support */}
        <Card>
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:help-circle" width={24} className="text-primary" />
            <div className="flex flex-col">
              <p className="text-md">Help & Support</p>
              <p className="text-small text-default-500">Get assistance with your learning</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:message-circle" width={18} />}
              className="w-full justify-start"
            >
              Chat with Support
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:users" width={18} />}
              className="w-full justify-start"
            >
              Community Forum
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:video" width={18} />}
              className="w-full justify-start"
            >
              Schedule 1:1 Tutoring
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:file-question" width={18} />}
              className="w-full justify-start"
            >
              FAQs & Documentation
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};