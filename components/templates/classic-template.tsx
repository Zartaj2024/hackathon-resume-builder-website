import { ResumeData } from "@/types/resume";

export function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="max-w-[800px] mx-auto font-serif">
      <header className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="text-gray-700">
          <p>{personalInfo.email} | {personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Experience</h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                <span className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <p className="text-gray-700 font-semibold">{exp.company}</p>
              <p className="text-gray-600 mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                <span className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                </span>
              </div>
              <p className="text-gray-700">
                {edu.degree} in {edu.field}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          {skills.map((skill) => (
            <div key={skill.id}>
              <span className="text-gray-800">{skill.name}</span>
              <div className="w-full bg-gray-200 rounded-sm h-1.5 mt-1">
                <div
                  className="bg-gray-800 h-full rounded-sm"
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