/*
 * @Date: 2020-12-10 11:17:52
 * @Description:缓存操作
 */

const ls = window.localStorage;

/**
 * @description: 获取所有缓存keys
 * @return void
 */
export function keys(): void {
  return ls.keys();
}

/**
 * @description: 删除指定缓存
 * @param {string} key：缓存键
 * @return {*} void
 */
export function removeItem(key: string): void {
  ls.removeItem(key);
}

/**
 * @description: 获取指定缓存
 * @param {string} key：缓存键
 * @return {*}
 */
export function getItem(key: string) {
  try {
    const result = ls.getItem(key);
    return result !== null ? JSON.parse(result) : "";
  } catch (err) {
    return err;
  }
}

/**
 * @description: 设置指定缓存
 * @param {string} key：缓存键
 * @return {*}
 */
export function setItem(key: string, val: string | number | object | boolean) {
  try {
    ls.setItem(key, JSON.stringify(val));
  } catch (err) {
    return err;
  }
}

/**
 * @description: 清除所有缓存
 * @return {*}
 */
export function clear(): void {
  ls.clear();
}
