import React from 'react';

interface PackageJsonInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  diffLines?: string[];
}

const PackageJsonInput: React.FC<PackageJsonInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Paste your package.json content here...',
  error,
  diffLines,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium text-gray-700">{label}</label>
      <div className="relative">
        <textarea
          className={`w-full h-64 p-3 border rounded-md font-mono text-sm resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {diffLines && diffLines.length > 0 && (
          <div className="absolute top-0 right-0 m-2 p-2 bg-gray-800 rounded text-sm font-mono text-white max-w-[50%] max-h-[90%] overflow-y-auto shadow-lg">
            <div className="text-xs text-gray-400 mb-1">Changes:</div>
            {diffLines.map((line, index) => (
              <div key={index} className="flex whitespace-nowrap">
                <span className="text-green-400">+</span>
                <span className="ml-2">{line}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PackageJsonInput;