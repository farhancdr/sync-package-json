/**
 * Synchronizes package versions from source to target package.json
 * Only updates existing dependencies, doesn't add new ones
 */
export function syncPackages(targetJson: string, sourceJson: string): string {
  try {
    const target = JSON.parse(targetJson);
    const source = JSON.parse(sourceJson);
    
    // Create a new object to avoid mutating the original
    const result = { ...target };
    
    // Sync dependencies
    if (target.dependencies && source.dependencies) {
      result.dependencies = syncDependencyGroup(
        target.dependencies, 
        source.dependencies
      );
    }
    
    // Sync devDependencies
    if (target.devDependencies && source.devDependencies) {
      result.devDependencies = syncDependencyGroup(
        target.devDependencies, 
        source.devDependencies
      );
    }
    
    // Return the formatted JSON string
    return JSON.stringify(result, null, 2);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Sync failed: ${error.message}`);
    }
    throw new Error('Sync failed with an unknown error');
  }
}

/**
 * Syncs versions from source to target dependency objects
 * Only updates versions for packages that already exist in target
 */
function syncDependencyGroup(
  targetDeps: Record<string, string>, 
  sourceDeps: Record<string, string>
): Record<string, string> {
  const result = { ...targetDeps };
  
  // For each dependency in the target
  Object.keys(targetDeps).forEach(packageName => {
    // If the same package exists in source, update the version
    if (sourceDeps[packageName]) {
      result[packageName] = sourceDeps[packageName];
    }
  });
  
  return result;
}

/**
 * Validates the provided string is valid JSON
 */
export function validateJson(jsonString: string): { valid: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Check if it's a package.json by verifying certain properties
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