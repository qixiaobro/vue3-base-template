/*
 * @Date: 2020-12-23 16:14:16
 * @Description:合并module导出
 */
const files = require.context(".", false, /\.ts$/);
const modules: {
  [key: string]: unknown;
} = {};
let Realmodule = {};

files.keys().forEach(key => {
  if (key === "./index.ts") return;
  modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
});
Realmodule = Object.assign({}, modules);
export default Realmodule;
