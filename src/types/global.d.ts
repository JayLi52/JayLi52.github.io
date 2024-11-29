// global.d.ts

declare global {
    interface Window {
        loadPyodide: () => Promise<any>; // 这里的 `any` 可以替换为 Pyodide 实际的类型
    }
}

export { };
