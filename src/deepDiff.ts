export type DiffResult = {
  path: string;
  type: "added" | "removed" | "updated";
  oldValue?: any;
  newValue?: any;
};

export function deepDiff(oldData: any, newData: any, parentPath = ""): DiffResult[] {
  const changes: DiffResult[] = [];

  const oldKeys = oldData ? Object.keys(oldData) : [];
  const newKeys = newData ? Object.keys(newData) : [];

  const allKeys = new Set([...oldKeys, ...newKeys]);

  for (const key of allKeys) {
    const path = parentPath ? `${parentPath}.${key}` : key;

    const oldValue = oldData?.[key];
    const newValue = newData?.[key];

    // KEY REMOVED
    if (!(key in newData)) {
      changes.push({
        path,
        type: "removed",
        oldValue,
        newValue: undefined,
      });
      continue;
    }

    // KEY ADDED
    if (!(key in oldData)) {
      changes.push({
        path,
        type: "added",
        oldValue: undefined,
        newValue,
      });
      continue;
    }

    // If both are objects → Recursively compare
    if (isObject(oldValue) && isObject(newValue)) {
      changes.push(...deepDiff(oldValue, newValue, path));
      continue;
    }

    // ARRAY check
    if (Array.isArray(oldValue) && Array.isArray(newValue)) {
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        changes.push({
          path,
          type: "updated",
          oldValue,
          newValue,
        });
      }
      continue;
    }

    // PRIMITIVE change
    if (oldValue !== newValue) {
      changes.push({
        path,
        type: "updated",
        oldValue,
        newValue,
      });
    }
  }

  return changes;
}

function isObject(value: any) {
  return value && typeof value === "object" && !Array.isArray(value);
}
