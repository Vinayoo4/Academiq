import React from "react";
import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";

interface ProgressStatsProps {
  overallProgress: number;
  dailyStreak: number;
  hoursSpent: number;
  assignmentsCompleted: number;
  certificatesEarned: number;
  weeklyData: Array<{
    day: string;
    minutes: number;
  }>;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({
  overallProgress,
  dailyStreak,
  hoursSpent,
  assignmentsCompleted,
  certificatesEarned,
  weeklyData
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Overall Progress */}
      <Card className="col-span-1">
        <CardHeader className="flex gap-3">
          <Icon icon="lucide:activity" width={24} className="text-primary" />
          <div className="flex flex-col">
            <p className="text-md">Overall Progress</p>
            <p className="text-small text-default-500">Your learning journey</p>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          <div className="flex justify-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32">
                <circle
                  className="text-default-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-primary"
                  strokeWidth="8"
                  strokeDasharray={`${overallProgress * 3.51} 351`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                  style={{ 
                    transformOrigin: "center", 
                    transform: "rotate(-90deg)", 
                    transition: "stroke-dasharray 0.5s ease" 
                  }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{overallProgress}%</span>
                <span className="text-xs text-default-500">Completed</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Icon icon="lucide:flame" width={16} className="text-danger" />
                <span className="text-xl font-semibold">{dailyStreak}</span>
              </div>
              <span className="text-xs text-default-500">Day Streak</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Icon icon="lucide:clock" width={16} className="text-warning" />
                <span className="text-xl font-semibold">{hoursSpent}</span>
              </div>
              <span className="text-xs text-default-500">Hours Spent</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Icon icon="lucide:check-circle" width={16} className="text-success" />
                <span className="text-xl font-semibold">{assignmentsCompleted}</span>
              </div>
              <span className="text-xs text-default-500">Assignments</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Icon icon="lucide:award" width={16} className="text-primary" />
                <span className="text-xl font-semibold">{certificatesEarned}</span>
              </div>
              <span className="text-xs text-default-500">Certificates</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Weekly Activity */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex gap-3">
          <Icon icon="lucide:bar-chart" width={24} className="text-primary" />
          <div className="flex flex-col">
            <p className="text-md">Weekly Activity</p>
            <p className="text-small text-default-500">Minutes spent learning</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--heroui-default-200))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--heroui-default-500))" 
                  fontSize={12} 
                />
                <YAxis 
                  stroke="hsl(var(--heroui-default-500))" 
                  fontSize={12}
                  tickFormatter={(value) => `${value}m`}
                />
                <Tooltip 
                  formatter={(value) => [`${value} minutes`, 'Time Spent']}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--heroui-content1))',
                    border: '1px solid hsl(var(--heroui-default-200))',
                    borderRadius: '8px',
                    padding: '8px',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="minutes" 
                  stroke="hsl(var(--heroui-primary))" 
                  fill="hsl(var(--heroui-primary-100))" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};