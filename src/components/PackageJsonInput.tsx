import React from 'react';

interface PackageJsonInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const PackageJsonInput: React.FC<PackageJsonInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Paste your package.json content here...',
  error,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium text-gray-700">{label}</label>
      <textarea
        className={`w-full h-64 p-3 border rounded-md font-mono text-sm resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PackageJsonInput;