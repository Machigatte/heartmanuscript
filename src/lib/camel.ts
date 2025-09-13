import _ from 'lodash';

// 判断是否是需要跳过的特殊对象类型
function isSpecialObject(obj: any): boolean {
  // 检查是否为 null，以及原型是否为 Object.prototype
  // 排除数组、Date、以及其他类的实例
  return obj === null ||
    typeof obj !== 'object' ||
    Array.isArray(obj) ||
    obj instanceof Date ||
    Object.getPrototypeOf(obj) !== Object.prototype;
}

// Helper function to convert Date objects to ISO strings
function convertDatesToStrings(obj: any): any {
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  if (Array.isArray(obj)) {
    return obj.map(convertDatesToStrings);
  }
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = convertDatesToStrings(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

// 工具函数：驼峰命名
function keysToCamel(obj: any): any {
  if (isSpecialObject(obj)) return obj;

  return Object.keys(obj).reduce((acc, key) => {
    acc[_.camelCase(key)] = keysToCamel(obj[key]);
    return acc;
  }, {} as any);
}

// 工具函数：下划线命名
function keysToSnake(obj: any): any {
  if (isSpecialObject(obj)) return obj;

  return Object.keys(obj).reduce((acc, key) => {
    acc[_.snakeCase(key)] = keysToSnake(obj[key]);
    return acc;
  }, {} as any);
}

// 双向转换装饰器
export function camelSnake<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    // 1. 先把参数中的 Date 对象转换成字符串
    const argsWithStrings = args.map(arg => convertDatesToStrings(arg));
    
    // 2. 然后把键名转换成 snake_case
    const newArgs = argsWithStrings.map(arg => (typeof arg === 'object' ? keysToSnake(arg) : arg));
    console.log(newArgs)

    const result = await fn(...(newArgs as Parameters<T>));
    //console.log(result);
    // 3. 把返回值转换成 camelCase
    return keysToCamel(result);
  }) as T;
}