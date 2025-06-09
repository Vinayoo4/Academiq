import React from "react";
import { 
  Input, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Pagination,
  Chip
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { CourseCard } from "../../components/course-card";

export const CoursesList: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedLevel, setSelectedLevel] = React.useState<string>("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Mock data for courses
  const allCourses = [
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
    {
      id: "react-fundamentals",
      title: "React Fundamentals",
      description: "Learn to build interactive UIs with React JavaScript library.",
      category: "Web Development",
      progress: 0,
      image: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=4",
      lessons: 14,
      assignments: 5,
      labs: 6,
      level: "Intermediate" as const,
    },
    {
      id: "cybersecurity-basics",
      title: "Cybersecurity Fundamentals",
      description: "Introduction to cybersecurity concepts and best practices.",
      category: "Cybersecurity",
      progress: 0,
      image: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=5",
      lessons: 12,
      assignments: 4,
      labs: 5,
      level: "Beginner" as const,
    },
    {
      id: "advanced-javascript",
      title: "Advanced JavaScript",
      description: "Deep dive into advanced JavaScript concepts and patterns.",
      category: "Web Development",
      progress: 0,
      image: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=6",
      lessons: 16,
      assignments: 7,
      labs: 5,
      level: "Advanced" as const,
    },
    {
      id: "css-frameworks",
      title: "CSS Frameworks & Preprocessors",
      description: "Learn popular CSS frameworks and preprocessors like Tailwind, Bootstrap, and SASS.",
      category: "Web Development",
      progress: 0,
      image: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=7",
      lessons: 10,
      assignments: 4,
      labs: 3,
      level: "Intermediate" as const,
    },
    {
      id: "python-data-science",
      title: "Python for Data Science",
      description: "Use Python for data analysis, visualization, and machine learning.",
      category: "Data Science",
      progress: 0,
      image: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=8",
      lessons: 15,
      assignments: 6,
      labs: 7,
      level: "Advanced" as const,
    },
    {
      id: "network-security",
      title: "Network Security",
      description: "Learn to secure networks and protect against common attacks.",
      category: "Cybersecurity",
      progress: 0,
      image: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=9",
      lessons: 14,
      assignments: 5,
      labs: 6,
      level: "Advanced" as const,
    },
  ];

  // Filter courses based on search query, category, and level
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Categories for filter
  const categories = ["all", ...new Set(allCourses.map(course => course.category))];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  // Pagination
  const coursesPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Courses</h1>
        <p className="text-default-500">
          Browse our collection of courses to enhance your tech skills
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" width={16} className="text-default-400" />}
          className="md:max-w-xs"
        />
        
        <div className="flex gap-2 ml-auto">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                endContent={<Icon icon="lucide:chevron-down" width={16} />}
              >
                {selectedCategory === "all" ? "All Categories" : selectedCategory}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Categories" 
              selectionMode="single" 
              selectedKeys={[selectedCategory]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setSelectedCategory(selected);
                setCurrentPage(1);
              }}
            >
              {categories.map((category) => (
                <DropdownItem key={category}>
                  {category === "all" ? "All Categories" : category}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                endContent={<Icon icon="lucide:chevron-down" width={16} />}
              >
                {selectedLevel === "all" ? "All Levels" : selectedLevel}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Levels" 
              selectionMode="single" 
              selectedKeys={[selectedLevel]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setSelectedLevel(selected);
                setCurrentPage(1);
              }}
            >
              {levels.map((level) => (
                <DropdownItem key={level}>
                  {level === "all" ? "All Levels" : level}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== "all" || selectedLevel !== "all" || searchQuery) && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Chip 
              onClose={() => setSearchQuery("")}
              variant="flat"
              color="primary"
            >
              Search: {searchQuery}
            </Chip>
          )}
          
          {selectedCategory !== "all" && (
            <Chip 
              onClose={() => setSelectedCategory("all")}
              variant="flat"
              color="primary"
            >
              Category: {selectedCategory}
            </Chip>
          )}
          
          {selectedLevel !== "all" && (
            <Chip 
              onClose={() => setSelectedLevel("all")}
              variant="flat"
              color="primary"
            >
              Level: {selectedLevel}
            </Chip>
          )}
        </div>
      )}

      {/* Courses Grid */}
      {currentCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon icon="lucide:search-x" width={48} className="mx-auto mb-4 text-default-300" />
          <h3 className="text-lg font-medium">No courses found</h3>
          <p className="text-default-500">
            Try adjusting your search or filter criteria
          </p>
          <Button 
            color="primary" 
            variant="flat" 
            className="mt-4"
            onPress={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedLevel("all");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredCourses.length > coursesPerPage && (
        <div className="flex justify-center mt-8">
          <Pagination 
            total={totalPages} 
            initialPage={1}
            page={currentPage}
            onChange={setCurrentPage}
            showControls
          />
        </div>
      )}
    </div>
  );
};