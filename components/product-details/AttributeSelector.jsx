import React from "react";

function AttributeSelector({ attribute, options, selectedValue, availableOptions, onChange }) {
  return (
    <div className="flex flex-col mt-4">
      <label className="mb-2 text-sm font-medium text-gray-700">{attribute}</label>
      <div className="flex gap-2">
        {options.map((option) => {
          const isDisabled = !availableOptions.includes(option);
          return (
            <button
              key={option}
              onClick={() => !isDisabled && onChange(option)}
              className={`px-4 py-2 border rounded ${
                selectedValue === option
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"}`}
              disabled={isDisabled}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AttributeSelector;
