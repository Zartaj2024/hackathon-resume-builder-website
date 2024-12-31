"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Education } from "@/types/resume";
import { Plus, X } from "lucide-react";

const educationSchema = z.object({
  institution: z.string().min(2, "Institution name must be at least 2 characters"),
  degree: z.string().min(2, "Degree must be at least 2 characters"),
  field: z.string().min(2, "Field of study must be at least 2 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  current: z.boolean(),
});

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

export function EducationForm({ data, onUpdate }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(data);

  const form = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    },
  });

  const onSubmit = (values: Omit<Education, "id">) => {
    const newEducation = {
      ...values,
      id: crypto.randomUUID(),
    };
    const updatedEducations = [...educations, newEducation];
    setEducations(updatedEducations);
    onUpdate(updatedEducations);
    form.reset();
  };

  const removeEducation = (id: string) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id);
    setEducations(updatedEducations);
    onUpdate(updatedEducations);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {educations.map((education) => (
          <div key={education.id} className="flex items-start justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">{education.institution}</h4>
              <p className="text-sm text-muted-foreground">
                {education.degree} in {education.field}
              </p>
              <p className="text-sm text-muted-foreground">
                {education.startDate} - {education.current ? "Present" : education.endDate}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeEducation(education.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="University or school name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Bachelor's, Master's" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="month" disabled={form.watch("current")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="current"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    title="I am currently studying here"
                    id="current-checkbox"
                    onChange={field.onChange}
                    className="form-checkbox h-4 w-4"
                  />
                </FormControl>
                <FormLabel htmlFor="current-checkbox">I am currently studying here</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </form>
      </Form>
    </div>
  );
}