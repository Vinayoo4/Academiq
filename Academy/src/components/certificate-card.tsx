import React from "react";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export interface CertificateCardProps {
  id: string;
  title: string;
  issueDate: string;
  expiryDate?: string;
  courseId: string;
  courseName: string;
  score: number;
  imageUrl: string;
  downloadUrl: string;
  shareUrl: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  id,
  title,
  issueDate,
  expiryDate,
  courseId,
  courseName,
  score,
  imageUrl,
  downloadUrl,
  shareUrl,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className="h-full">
      <CardBody className="p-0 overflow-hidden">
        <div className="relative">
          <img
            src={imageUrl}
            alt={`${title} Certificate`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            <p className="text-white/80 text-sm">{courseName}</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-default-500">Issue Date</p>
              <p className="text-sm font-medium">{formatDate(issueDate)}</p>
            </div>
            {expiryDate && (
              <div>
                <p className="text-xs text-default-500">Expiry Date</p>
                <p className="text-sm font-medium">{formatDate(expiryDate)}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-default-500">Certificate ID</p>
              <p className="text-sm font-medium">{id}</p>
            </div>
            <div>
              <p className="text-xs text-default-500">Final Score</p>
              <p className="text-sm font-medium">{score}%</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 p-2 bg-default-50 rounded-md">
            <Icon icon="lucide:shield-check" className="text-success" />
            <span className="text-xs">Verified Digital Certificate</span>
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-between gap-2">
        <Button
          variant="flat"
          color="default"
          startContent={<Icon icon="lucide:download" width={16} />}
          as="a"
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </Button>
        
        <Button
          color="primary"
          startContent={<Icon icon="lucide:share-2" width={16} />}
          as="a"
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};