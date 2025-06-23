
import React from 'react';
import { Layout } from '@/components/Layout';
import { TPEModuleManager } from '@/components/modules/TPEModuleManager';

const TPEModules = () => {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <TPEModuleManager />
        </div>
      </div>
    </Layout>
  );
};

export default TPEModules;
