import { WorkflowProvider } from "../../workflow/context/workflowContext.tsx";
import WebexApp from "./WebexApp.tsx";

const WebExtension: React.FC = () => {
  return (
    <WorkflowProvider>
      <WebexApp />
    </WorkflowProvider>
  );
};

export default WebExtension;