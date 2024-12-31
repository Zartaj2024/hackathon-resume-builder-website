import { ResumeData } from "@/types/resume";

export function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="max-w-[800px] mx-auto font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wider">Experience</h2>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id} className="grid grid-cols-[1fr_2fr] gap-4">
              <div className="text-sm text-gray-500">
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wider">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="grid grid-cols-[1fr_2fr] gap-4">
              <div className="text-sm text-gray-500">
                {edu.startDate} - {edu.current ? "Present" : edu.endDate}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                <p className="text-gray-700 text-sm">
                  {edu.degree} in {edu.field}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wider">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}