import React from "react";

const Thead = ({ header }: { header: Array<string> }) => {
  return (
    <>
      <thead>
        <tr className="bg-gray-100 text-left">
          {header.map((header) => (
            <th key={header} className="p-2 sm:p-3">
              {header}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default Thead;
