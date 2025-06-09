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

export const Labs: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Mock data for labs
  const allLabs = [
    {
      id: "html-css-sandbox",
      title: "HTML & CSS Sandbox",
      description: "An interactive environment to practice your HTML and CSS skills with live preview.",
      type: "lab" as const,
      category: "Web Development",
      difficulty: "beginner" as const,
      viewUrl: "/resources/labs/html-css-sandbox",
      tags: ["HTML", "CSS", "Practice"]
    },
    {
      id: "javascript-playground",
      title: "JavaScript Playground",
      description: "Test and experiment with JavaScript code in a safe environment with console output.",
      type: "lab" as const,
      category: "Web Development",
      difficulty: "intermediate" as const,
      viewUrl: "/resources/labs/javascript-playground",
      tags: ["JavaScript", "ES6", "DOM"]
    },
    {
      id: "responsive-design-lab",
      title: "Responsive Design Lab",
      description: "Practice creating responsive layouts that adapt to different screen sizes.",
      type: "lab" as const,
      category: "Web Development",
      difficulty: "intermediate" as const,
      viewUrl: "/resources/labs/responsive-design",
      tags: ["CSS", "Media Queries", "Flexbox", "Grid"]
    },
    {
      id: "python-basics-lab",
      title: "Python Basics Lab",
      description: "Interactive Python environment to practice basic syntax and concepts.",
      type: "lab" as const,
      category: "Programming",
      difficulty: "beginner" as const,
      viewUrl: "/resources/labs/python-basics",
      tags: ["Python", "Programming", "Basics"]
    },
    {
      id: "react-components-lab",
      title: "React Components Lab",
      description: "Build and test React components in an isolated environment.",
      type: "lab" as const,
      category: "Web Development",
      difficulty: "advanced" as const,
      viewUrl: "/resources/labs/react-components",
      tags: ["React", "JavaScript", "Components"]
    },
    {
      id: "network-security-lab",
      title: "Network Security Lab",
      description: "Simulate network security scenarios and practice defensive techniques.",
      type: "lab" as const,
      category: "Cybersecurity",
      difficulty: "advanced" as const,
      viewUrl: "/resources/labs/network-security",
      tags: ["Security", "Networking", "Firewalls"]
    },
    {
      id: "sql-database-lab",
      title: "SQL Database Lab",
      description: "Practice SQL queries and database operations in a safe environment.",
      type: "lab" as const,
      category: "Database",
      difficulty: "intermediate" as const,
      viewUrl: "/resources/labs/sql-database",
      tags: ["SQL", "Database", "Queries"]
    },
    {
      id: "css-animations-lab",
      title: "CSS Animations Lab",
      description: "Experiment with CSS animations, transitions, and keyframes.",
      type: "lab" as const,
      category: "Web Development",
      difficulty: "intermediate" as const,
      viewUrl: "/resources/labs/css-animations",
      tags: ["CSS", "Animations", "Transitions"]
    },
    {
      id: "ethical-hacking-lab",
      title: "Ethical Hacking Lab",
      description: "Practice ethical hacking techniques in a controlled environment.",
      type: "lab" as const,
      category: "Cybersecurity",
      difficulty: "advanced" as const,
      viewUrl: "/resources/labs/ethical-hacking",
      tags: ["Security", "Hacking", "Penetration Testing"]
    }
  ];

  // Filter labs based on search query, category, and difficulty
  const filteredLabs = allLabs.filter((lab) => {
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || lab.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || lab.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Categories and difficulties for filters
  const categories = ["all", ...new Set(allLabs.map(lab => lab.category))];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  // Pagination
  const labsPerPage = 6;
  const totalPages = Math.ceil(filteredLabs.length / labsPerPage);
  const currentLabs = filteredLabs.slice(
    (currentPage - 1) * labsPerPage,
    currentPage * labsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Interactive Labs</h1>
        <p className="text-default-500">
          Practice your skills in our interactive coding environments
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search labs..."
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

      {/* Labs Grid */}
      {currentLabs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentLabs.map((lab) => (
            <ResourceCard key={lab.id} {...lab} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon icon="lucide:search-x" width={48} className="mx-auto mb-4 text-default-300" />
          <h3 className="text-lg font-medium">No labs found</h3>
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
      {filteredLabs.length > labsPerPage && (
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