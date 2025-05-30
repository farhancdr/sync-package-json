/**
 * Synchronizes package versions from source to target package.json
 * Only updates existing dependencies, doesn't add new ones
 */
export function syncPackages(targetJson: string, sourceJson: string): { 
  result: string;
  diff: string[];
} {
  try {
    const target = JSON.parse(targetJson);
    const source = JSON.parse(sourceJson);
    
    // Create a new object to avoid mutating the original
    const result = { ...target };
    const changes: string[] = [];
    
    // Sync dependencies
    if (target.dependencies && source.dependencies) {
      const { deps, diff } = syncDependencyGroup(
        target.dependencies, 
        source.dependencies,
        'dependencies'
      );
      result.dependencies = deps;
      changes.push(...diff);
    }
    
    // Sync devDependencies
    if (target.devDependencies && source.devDependencies) {
      const { deps, diff } = syncDependencyGroup(
        target.devDependencies, 
        source.devDependencies,
        'devDependencies'
      );
      result.devDependencies = deps;
      changes.push(...diff);
    }
    
    // Return the formatted JSON string and diff
    return {
      result: JSON.stringify(result, null, 2),
      diff: changes
    };
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
  sourceDeps: Record<string, string>,
  group: string
): { 
  deps: Record<string, string>;
  diff: string[];
} {
  const result = { ...targetDeps };
  const changes: string[] = [];
  
  // For each dependency in the target
  Object.keys(targetDeps).forEach(packageName => {
    // If the same package exists in source and version is different
    if (sourceDeps[packageName] && targetDeps[packageName] !== sourceDeps[packageName]) {
      changes.push(`${group}.${packageName}: ${targetDeps[packageName]} → ${sourceDeps[packageName]}`);
      result[packageName] = sourceDeps[packageName];
    }
  });
  
  return { deps: result, diff: changes };
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