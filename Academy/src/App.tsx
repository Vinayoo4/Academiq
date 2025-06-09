import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { CourseDetail } from "./pages/courses/course-detail";
import { CoursesList } from "./pages/courses/courses-list";
import { AssignmentView } from "./pages/learning/assignment-view";
import { LessonView } from "./pages/learning/lesson-view";
import { CheatSheets } from "./pages/resources/cheat-sheets";
import { Worksheets } from "./pages/resources/worksheets";
import { Labs } from "./pages/resources/labs";
import { Certificates } from "./pages/profile/certificates";
import { Profile } from "./pages/profile/profile";
import { RoadmapView } from "./pages/learning/roadmap-view";
import { NotFound } from "./pages/not-found";
import { AuthProvider, ProtectedRoute } from "./contexts/auth-context";

function App() {
  // Use authentication context instead of hardcoded value
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/* Auth Routes */}
          <Route path="/auth">
            <AuthLayout>
              <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/register" component={Register} />
                <Redirect from="/auth" to="/auth/login" />
              </Switch>
            </AuthLayout>
          </Route>

          {/* Protected Routes */}
          <Route
            path="/"
            render={() => {
              return (
                <ProtectedRoute>
                  <DashboardLayout>
                    <Switch>
                      <Route exact path="/" component={Dashboard} />
                      <Route exact path="/courses" component={CoursesList} />
                      <Route path="/courses/:courseId" component={CourseDetail} />
                      <Route path="/lesson/:lessonId" component={LessonView} />
                      <Route path="/assignment/:assignmentId" component={AssignmentView} />
                      <Route path="/roadmap/:courseId" component={RoadmapView} />
                      <Route path="/resources/cheat-sheets" component={CheatSheets} />
                      <Route path="/resources/worksheets" component={Worksheets} />
                      <Route path="/resources/labs" component={Labs} />
                      <Route path="/profile" component={Profile} />
                      <Route path="/certificates" component={Certificates} />
                      <Route component={NotFound} />
                    </Switch>
                  </DashboardLayout>
                </ProtectedRoute>
              );
            }}
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;