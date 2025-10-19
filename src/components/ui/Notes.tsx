import React from "react";
import { useAppCustomer } from "../../workflow/hooks/useAppCustomer";

const Notes: React.FC = () => {
  const readOnly = true;
  const placeholder = "No available notes!"
  const appCustomer = useAppCustomer();
  const notes = appCustomer?.crm.notes || "";

  return (
    <div className="h-full w-full p-[5px]">
      <textarea
        value={notes}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full h-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default Notes;
