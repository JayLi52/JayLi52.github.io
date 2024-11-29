import React, { useState, useRef, useEffect } from 'react';
import MonacoEditor from '../../component/MonacoEditor';
import fibCode from './fib.py';
import turtleCode from './test.py';

function builtinRead(x: string) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

const App: React.FC = () => {
    const [code, setCode] = useState<string>(fibCode);
    const [language] = useState<string>('python');
    const [theme] = useState<string>('vs-light');
    const [output, setOutput] = useState<string>(''); // 存储输出内容
    const [loading, setLoading] = useState<boolean>(false); // 存储加载状态
    const [spanTime, setSpanTime] = useState<number>(0);

    const startTimeRef = useRef<number>(0); // 使用 ref 存储开始时间
    const pyodideRef = useRef<any>(null);

    // React 中实现的输出函数
    function outf(text: string) {
        setOutput((prevOutput) => prevOutput + text); // 更新输出内容
    }

    // 运行 Python 代码的函数
    function runit() {
        setLoading(true);
        setOutput('');
        startTimeRef.current = Date.now(); // 使用 ref 记录开始时间
        Sk.pre = "output";
        Sk.configure({ output: outf, read: builtinRead });

        // 配置 TurtleGraphics 目标
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';

        // 执行 Python 程序
        const myPromise = Sk.misceval.asyncToPromise(function () {
            return Sk.importMainWithBody("<stdin>", false, code, true);
        });

        myPromise.then(function () {
            console.log('success');
            setSpanTime(Date.now() - startTimeRef.current); // 使用 ref 获取开始时间
            setLoading(false);
        });
    }

    async function runPython() {
        startTimeRef.current = Date.now(); // 记录开始时间
        
        await pyodideRef.current.runPython(code);
        setSpanTime(Date.now() - startTimeRef.current); // 使用 ref 获取开始时间
    }

    function changeCode() {
        if (code === fibCode) setCode(turtleCode)
        else setCode(fibCode)
    }

    useEffect(() => {
        loadPyodide().then((pyodide: any) => {
            pyodide.setStdout({
                batched: (text: string) => {
                    setOutput(text); // 更新输出内容
                }
            })
            pyodideRef.current = pyodide

        })
    }, [])

    return (
        <div className="w-screen h-[80vh] bg-gradient-to-b from-blue-600 to-blue-900 text-white">
            {/* 控制面板 */}
            {!loading && <div className="text-center text-3xl text-gray-200 mb-4">Python Code</div>}

            {/* Monaco 编辑器 */}
            {!loading && <div className="h-[300px] shadow-lg p-2 bg-gray-800 rounded-lg">
                <MonacoEditor
                    value={code}
                    language={language}
                    theme={theme}
                    onChange={(newValue) => setCode(newValue)}
                />
            </div>}

            <div className="flex justify-end items-center h-[15vh] mx-[20px]">
                <span
                    className="mx-[20px] px-[10px] h-14 bg-gradient-to-r from-orange-500 to-yellow-600 text-white text-xl font-semibold rounded-xl shadow-lg flex justify-center items-center transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer select-none my-[10px]"
                    onClick={changeCode}
                >
                    changeCode
                </span>
                {/* 运行按钮 通过 Skulpt 执行 */}
                <span
                    className="px-[10px] h-14 bg-gradient-to-r from-orange-500 to-yellow-600 text-white text-xl font-semibold rounded-xl shadow-lg flex justify-center items-center transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer select-none my-[10px]"
                    onClick={runit}
                >
                    Run by Skulpt
                </span>

                {/* 运行按钮 通过 Pyodide 执行 */}
                <span
                    className="px-[10px] h-14 bg-gradient-to-r from-blue-500 to-teal-600 text-white text-xl font-semibold rounded-xl shadow-lg flex justify-center items-center transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer select-none my-[10px] ml-4"
                    onClick={runPython}
                >
                    Run by Pyodide
                </span>
            </div>

            {/* 显示运行时间 */}
            <div className="text-center text-lg text-gray-300">Time of use: {spanTime} ms</div>

            {/* 输出区域 */}
            <div className="flex mb-4">
                <div className="flex-1 h-[400px] bg-gray-700 rounded-lg" id="mycanvas"></div>
                <div className="flex-1 text-lg bg-gradient-to-t from-black to-gray-900 p-4 overflow-y-auto rounded-lg">
                    <div className="text-green-400">&gt; {output}</div>
                </div>
            </div>
        </div>
    );
};

export default App;
