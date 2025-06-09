import React from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Input, 
  Textarea, 
  Divider,
  Avatar,
  Switch,
  Tabs,
  Tab
} from "@heroui/react";
import { Icon } from "@iconify/react";

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("general");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  
  // Mock user data
  const [userData, setUserData] = React.useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Frontend developer passionate about creating user-friendly interfaces. Currently learning React and TypeScript.",
    location: "New York, USA",
    website: "https://johndoe.com",
    github: "johndoe",
    twitter: "johndoe",
    linkedin: "johndoe",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
    notifications: {
      email: true,
      push: true,
      courseUpdates: true,
      newCourses: false,
      marketing: false
    },
    privacy: {
      showProfile: true,
      showProgress: true,
      showCertificates: true
    }
  });

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handlePrivacyChange = (field: string, value: boolean) => {
    setUserData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
        <p className="text-default-500">
          Manage your account settings and preferences
        </p>
      </div>

      <Card>
        <Tabs 
          selectedKey={activeTab} 
          onSelectionChange={(key) => setActiveTab(key as string)}
          aria-label="Profile Settings"
        >
          <Tab key="general" title="General">
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar
                    src={userData.avatar}
                    className="w-32 h-32"
                    isBordered
                    color="primary"
                  />
                  {isEditing && (
                    <Button 
                      variant="flat" 
                      color="primary"
                      startContent={<Icon icon="lucide:upload" width={16} />}
                    >
                      Change Photo
                    </Button>
                  )}
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    {!isEditing ? (
                      <Button 
                        color="primary" 
                        variant="flat"
                        startContent={<Icon icon="lucide:edit" width={16} />}
                        onPress={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="flat" 
                          onPress={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          color="primary"
                          onPress={handleSave}
                          isLoading={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={userData.name}
                      onValueChange={(value) => handleInputChange("name", value)}
                      isReadOnly={!isEditing}
                      variant={isEditing ? "bordered" : "flat"}
                    />
                    <Input
                      label="Email"
                      value={userData.email}
                      onValueChange={(value) => handleInputChange("email", value)}
                      isReadOnly={!isEditing}
                      variant={isEditing ? "bordered" : "flat"}
                    />
                    <Input
                      label="Location"
                      value={userData.location}
                      onValueChange={(value) => handleInputChange("location", value)}
                      isReadOnly={!isEditing}
                      variant={isEditing ? "bordered" : "flat"}
                    />
                    <Input
                      label="Website"
                      value={userData.website}
                      onValueChange={(value) => handleInputChange("website", value)}
                      isReadOnly={!isEditing}
                      variant={isEditing ? "bordered" : "flat"}
                    />
                  </div>
                  
                  <Textarea
                    label="Bio"
                    value={userData.bio}
                    onValueChange={(value) => handleInputChange("bio", value)}
                    isReadOnly={!isEditing}
                    variant={isEditing ? "bordered" : "flat"}
                    minRows={3}
                  />
                  
                  <Divider />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Social Profiles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="GitHub"
                        startContent={<Icon icon="logos:github-icon" width={16} />}
                        value={userData.github}
                        onValueChange={(value) => handleInputChange("github", value)}
                        isReadOnly={!isEditing}
                        variant={isEditing ? "bordered" : "flat"}
                        placeholder="GitHub username"
                      />
                      <Input
                        label="Twitter"
                        startContent={<Icon icon="logos:twitter" width={16} />}
                        value={userData.twitter}
                        onValueChange={(value) => handleInputChange("twitter", value)}
                        isReadOnly={!isEditing}
                        variant={isEditing ? "bordered" : "flat"}
                        placeholder="Twitter username"
                      />
                      <Input
                        label="LinkedIn"
                        startContent={<Icon icon="logos:linkedin-icon" width={16} />}
                        value={userData.linkedin}
                        onValueChange={(value) => handleInputChange("linkedin", value)}
                        isReadOnly={!isEditing}
                        variant={isEditing ? "bordered" : "flat"}
                        placeholder="LinkedIn username"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Tab>
          
          <Tab key="notifications" title="Notifications">
            <CardBody className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                  <p className="text-default-500">
                    Control how and when you receive notifications from TechAcademy.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <Card>
                    <CardBody className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-default-500">Receive notifications via email</p>
                          </div>
                          <Switch 
                            isSelected={userData.notifications.email}
                            onValueChange={(value) => handleNotificationChange("email", value)}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-default-500">Receive notifications in your browser</p>
                          </div>
                          <Switch 
                            isSelected={userData.notifications.push}
                            onValueChange={(value) => handleNotificationChange("push", value)}
                          />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <Card>
                    <CardBody className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Course Updates</p>
                            <p className="text-sm text-default-500">Updates to courses you're enrolled in</p>
                          </div>
                          <Switch 
                            isSelected={userData.notifications.courseUpdates}
                            onValueChange={(value) => handleNotificationChange("courseUpdates", value)}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">New Courses</p>
                            <p className="text-sm text-default-500">Notifications when new courses are available</p>
                          </div>
                          <Switch 
                            isSelected={userData.notifications.newCourses}
                            onValueChange={(value) => handleNotificationChange("newCourses", value)}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Marketing & Promotions</p>
                            <p className="text-sm text-default-500">Special offers and promotional content</p>
                          </div>
                          <Switch 
                            isSelected={userData.notifications.marketing}
                            onValueChange={(value) => handleNotificationChange("marketing", value)}
                          />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Tab>
          
          <Tab key="privacy" title="Privacy">
            <CardBody className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
                  <p className="text-default-500">
                    Control what information is visible to other users.
                  </p>
                </div>
                
                <Card>
                  <CardBody className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Public Profile</p>
                          <p className="text-sm text-default-500">Allow other users to see your profile</p>
                        </div>
                        <Switch 
                          isSelected={userData.privacy.showProfile}
                          onValueChange={(value) => handlePrivacyChange("showProfile", value)}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Course Progress</p>
                          <p className="text-sm text-default-500">Show your course progress to other users</p>
                        </div>
                        <Switch 
                          isSelected={userData.privacy.showProgress}
                          onValueChange={(value) => handlePrivacyChange("showProgress", value)}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Certificates</p>
                          <p className="text-sm text-default-500">Make your certificates publicly viewable</p>
                        </div>
                        <Switch 
                          isSelected={userData.privacy.showCertificates}
                          onValueChange={(value) => handlePrivacyChange("showCertificates", value)}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Management</h3>
                  <Card>
                    <CardBody className="p-4">
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Download Your Data</p>
                          <p className="text-sm text-default-500 mb-2">
                            Download a copy of all your data, including profile information, course progress, and certificates.
                          </p>
                          <Button 
                            variant="flat" 
                            color="primary"
                            startContent={<Icon icon="lucide:download" width={16} />}
                          >
                            Request Data Export
                          </Button>
                        </div>
                        
                        <Divider />
                        
                        <div>
                          <p className="font-medium text-danger">Delete Account</p>
                          <p className="text-sm text-default-500 mb-2">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <Button 
                            color="danger" 
                            variant="flat"
                            startContent={<Icon icon="lucide:trash-2" width={16} />}
                          >
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};