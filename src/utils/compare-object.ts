function compareObjectValues<T extends Record<string, any>>(
  obj1: T,
  obj2: T,
): boolean {
  // Check if both objects have the same number of keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if both objects have the same keys
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }

    // Compare values
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
export default compareObjectValues;
