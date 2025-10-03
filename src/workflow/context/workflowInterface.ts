export interface IWorkflow {
  // Main execution method - workflows can access context via getGlobalWorkflowContext()
  execute(): Promise<void>;
}
