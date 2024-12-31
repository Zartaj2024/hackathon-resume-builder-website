import { ResumeData } from "@/types/resume";

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="max-w-[800px] mx-auto font-sans">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="text-gray-600 space-x-4">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id}>
              <h3 className="font-semibold text-gray-900">{exp.position}</h3>
              <div className="text-gray-600 mb-2">
                {exp.company} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </div>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id}>
              <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
              <div className="text-gray-600">
                {edu.degree} in {edu.field}
              </div>
              <div className="text-gray-600">
                {edu.startDate} - {edu.current ? "Present" : edu.endDate}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center">
              <span className="text-gray-700">{skill.name}</span>
              <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}