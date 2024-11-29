import React, { useState } from 'react';
import MonacoEditor from '../../component/MonacoEditor';
import pyCode from './test.py';

function builtinRead(x: string) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

const App: React.FC = () => {
    const [code, setCode] = useState<string>(pyCode);
    const [language, setLanguage] = useState<string>('python');
    const [theme, setTheme] = useState<string>('vs-light');
    const [output, setOutput] = useState<string>(''); // 存储输出内容
    const [loading, setLoading] = useState<boolean>(false); // 存储输出内容
    // React 中实现的输出函数
    function outf(text: string) {
        setOutput((prevOutput) => prevOutput + text); // 更新输出内容
    }

    // 运行 Python 代码的函数
    function runit() {
        setLoading(true)
        setOutput('')
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
            setLoading(false)
        });
    }

    return (
        <div className="w-screen h-[80vh]">
            {/* 控制面板 */}


            {!loading && <div className="text-center text-3xl text-gray-300">Python Code</div>}

            {/* Monaco 编辑器 */}
            {!loading && <div className="h-[300px] shadow-lg p-2">
                <MonacoEditor
                    value={code}
                    language={language}
                    theme={theme}
                    onChange={(newValue) => setCode(newValue)}
                />
            </div>}

            {/* 运行按钮 */}
            <div
                className="w-24 h-12 leading-[47px] bg-orange-500 rounded-full text-white text-xl text-center ml-auto mr-2 cursor-pointer select-none my-[10px]"
                onClick={runit}
            >
                Run
            </div>
            <div className="flex">

                <div className='flex-1 h-[400px]' id='mycanvas'></div>


                <div className='flex-1 text-[#fff] bg-[#000]'>&gt;&nbsp;&nbsp;{output}</div>
            </div>


        </div>
    );
};

export default App;
