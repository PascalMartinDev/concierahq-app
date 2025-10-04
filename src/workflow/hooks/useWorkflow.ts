import React from 'react';
import { WorkflowContextInstance } from '../context/workflowContextInstance';

export const useWorkflow = () => {
  const context = React.useContext(WorkflowContextInstance);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};