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

export const CheatSheets: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Mock data for cheat sheets
  const allCheatSheets = [
    {
      id: "html-cheatsheet",
      title: "HTML Cheat Sheet",
      description: "Quick reference guide for HTML elements, attributes, and best practices.",
      type: "cheatsheet" as const,
      category: "Web Development",
      difficulty: "beginner" as const,
      downloadUrl: "#",
      viewUrl: "/resources/cheat-sheets/html",
      tags: ["HTML", "Elements", "Attributes"]
    },
    {
      id: "css-cheatsheet",
      title: "CSS Cheat Sheet",
      description: "Quick reference guide for CSS properties, selectors, and values.",
      type: "cheatsheet" as const,
      category: "Web Development",
      difficulty: "beginner" as const,
      downloadUrl: "#",
      viewUrl: "/resources/cheat-sheets/css",
      tags: ["CSS", "Properties", "Selectors"]
    },
    {
      id: "javascript-cheatsheet",
      title: "JavaScript Cheat Sheet",
      description: "Quick reference guide for JavaScript syntax, methods, and common patterns.",
      type: "cheatsheet" as const,
      category: "Web Development",
      difficulty: "intermediate" as const,
      downloadUrl: "#",
      viewUrl: "/resources/cheat-sheets/javascript",
      tags: ["JavaScript", "ES6", "Functions"]
    },
    {
      id: "python-cheatsheet",
      title: "Python Cheat Sheet",
      description: "Quick reference guide for Python syntax, built-in functions, and common libraries.",
      type: "cheatsheet" as const,
      category: "Programming",
      difficulty: "beginner" as const,
      downloadUrl: "#",
      viewUrl: "/resources/cheat-sheets/python",
      tags: ["Python", "Syntax", "Libraries"]
    },
    {
      id: "react-cheatsheet",
      title: "React Cheat Sheet",
      description: "Quick reference guide for React components, hooks, and patterns.",
      type: "cheatsheet" as const,
      category: "Web Development",
      difficulty: "intermediate" as const,
      downloadUrl: "#",
      viewUrl: "/resources/cheat-sheets/react",
      tags: ["React", "Hooks", "Components"]
    },
    {
      id: "git-cheatsheet",
      title: "Git Cheat Sheet",
      description: "Quick reference guide for common Git commands and workflows.",
      type: "cheatsheet" as const,
      category: "Development Tools",
      difficulty: "beginner" as const,
      downloadUrl: "#",
      viewUrl: "/resources/cheat-sheets/git",
      tags: ["Git", "Version Control", "Commands"]
    },
    {
      id: "sql-cheatsheet",
      title: "SQL Cheat Sheet",
      description: "Quick reference guide for SQL syntax, commands, and common queries.",
      type: "cheatsheet" as const,
      category: "Database",
      difficulty: "intermediate" as const,
      downloadUrl: "#",
      viewUrl: "/resources/cheat-sheets/sql",
      tags: ["SQL", "Database", "Queries"]
    },
    {
      id: "linux-commands-cheatsheet",
      title: "Linux Commands Cheat Sheet",
      description: "Quick reference guide for common Linux terminal commands.",
      type: "cheatsheet" as const,
      category: "Development Tools",
      difficulty: "intermediate" as const,
      downloadUrl: "#",
      viewUrl: "/resources/cheat-sheets/linux-commands",
      tags: ["Linux", "Terminal", "Commands"]
    },
    {
      id: "cybersecurity-cheatsheet",
      title: "Cybersecurity Cheat Sheet",
      description: "Quick reference guide for common security concepts, tools, and best practices.",
      type: "cheatsheet" as const,
      category: "Cybersecurity",
      difficulty: "intermediate" as const,
      downloadUrl: "#",
      viewUrl: "/resources/cheat-sheets/cybersecurity",
      tags: ["Security", "Best Practices", "Tools"]
    }
  ];

  // Filter cheat sheets based on search query and category
  const filteredCheatSheets = allCheatSheets.filter((cheatSheet) => {
    const matchesSearch = cheatSheet.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cheatSheet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cheatSheet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || cheatSheet.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Categories for filter
  const categories = ["all", ...new Set(allCheatSheets.map(cheatSheet => cheatSheet.category))];

  // Pagination
  const cheatSheetsPerPage = 6;
  const totalPages = Math.ceil(filteredCheatSheets.length / cheatSheetsPerPage);
  const currentCheatSheets = filteredCheatSheets.slice(
    (currentPage - 1) * cheatSheetsPerPage,
    currentPage * cheatSheetsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Cheat Sheets</h1>
        <p className="text-default-500">
          Quick reference guides for programming languages, frameworks, and tools
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search cheat sheets..."
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
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== "all" || searchQuery) && (
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
        </div>
      )}

      {/* Cheat Sheets Grid */}
      {currentCheatSheets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCheatSheets.map((cheatSheet) => (
            <ResourceCard key={cheatSheet.id} {...cheatSheet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon icon="lucide:search-x" width={48} className="mx-auto mb-4 text-default-300" />
          <h3 className="text-lg font-medium">No cheat sheets found</h3>
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
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredCheatSheets.length > cheatSheetsPerPage && (
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