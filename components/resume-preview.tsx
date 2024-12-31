"use client";

import { ResumeData, TemplateType } from "@/types/resume";
import { ModernTemplate } from "@/components/templates/modern-template";
import { ClassicTemplate } from "@/components/templates/classic-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const getTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Preview</h3>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
      <div className="p-6 max-h-[800px] overflow-y-auto">
        {getTemplate()}
      </div>
    </div>
  );
}