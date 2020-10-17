export function hasField(field: string, obj: any): boolean {
  if (typeof obj !== 'object' || obj === null || obj === undefined) {
    return false;
  }
  const properties = Object.getOwnPropertyNames(obj);

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    const value = obj[properties[i]];
    if (property === field) {
      return true;
    }
    if (hasField(field, value)) {
      return true;
    }
  }
  return false;
}
