
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  resumeData: any;
  fileName?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ resumeData, fileName = 'resume.json' }) => {
  const handleDownload = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = fileName;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
      <Download className="h-4 w-4 mr-2" />
      Download JSON
    </Button>
  );
};

export default DownloadButton;
