"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Experience } from "@/types/resume";
import { Plus, X } from "lucide-react";

const experienceSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string().min(30, "Description must be at least 30 characters"),
});

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

export function ExperienceForm({ data, onUpdate }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(data);

  const form = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  });

  const onSubmit = (values: Omit<Experience, "id">) => {
    const newExperience = {
      ...values,
      id: crypto.randomUUID(),
    };
    const updatedExperiences = [...experiences, newExperience];
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
    form.reset();
  };

  const removeExperience = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {experiences.map((experience) => (
          <div key={experience.id} className="flex items-start justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">{experience.position}</h4>
              <p className="text-sm text-muted-foreground">{experience.company}</p>
              <p className="text-sm text-muted-foreground">
                {experience.startDate} - {experience.current ? "Present" : experience.endDate}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeExperience(experience.id)}
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
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Job title" {...field} />
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
                    title="I currently work here"
                    id="current-checkbox"
                    onChange={field.onChange}
                    className="form-checkbox h-4 w-4"
                  />
                </FormControl>
                <FormLabel htmlFor="current-checkbox">I currently work here</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements..."
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </form>
      </Form>
    </div>
  );
}