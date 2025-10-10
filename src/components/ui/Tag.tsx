import React from "react";

interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <span className="px-3 py-1 text-sm font-medium rounded-full border border-gray-300 text-gray-700">
      {label}
    </span>
  );
};

export default Tag;
