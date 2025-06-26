
import React from 'react';
import { Layout } from '@/components/Layout';
import { TPEAssistantVirtuel } from '@/components/tpe/TPEAssistantVirtuel';

const TPEAssistant = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <TPEAssistantVirtuel />
        </div>
      </div>
    </Layout>
  );
};

export default TPEAssistant;
