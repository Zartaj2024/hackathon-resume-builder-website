import { ResumeBuilder } from '@/components/resume-builder';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Professional Resume Builder</h1>
        <p className="text-center text-gray-600 mb-12">Create a stunning resume in minutes with our easy-to-use builder</p>
        <ResumeBuilder />
      </div>
    </main>
  );
}