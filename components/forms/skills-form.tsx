"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skill } from "@/types/resume";
import { Plus, X } from "lucide-react";

const skillSchema = z.object({
  name: z.string().min(2, "Skill name must be at least 2 characters"),
  level: z.number().min(0).max(100),
});

interface SkillsFormProps {
  data: Skill[];
  onUpdate: (data: Skill[]) => void;
}

export function SkillsForm({ data, onUpdate }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>(data);

  const form = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      level: 50,
    },
  });

  const onSubmit = (values: Omit<Skill, "id">) => {
    const newSkill = {
      ...values,
      id: crypto.randomUUID(),
    };
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
    form.reset();
  };

  const removeSkill = (id: string) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1 mr-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-primary h-full rounded-full skill-level`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSkill(skill.id)}
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., JavaScript, Project Management" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proficiency Level</FormLabel>
                <FormControl>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </form>
      </Form>
    </div>
  );
}