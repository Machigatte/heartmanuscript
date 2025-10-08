import _ from 'lodash';

// 把对象/数组中的 Date 转为 ISO 字符串，返回 unknown 类型以避免 any
function convertDatesToStrings(obj: unknown): unknown {
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return (obj as unknown[]).map(convertDatesToStrings);
  if (obj && typeof obj === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      out[k] = convertDatesToStrings(v);
    }
    return out;
  }
  return obj;
}

// 工具函数：驼峰命名（递归）
function keysToCamel(obj: unknown): unknown {
  if (Array.isArray(obj)) return (obj as unknown[]).map(keysToCamel);
  if (obj && typeof obj === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      out[_.camelCase(k)] = keysToCamel(v);
    }
    return out;
  }
  return obj;
}

// 工具函数：下划线命名（递归）
function keysToSnake(obj: unknown): unknown {
  if (Array.isArray(obj)) return (obj as unknown[]).map(keysToSnake);
  if (obj && typeof obj === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      out[_.snakeCase(k)] = keysToSnake(v);
    }
    return out;
  }
  return obj;
}

// 双向转换装饰器：接受返回 Promise 的函数，自动在入参和返回值上做命名与 Date 转换
export function camelSnake<Args extends unknown[], R>(fn: (...args: Args) => Promise<R>): (...args: Args) => Promise<R> {
  return (async (...args: Args): Promise<R> => {
    // 1. 先把参数中的 Date 对象转换成字符串
    const argsWithStrings = args.map(arg => convertDatesToStrings(arg));

    // 2. 然后把键名转换成 snake_case（仅对对象/数组生效）
    const newArgs = argsWithStrings.map(arg => (arg && typeof arg === 'object' ? keysToSnake(arg) : arg));

  const result = await fn(...(newArgs as unknown as Args));

    // 3. 把返回值转换成 camelCase
    const converted = keysToCamel(result as unknown);

    return converted as unknown as R;
  }) as (...args: Args) => Promise<R>;
}