import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button, Tabs, Tab, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

interface CodeEditorProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  readOnly?: boolean;
  height?: string;
  onSave?: (code: { html: string; css: string; js: string }) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialHtml = "",
  initialCss = "",
  initialJs = "",
  readOnly = false,
  height = "400px",
  onSave,
}) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [activeTab, setActiveTab] = useState("html");
  const [output, setOutput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update preview when code changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      const preview = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;
      setOutput(preview);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleSave = () => {
    if (onSave) {
      onSave({ html, css, js });
    }
  };

  const handleRun = () => {
    // Force refresh the preview
    const preview = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    setOutput(preview);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`code-editor ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
      <Card className="h-full">
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Interactive Code Editor</h3>
          <div className="flex gap-2">
            {!readOnly && (
              <Button
                size="sm"
                color="primary"
                variant="flat"
                onPress={handleSave}
                startContent={<Icon icon="lucide:save" width={16} />}
              >
                Save
              </Button>
            )}
            <Button
              size="sm"
              color="success"
              variant="flat"
              onPress={handleRun}
              startContent={<Icon icon="lucide:play" width={16} />}
            >
              Run
            </Button>
            <Button
              size="sm"
              isIconOnly
              variant="flat"
              onPress={toggleFullscreen}
            >
              <Icon icon={isFullscreen ? "lucide:minimize-2" : "lucide:maximize-2"} width={16} />
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-0 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 border-r border-divider">
            <Tabs 
              selectedKey={activeTab} 
              onSelectionChange={(key) => setActiveTab(key as string)}
              aria-label="Code Tabs"
              classNames={{
                tabList: "bg-default-100 p-1",
              }}
            >
              <Tab key="html" title="HTML">
                <div className="p-2" style={{ height }}>
                  <textarea
                    className="w-full h-full p-2 font-mono text-sm bg-content1 border border-default-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    readOnly={readOnly}
                    placeholder="Enter HTML code here..."
                  />
                </div>
              </Tab>
              <Tab key="css" title="CSS">
                <div className="p-2" style={{ height }}>
                  <textarea
                    className="w-full h-full p-2 font-mono text-sm bg-content1 border border-default-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    readOnly={readOnly}
                    placeholder="Enter CSS code here..."
                  />
                </div>
              </Tab>
              <Tab key="js" title="JavaScript">
                <div className="p-2" style={{ height }}>
                  <textarea
                    className="w-full h-full p-2 font-mono text-sm bg-content1 border border-default-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    value={js}
                    onChange={(e) => setJs(e.target.value)}
                    readOnly={readOnly}
                    placeholder="Enter JavaScript code here..."
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
          <div className="w-full md:w-1/2">
            <div className="p-2 h-full">
              <div className="bg-white border border-default-200 rounded-md h-full">
                <div className="bg-default-100 p-2 border-b border-default-200 flex justify-between items-center">
                  <span className="text-xs font-medium">Preview</span>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="flat"
                    onPress={() => {
                      const previewWindow = window.open("", "_blank");
                      if (previewWindow) {
                        previewWindow.document.write(output);
                        previewWindow.document.close();
                      }
                    }}
                  >
                    <Icon icon="lucide:external-link" width={14} />
                  </Button>
                </div>
                <iframe
                  title="Code Preview"
                  srcDoc={output}
                  className="w-full"
                  style={{ height: "calc(100% - 40px)", border: "none" }}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};