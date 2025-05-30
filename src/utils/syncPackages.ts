export function syncPackages(targetJson: string, sourceJson: string): string {
  try {
    const target = JSON.parse(targetJson);
    const source = JSON.parse(sourceJson);
    
    const result = { ...target };
    
    if (target.dependencies && source.dependencies) {
      result.dependencies = syncDependencyGroup(
        target.dependencies, 
        source.dependencies
      );
    }
    
    if (target.devDependencies && source.devDependencies) {
      result.devDependencies = syncDependencyGroup(
        target.devDependencies, 
        source.devDependencies
      );
    }
    
    return JSON.stringify(result, null, 2);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Sync failed: ${error.message}`);
    }
    throw new Error('Sync failed with an unknown error');
  }
}


function syncDependencyGroup(
  targetDeps: Record<string, string>, 
  sourceDeps: Record<string, string>
): Record<string, string> {
  const result = { ...targetDeps };
  
  Object.keys(targetDeps).forEach(packageName => {
    if (sourceDeps[packageName]) {
      result[packageName] = sourceDeps[packageName];
    }
  });
  
  return result;
}


export function validateJson(jsonString: string): { valid: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    
    if (typeof parsed !== 'object' || parsed === null) {
      return { valid: false, error: 'Not a valid JSON object' };
    }
    
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON format' 
    };
  }
}