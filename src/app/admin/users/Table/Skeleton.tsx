import React from "react";

const Skeleton = () => {
  return (
    <>
      <tr className="border-b animate-pulse">
        {Array.from({ length: 6 }).map((_, index) => (
          <td key={index} className="px-2 py-1 sm:px-3 sm:py-1.5">
            <div className="h-8 sm:h-10 my-1 sm:my-2 bg-gray-300 rounded"></div>
          </td>
        ))}
      </tr>
    </>
  );
};

export default Skeleton;
