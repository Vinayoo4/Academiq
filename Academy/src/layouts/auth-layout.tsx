import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Auth form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10">
            <RouterLink to="/" className="flex items-center gap-2">
              <Icon icon="lucide:graduation-cap" width={32} className="text-primary" />
              <span className="text-2xl font-bold text-primary">TechAcademy</span>
            </RouterLink>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
              Welcome to TechAcademy
            </h2>
            <p className="mt-2 text-sm text-foreground-500">
              Your complete online learning platform for tech skills
            </p>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="absolute inset-0 bg-opacity-80 flex flex-col justify-center items-center p-12">
            <div className="max-w-2xl text-center text-white">
              <h2 className="text-3xl font-bold mb-6">Master Tech Skills at Your Own Pace</h2>
              <p className="text-lg mb-8">
                Interactive labs, comprehensive roadmaps, and hands-on assignments to help you become job-ready.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <Icon icon="lucide:code" width={32} className="mb-3 text-white" />
                  <h3 className="text-xl font-semibold mb-2">Coding Labs</h3>
                  <p className="text-sm">Practice with real-world projects in our interactive coding environment</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <Icon icon="lucide:map" width={32} className="mb-3 text-white" />
                  <h3 className="text-xl font-semibold mb-2">Learning Paths</h3>
                  <p className="text-sm">Structured roadmaps to guide your learning journey step by step</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <Icon icon="lucide:file-text" width={32} className="mb-3 text-white" />
                  <h3 className="text-xl font-semibold mb-2">Cheat Sheets</h3>
                  <p className="text-sm">Quick reference guides for all the technologies you're learning</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <Icon icon="lucide:award" width={32} className="mb-3 text-white" />
                  <h3 className="text-xl font-semibold mb-2">Certificates</h3>
                  <p className="text-sm">Earn certificates to showcase your skills to employers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};