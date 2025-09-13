import _ from 'lodash';

// 工具函数
function keysToCamel(obj: any): any {
  if (Array.isArray(obj)) return obj.map(keysToCamel);
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[_.camelCase(key)] = keysToCamel(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

function keysToSnake(obj: any): any {
  if (Array.isArray(obj)) return obj.map(keysToSnake);
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[_.snakeCase(key)] = keysToSnake(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

// 双向转换装饰器
export function camelSnake<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    // 如果函数有参数，先把对象转换成 snake_case
    const newArgs = args.map(arg => (typeof arg === 'object' ? keysToSnake(arg) : arg));

    const result = await fn(...(newArgs as Parameters<T>));

    // 把返回值转换成 camelCase
    return keysToCamel(result);
  }) as T;
}