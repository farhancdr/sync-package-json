import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ResultViewProps {
  syncedContent: string;
  show: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({ syncedContent, show }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(syncedContent);
  };

  if (!show) return null;

  return (
    <div className="w-full mt-4 p-4 border border-green-200 rounded-md bg-green-50 animate-fadeIn">
      <div className="flex items-center mb-3">
        <CheckCircle className="text-green-500 mr-2" size={20} />
        <h3 className="text-green-700 font-medium">Packages Synced Successfully!</h3>
      </div>
      <div className="mb-3">
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Copy to Clipboard
        </button>
      </div>
      <pre className="bg-white p-3 rounded border border-gray-200 text-sm font-mono max-h-64 overflow-y-auto">
        {syncedContent}
      </pre>
    </div>
  );
};

export default ResultView;