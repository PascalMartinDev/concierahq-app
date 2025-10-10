import React from "react";
import Tag from "./Tag";

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div>
      <p className="text-gray-600 mb-2">
            <b>Booking Tags:</b>
          </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
    </div>
    </div>
    
  );
};

export default TagList;
