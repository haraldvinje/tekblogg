import React, { useState } from "react";

export const Category = ({
  value,
  onClick,
}: {
  value: string;
  onClick?: (arg: string) => void;
}) => {
  const [clicked, setClicked] = useState(false);
  const clickable = onClick !== undefined;

  return (
    <span
      className={`
                inline-block bg-gray-200 rounded-full px-3 py-1 
                text-sm font-semibold text-gray-700 mr-2 mb-2
                ${clickable && "hover:cursor-pointer"}
                ${clicked && "bg-gray-400"} `}
      onClick={() => {
        if (clickable) {
          onClick(value);
          setClicked(!clicked);
        }
      }}
    >
      {value}
    </span>
  );
};
