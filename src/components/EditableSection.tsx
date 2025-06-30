
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import AIEnhanceButton from './AIEnhanceButton';

interface EditableSectionProps {
  title: string;
  data: any;
  onUpdate: (data: any) => void;
  sectionType: 'personalInfo' | 'summary' | 'experience' | 'education' | 'skills';
}

const EditableSection: React.FC<EditableSectionProps> = ({ title, data, onUpdate, sectionType }) => {
  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={data.name || ''}
          onChange={(e) => onUpdate({ ...data, name: e.target.value })}
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email || ''}
          onChange={(e) => onUpdate({ ...data, email: e.target.value })}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={data.phone || ''}
          onChange={(e) => onUpdate({ ...data, phone: e.target.value })}
          placeholder="Enter your phone number"
        />
      </div>
    </div>
  );

  const renderSummary = () => (
    <div>
      <Label htmlFor="summary">Professional Summary</Label>
      <textarea
        id="summary"
        className="w-full mt-1 p-2 border rounded-md min-h-[100px] resize-vertical"
        value={data || ''}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Write your professional summary here..."
      />
    </div>
  );

  const renderArraySection = (items: any[], type: 'experience' | 'education') => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id || index} className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">
              {type === 'experience' ? 'Experience' : 'Education'} #{index + 1}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const newItems = items.filter((_, i) => i !== index);
                onUpdate(newItems);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{type === 'experience' ? 'Company' : 'Institution'}</Label>
              <Input
                value={item.company || item.institution || ''}
                onChange={(e) => {
                  const newItems = [...items];
                  const key = type === 'experience' ? 'company' : 'institution';
                  newItems[index] = { ...item, [key]: e.target.value };
                  onUpdate(newItems);
                }}
                placeholder={`Enter ${type === 'experience' ? 'company name' : 'institution name'}`}
              />
            </div>
            <div>
              <Label>{type === 'experience' ? 'Position' : 'Degree'}</Label>
              <Input
                value={item.position || item.degree || ''}
                onChange={(e) => {
                  const newItems = [...items];
                  const key = type === 'experience' ? 'position' : 'degree';
                  newItems[index] = { ...item, [key]: e.target.value };
                  onUpdate(newItems);
                }}
                placeholder={`Enter ${type === 'experience' ? 'position' : 'degree'}`}
              />
            </div>
            <div>
              <Label>{type === 'experience' ? 'Duration' : 'Year'}</Label>
              <Input
                value={item.duration || item.year || ''}
                onChange={(e) => {
                  const newItems = [...items];
                  const key = type === 'experience' ? 'duration' : 'year';
                  newItems[index] = { ...item, [key]: e.target.value };
                  onUpdate(newItems);
                }}
                placeholder={`Enter ${type === 'experience' ? 'duration' : 'year'}`}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md min-h-[80px] resize-vertical"
                value={item.description || ''}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index] = { ...item, description: e.target.value };
                  onUpdate(newItems);
                }}
                placeholder="Enter description..."
              />
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={() => {
          const newItem = {
            id: Date.now().toString(),
            ...(type === 'experience' 
              ? { company: '', position: '', duration: '', description: '' }
              : { institution: '', degree: '', year: '', description: '' }
            )
          };
          onUpdate([...items, newItem]);
        }}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {type === 'experience' ? 'Experience' : 'Education'}
      </Button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {data.map((skill: string, index: number) => (
          <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            <span>{skill}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-4 w-4 p-0 hover:bg-blue-200"
              onClick={() => {
                const newSkills = data.filter((_: string, i: number) => i !== index);
                onUpdate(newSkills);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
      <Input
        placeholder="Type a skill and press Enter"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            const value = e.currentTarget.value.trim();
            if (value && !data.includes(value)) {
              onUpdate([...data, value]);
              e.currentTarget.value = '';
            }
          }
        }}
      />
    </div>
  );

  const renderContent = () => {
    switch (sectionType) {
      case 'personalInfo':
        return renderPersonalInfo();
      case 'summary':
        return renderSummary();
      case 'experience':
        return renderArraySection(data || [], 'experience');
      case 'education':
        return renderArraySection(data || [], 'education');
      case 'skills':
        return renderSkills();
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <AIEnhanceButton 
          sectionType={sectionType}
          content={data}
          onEnhanced={onUpdate}
        />
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default EditableSection;
