"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from '@/components/forms/personal-info-form';
import { ExperienceForm } from '@/components/forms/experience-form';
import { EducationForm } from '@/components/forms/education-form';
import { SkillsForm } from '@/components/forms/skills-form';
import { ResumePreview } from '@/components/resume-preview';
import { TemplateSelector } from '@/components/template-selector';
import { ResumeData } from '@/types/resume';

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
  });
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onUpdate={(data) => updateResumeData('personalInfo', data)}
            />
          </TabsContent>
          
          <TabsContent value="experience">
            <ExperienceForm
              data={resumeData.experience}
              onUpdate={(data) => updateResumeData('experience', data)}
            />
          </TabsContent>
          
          <TabsContent value="education">
            <EducationForm
              data={resumeData.education}
              onUpdate={(data) => updateResumeData('education', data)}
            />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsForm
              data={resumeData.skills}
              onUpdate={(data) => updateResumeData('skills', data)}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6">
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelect={setSelectedTemplate}
        />
        <ResumePreview
          data={resumeData}
          template={selectedTemplate}
        />
      </div>
    </div>
  );
}