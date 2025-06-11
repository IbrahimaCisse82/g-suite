
import React from 'react';
import { TrainingHeader } from '@/components/training/TrainingHeader';
import { TrainingModules } from '@/components/training/TrainingModules';
import { QuickStartGuide } from '@/components/training/QuickStartGuide';
import { VideoTutorials } from '@/components/training/VideoTutorials';
import { DocumentationLinks } from '@/components/training/DocumentationLinks';
import { SupportContact } from '@/components/training/SupportContact';

const TrainingSupportStandalone = () => {
  return (
    <div className="min-h-screen bg-background">
      <TrainingHeader />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <QuickStartGuide />
        <TrainingModules />
        <VideoTutorials />
        <DocumentationLinks />
        <SupportContact />
      </div>
    </div>
  );
};

export default TrainingSupportStandalone;
