
import React from 'react';
import { Layout } from '@/components/Layout';
import { TPEWorkflowGuide } from '@/components/tpe/TPEWorkflowGuide';

const TPEGuides = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <TPEWorkflowGuide />
        </div>
      </div>
    </Layout>
  );
};

export default TPEGuides;
