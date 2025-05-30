import React from 'react';

interface SyncButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading?: boolean;
}

const SyncButton: React.FC<SyncButtonProps> = ({ 
  onClick, 
  disabled, 
  isLoading = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`py-3 px-6 rounded-md font-medium text-white transition-all duration-200 transform 
      ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95 hover:shadow-md'}
      ${isLoading ? 'bg-blue-400 cursor-wait' : ''}
      `}
    >
      {isLoading ? (
        <span className="inline-flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
            <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        'Sync Packages'
      )}
    </button>
  );
};

export default SyncButton;