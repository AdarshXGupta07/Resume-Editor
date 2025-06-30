
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { enhanceContent } from '@/utils/api';

interface AIEnhanceButtonProps {
  sectionType: string;
  content: any;
  onEnhanced: (enhancedContent: any) => void;
}

const AIEnhanceButton: React.FC<AIEnhanceButtonProps> = ({ sectionType, content, onEnhanced }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
      const enhancedContent = await enhanceContent(sectionType, content);
      onEnhanced(enhancedContent);
    } catch (error) {
      console.error('Error enhancing content:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleEnhance}
      disabled={isEnhancing}
      className="text-purple-600 border-purple-200 hover:bg-purple-50"
    >
      <Sparkles className="h-4 w-4 mr-2" />
      {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
    </Button>
  );
};

export default AIEnhanceButton;
