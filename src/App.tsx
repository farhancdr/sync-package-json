import React, { useState } from 'react';
import PackageJsonInput from './components/PackageJsonInput';
import SyncButton from './components/SyncButton';
import ResultView from './components/ResultView';
import { syncPackages, validateJson } from './utils/syncPackages';
import { Package, Github } from 'lucide-react';

function App() {
  const [targetJson, setTargetJson] = useState('');
  const [sourceJson, setSourceJson] = useState('');
  const [targetError, setTargetError] = useState<string | undefined>();
  const [sourceError, setSourceError] = useState<string | undefined>();
  const [syncedJson, setSyncedJson] = useState('');
  const [diffLines, setDiffLines] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSync = () => {
    // Reset errors and results
    setTargetError(undefined);
    setSourceError(undefined);
    setShowResult(false);
    
    // Validate both inputs
    const targetValidation = validateJson(targetJson);
    const sourceValidation = validateJson(sourceJson);
    
    if (!targetValidation.valid) {
      setTargetError(targetValidation.error);
      return;
    }
    
    if (!sourceValidation.valid) {
      setSourceError(sourceValidation.error);
      return;
    }
    
    // Simulate processing
    setIsProcessing(true);
    
    // Perform the sync with a small delay to show processing state
    setTimeout(() => {
      try {
        const { result, diff } = syncPackages(targetJson, sourceJson);
        setSyncedJson(result);
        setDiffLines(diff);
        setShowResult(true);
        setIsProcessing(false);
      } catch (error) {
        if (error instanceof Error) {
          setTargetError(error.message);
        } else {
          setTargetError('An unknown error occurred');
        }
        setIsProcessing(false);
      }
    }, 800);
  };

  const canSync = targetJson.trim() !== '' && sourceJson.trim() !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center p-6">
      <a
        href="https://github.com/yourusername/package-json-sync"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <Github size={20} />
        <span>View on GitHub</span>
      </a>

      <header className="w-full max-w-4xl mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <Package className="text-blue-600 mr-2" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">Package.json Sync Tool</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Update dependency versions in your package.json without adding new packages
        </p>
      </header>

      <main className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PackageJsonInput
            label="Target package.json (to be updated)"
            value={targetJson}
            onChange={setTargetJson}
            error={targetError}
          />
          
          <PackageJsonInput
            label="Source package.json (with versions to copy)"
            value={sourceJson}
            onChange={setSourceJson}
            error={sourceError}
          />
        </div>
        
        <div className="mt-8 flex justify-center">
          <SyncButton 
            onClick={handleSync} 
            disabled={!canSync}
            isLoading={isProcessing}
          />
        </div>
        
        <ResultView 
          syncedContent={syncedJson}
          diffLines={diffLines}
          show={showResult} 
        />
      </main>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>A simple tool to sync package.json dependency versions</p>
      </footer>
    </div>
  );
}

export default App