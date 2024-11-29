import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

interface MonacoEditorProps {
  value?: string; // 初始代码内容
  language?: string; // 语言类型，如 "javascript", "typescript"
  theme?: string; // 主题类型，如 "vs-dark", "vs-light"
  onChange?: (value: string) => void; // 内容变化回调
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value = '',
  language = 'python',
  theme = 'vs-light',
  onChange,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null); // DOM 容器的引用
  const monacoInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      // 初始化 Monaco Editor
      monacoInstanceRef.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme,
        automaticLayout: true, // 自动布局
      });

      // 监听内容变化
      const model = monacoInstanceRef.current.getModel();
      if (model && onChange) {
        model.onDidChangeContent(() => {
          const newValue = model.getValue();
          onChange(newValue);
        });
      }
    }

    // 组件卸载时销毁 Monaco Editor
    return () => {
      monacoInstanceRef.current?.dispose();
    };
  }, []); // 只初始化一次

  // 响应语言或主题变化
  useEffect(() => {
    if (monacoInstanceRef.current) {
      monaco.editor.setTheme(theme);
      const model = monacoInstanceRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language, theme]);

  // 响应外部 value 变化
  useEffect(() => {
    if (monacoInstanceRef.current && value !== undefined) {
      const model = monacoInstanceRef.current.getModel();
      if (model && model.getValue() !== value) {
        model.setValue(value); // 更新编辑器内容
      }
    }
  }, [value]);

  return <div ref={editorRef} style={{ width: '100%', height: '100%' }} />;
};

export default MonacoEditor;
