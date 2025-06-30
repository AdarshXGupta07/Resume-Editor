
import React, { useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResumeUploadProps {
  onFileUpload: (resumeData: any) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onFileUpload }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock parsing - in real implementation, this would parse PDF/DOCX
      const mockResumeData = {
        personalInfo: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567"
        },
        summary: "Experienced software developer with 5+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies.",
        experience: [
          {
            id: "1",
            company: "Tech Corp",
            position: "Senior Developer",
            duration: "2021 - Present",
            description: "Led development of scalable web applications serving 100k+ users daily."
          }
        ],
        education: [
          {
            id: "1",
            institution: "University of Technology",
            degree: "Bachelor of Computer Science",
            year: "2019",
            description: "Graduated with honors, specialized in software engineering."
          }
        ],
        skills: ["React", "TypeScript", "Node.js", "Python", "AWS"]
      };

      onFileUpload(mockResumeData);
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const mockEvent = {
        target: { files: [file] }
      } as any;
      handleFileUpload(mockEvent);
    }
  }, [handleFileUpload]);

  return (
    <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
      <CardContent className="p-8">
        <div 
          className="text-center space-y-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex justify-center">
            <Upload className="h-12 w-12 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Your Resume</h3>
            <p className="text-gray-500 mt-1">
              Drag and drop your resume file here, or click to browse
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Supports PDF and DOCX files
            </p>
          </div>
          <div className="flex justify-center">
            <Button asChild className="relative">
              <label className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Choose File
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
