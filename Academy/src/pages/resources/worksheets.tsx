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
import { ResourceCard } from "../../components/resource-card";

export const Worksheets: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Mock data for worksheets
  const allWorksheets = [
    {
      id: "html-basics-worksheet",
      title: "HTML Basics Worksheet",
      description: "Practice exercises for HTML elements, attributes, and document structure.",
      type: "worksheet" as const,
      category: "Web Development",
      difficulty: "beginner" as const,
      downloadUrl: "#",
      viewUrl: "/resources/worksheets/html-basics",
      tags: ["HTML", "Elements", "Attributes"]
    },
    {
      id: "css-selectors-worksheet",
      title: "CSS Selectors Worksheet",
      description: "Practice using different types of CSS selectors to target HTML elements.",
      type: "worksheet" as const,
      category: "Web Development",
      difficulty: "beginner" as const,
      downloadUrl: "#",
      viewUrl: "/resources/worksheets/css-selectors",
      tags: ["CSS", "Selectors", "Specificity"]
    },
    {
      id: "javascript-functions-worksheet",
      title: "JavaScript Functions Worksheet",
      description: "Practice creating and using different types of functions in JavaScript.",
      type: "worksheet" as const,
      category: "Web Development",
      difficulty: "intermediate" as const,
      downloadUrl: "#",
      viewUrl: "/resources/worksheets/javascript-functions",
      tags: ["JavaScript", "Functions", "ES6"]
    },
    {
      id: "python-loops-worksheet",
      title: "Python Loops Worksheet",
      description: "Practice exercises for working with loops in Python.",
      type: "worksheet" as const,
      category: "Programming",
      difficulty: "beginner" as const,
      downloadUrl: "#",
      viewUrl: "/resources/worksheets/python-loops",
      tags: ["Python", "Loops", "Control Flow"]
    },
    {
      id: "react-state-worksheet",
      title: "React State Management Worksheet",
      description: "Practice exercises for managing state in React components.",
      type: "worksheet" as const,
      category: "Web Development",
      difficulty: "advanced" as const,
      downloadUrl: "#",
      viewUrl: "/resources/worksheets/react-state",
      tags: ["React", "State", "Hooks"]
    },
    {
      id: "network-protocols-worksheet",
      title: "Network Protocols Worksheet",
      description: "Practice identifying and understanding common network protocols.",
      type: "worksheet" as const,
      category: "Cybersecurity",
      difficulty: "intermediate" as const,
      downloadUrl: "#",
      viewUrl: "/resources/worksheets/network-protocols",
      tags: ["Networking", "Protocols", "TCP/IP"]
    },
    {
      id: "sql-queries-worksheet",
      title: "SQL Queries Worksheet",
      description: "Practice writing SQL queries for different database operations.",
      type: "worksheet" as const,
      category: "Database",
      difficulty: "intermediate" as const,
      downloadUrl: "#",
      viewUrl: "/resources/worksheets/sql-queries",
      tags: ["SQL", "Database", "Queries"]
    },
    {
      id: "css-layout-worksheet",
      title: "CSS Layout Worksheet",
      description: "Practice creating different layouts using CSS techniques.",
      type: "worksheet" as const,
      category: "Web Development",
      difficulty: "intermediate" as const,
      downloadUrl: "#",
      viewUrl: "/resources/worksheets/css-layout",
      tags: ["CSS", "Layout", "Flexbox", "Grid"]
    }
  ];

  // Filter worksheets based on search query, category, and difficulty
  const filteredWorksheets = allWorksheets.filter((worksheet) => {
    const matchesSearch = worksheet.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         worksheet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worksheet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || worksheet.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || worksheet.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Categories and difficulties for filters
  const categories = ["all", ...new Set(allWorksheets.map(worksheet => worksheet.category))];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  // Pagination
  const worksheetsPerPage = 6;
  const totalPages = Math.ceil(filteredWorksheets.length / worksheetsPerPage);
  const currentWorksheets = filteredWorksheets.slice(
    (currentPage - 1) * worksheetsPerPage,
    currentPage * worksheetsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Practice Worksheets</h1>
        <p className="text-default-500">
          Reinforce your learning with these practice worksheets
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search worksheets..."
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
                {selectedDifficulty === "all" 
                  ? "All Difficulties" 
                  : selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Difficulties" 
              selectionMode="single" 
              selectedKeys={[selectedDifficulty]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setSelectedDifficulty(selected);
                setCurrentPage(1);
              }}
            >
              {difficulties.map((difficulty) => (
                <DropdownItem key={difficulty}>
                  {difficulty === "all" 
                    ? "All Difficulties" 
                    : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== "all" || selectedDifficulty !== "all" || searchQuery) && (
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
          
          {selectedDifficulty !== "all" && (
            <Chip 
              onClose={() => setSelectedDifficulty("all")}
              variant="flat"
              color="primary"
            >
              Difficulty: {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
            </Chip>
          )}
        </div>
      )}

      {/* Worksheets Grid */}
      {currentWorksheets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentWorksheets.map((worksheet) => (
            <ResourceCard key={worksheet.id} {...worksheet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon icon="lucide:search-x" width={48} className="mx-auto mb-4 text-default-300" />
          <h3 className="text-lg font-medium">No worksheets found</h3>
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
              setSelectedDifficulty("all");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredWorksheets.length > worksheetsPerPage && (
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