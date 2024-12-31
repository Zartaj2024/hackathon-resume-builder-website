"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TemplateType } from "@/types/resume";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a focus on visual hierarchy",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout perfect for conservative industries",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design that lets your content shine",
  },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (template: TemplateType) => void;
}

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
        <RadioGroup
          value={selectedTemplate}
          onValueChange={(value) => onSelect(value as TemplateType)}
          className="grid grid-cols-3 gap-4"
        >
          {templates.map((template) => (
            <div key={template.id} className="relative">
              <RadioGroupItem
                value={template.id}
                id={template.id}
                className="sr-only"
              />
              <Label
                htmlFor={template.id}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {template.description}
                </p>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}