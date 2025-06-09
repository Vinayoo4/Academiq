import React from "react";
import { 
  Card, 
  CardBody, 
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
import { CertificateCard } from "../../components/certificate-card";

export const Certificates: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Mock data for certificates
  const allCertificates = [
    {
      id: "CERT-HTML-CSS-001",
      title: "HTML & CSS Fundamentals",
      issueDate: "2023-06-15",
      courseId: "html-css-basics",
      courseName: "HTML & CSS Fundamentals",
      score: 92,
      imageUrl: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=1",
      downloadUrl: "#",
      shareUrl: "#"
    },
    {
      id: "CERT-JS-001",
      title: "JavaScript Essentials",
      issueDate: "2023-08-22",
      courseId: "javascript-essentials",
      courseName: "JavaScript Essentials",
      score: 88,
      imageUrl: "https://img.heroui.chat/image/dashboard?w=800&h=400&u=2",
      downloadUrl: "#",
      shareUrl: "#"
    }
  ];

  // Filter certificates based on search query and category
  const filteredCertificates = allCertificates.filter((certificate) => {
    const matchesSearch = certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         certificate.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         certificate.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || certificate.courseName.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Categories for filter
  const categories = ["all", "HTML", "CSS", "JavaScript", "Python", "Cybersecurity"];

  // Pagination
  const certificatesPerPage = 6;
  const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);
  const currentCertificates = filteredCertificates.slice(
    (currentPage - 1) * certificatesPerPage,
    currentPage * certificatesPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">My Certificates</h1>
        <p className="text-default-500">
          View and share your earned certificates
        </p>
      </div>

      {/* Certificate Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary-100">
                <Icon icon="lucide:award" width={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-default-500">Total Certificates</p>
                <p className="text-2xl font-semibold">{allCertificates.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-success-100">
                <Icon icon="lucide:trending-up" width={24} className="text-success" />
              </div>
              <div>
                <p className="text-sm text-default-500">Average Score</p>
                <p className="text-2xl font-semibold">
                  {allCertificates.length > 0 
                    ? Math.round(allCertificates.reduce((sum, cert) => sum + cert.score, 0) / allCertificates.length) 
                    : 0}%
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-warning-100">
                <Icon icon="lucide:calendar" width={24} className="text-warning" />
              </div>
              <div>
                <p className="text-sm text-default-500">Latest Certificate</p>
                <p className="text-2xl font-semibold">
                  {allCertificates.length > 0 
                    ? new Date(Math.max(...allCertificates.map(cert => new Date(cert.issueDate).getTime()))).toLocaleDateString() 
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search certificates..."
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

      {/* Certificates Grid */}
      {currentCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCertificates.map((certificate) => (
            <CertificateCard key={certificate.id} {...certificate} />
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <CardBody className="flex flex-col items-center text-center">
            <Icon icon="lucide:award" width={64} className="text-default-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Certificates Found</h3>
            {searchQuery || selectedCategory !== "all" ? (
              <div>
                <p className="text-default-500 mb-4">
                  No certificates match your search criteria. Try adjusting your filters.
                </p>
                <Button 
                  color="primary" 
                  variant="flat" 
                  onPress={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-default-500 mb-4">
                  You haven't earned any certificates yet. Complete courses to earn certificates.
                </p>
                <Button 
                  color="primary" 
                  as={RouterLink}
                  to="/courses"
                >
                  Browse Courses
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Pagination */}
      {filteredCertificates.length > certificatesPerPage && (
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