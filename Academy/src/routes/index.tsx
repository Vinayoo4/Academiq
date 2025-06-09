// ... existing imports ...

// Add lazy loading for better performance
import React, { lazy, Suspense } from "react";
import { Spinner } from "@heroui/react";

// Lazy load components
const Dashboard = lazy(() => import("../pages/dashboard").then(module => ({ default: module.Dashboard })));
const CoursesList = lazy(() => import("../pages/courses/courses-list").then(module => ({ default: module.CoursesList })));
const CourseDetail = lazy(() => import("../pages/courses/course-detail").then(module => ({ default: module.CourseDetail })));
const LessonView = lazy(() => import("../pages/learning/lesson-view").then(module => ({ default: module.LessonView })));
const AssignmentView = lazy(() => import("../pages/learning/assignment-view").then(module => ({ default: module.AssignmentView })));
const QuizView = lazy(() => import("../pages/learning/quiz-view").then(module => ({ default: module.QuizView })));
const RoadmapView = lazy(() => import("../pages/learning/roadmap-view").then(module => ({ default: module.RoadmapView })));
const CheatSheets = lazy(() => import("../pages/resources/cheat-sheets").then(module => ({ default: module.CheatSheets })));
const Worksheets = lazy(() => import("../pages/resources/worksheets").then(module => ({ default: module.Worksheets })));
const Labs = lazy(() => import("../pages/resources/labs").then(module => ({ default: module.Labs })));
const LabView = lazy(() => import("../pages/resources/lab-view").then(module => ({ default: module.LabView })));
const Certificates = lazy(() => import("../pages/profile/certificates").then(module => ({ default: module.Certificates })));
const Profile = lazy(() => import("../pages/profile/profile").then(module => ({ default: module.Profile })));
const NotFound = lazy(() => import("../pages/not-found").then(module => ({ default: module.NotFound })));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-[70vh]">
    <Spinner size="lg" color="primary" />
  </div>
);

// Update App.tsx to use these lazy-loaded components with Suspense