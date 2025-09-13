export function camelCaseResponse<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const result = await fn(...args);
    
    function toCamelCase(str: string): string {
      return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
    }

    function keysToCamel(obj: any): any {
      if (Array.isArray(obj)) {
        return obj.map(v => keysToCamel(v));
      } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((acc, key) => {
          acc[toCamelCase(key)] = keysToCamel(obj[key]);
          return acc;
        }, {} as any);
      }
      return obj;
    }

    return keysToCamel(result);
  }) as T;
}