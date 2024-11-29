import ballAvif from '@/assets/ball.avif';
import ninjaGirlPng from '@/assets/ninjagirl.png';
import webglWaterThumb from '@/assets/webgl-water-thumb.jpg';
import shaderExamplePng from '@/assets/shader-example.png';
import pixiLogoSvg from '@/assets/pixi-logo.svg';
import bgDark from '@/assets/bg-dark.jpg';
import editor from '@/assets/editor.png';

// HomeCard component
const HomeCard = ({ title, time, description, links = [], icon }: any) => (
    <div className="relative pl-24 md:pl-32 py-6 min-h-20 my-12">
        <div
            className="absolute left-0 top-0 w-20 h-20 md:w-32 md:h-32 bg-contain bg-center rounded-md bg-no-repeat"
            style={{ backgroundImage: `url(${icon})` }}
        ></div>
        <div className='ml-[20px]'>
            <h3 className="text-lg font-bold">
                {title} <span className="font-normal text-sm">({time})</span>
            </h3>
            {Array.isArray(description) ? (
                <ul className="list-disc pl-5">
                    {description.map((item: string, idx: number) => (
                        <li key={idx} className="text-sm">
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm">{description}</p>
            )}
            {links.map((link: any, idx: number) => (
                <p key={idx}>
                    <a href={link.href} className="text-blue-500 hover:text-blue-700">
                        {link.text}
                    </a>
                </p>
            ))}
        </div>
    </div>
);

// Nav component
const Nav = () => (
    <nav className="bg-gray-800 text-gray-200">
        <section className="flex justify-end p-4">
            <ul className="flex space-x-4 font-serif italic text-lg">
                <li>
                    <a
                        href="https://github.com/liyongjie123"
                        className="hover:text-white transition-colors"
                    >
                        GitHub
                    </a>
                </li>
            </ul>
        </section>
    </nav>
);

// Header component
const Header = () => (
    <header
        className="bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgDark})` }}
    >
        <section className="text-center py-16 text-white">
            <h1 className="text-4xl md:text-6xl font-serif italic font-bold">
                Li Yongjie
            </h1>
        </section>
    </header>
);

// Main content component
const Main = () => (
    <main className="px-6 md:px-12">
        <section>
            <h2 className="text-3xl font-serif italic font-bold mt-8">Unity</h2>
            <HomeCard
                title="Unity Game"
                time="2023"
                description={[
                    '滚球跑酷游戏',
                    '碰到障碍物 GameOver / R重置游戏',
                ]}
                icon={ballAvif}
                links={[{ href: '/src/unity-game/', text: 'View demo...' }]}
            />
            <HomeCard
                title="Unity Game"
                time="2023"
                description={[
                    'NinjaGirl - 忍者女孩',
                    '左右控制 / 空格跳跃 / idle、run、jump帧动画 / 刚体设置',
                ]}
                icon={ninjaGirlPng}
                links={[{ href: '/src/NinjaGirl/', text: 'View demo...' }]}
            />

            <h2 className="text-3xl font-serif italic font-bold mt-8">Graphics</h2>
            <HomeCard
                title="WebGL Water"
                time="2022"
                description="This project was an experiment in realtime water rendering with WebGL..."
                icon={webglWaterThumb}
                links={[{ href: '/src/webgl-water', text: 'View demo...' }]}
            />
            <HomeCard
                title="Shader Toy Example"
                time="2023"
                description="These projects showcase a diverse set of skills and expertise in real-time rendering..."
                icon={shaderExamplePng}
                links={[
                    { href: 'https://www.shadertoy.com/view/4fsGDM', text: 'Coordinate' },
                    { href: 'https://www.shadertoy.com/view/Xfl3DM', text: '3D SDF & Raymarch' },
                    { href: 'https://www.shadertoy.com/view/4cl3DM', text: 'SDF Bool operate' },
                    { href: 'https://www.shadertoy.com/view/Xcl3DM', text: 'Noise function' },
                ]}
            />
            <HomeCard
                title="PixiJS Example"
                time="2023"
                description="Effects related to physical and chemical experiments"
                icon={pixiLogoSvg}
                links={[
                    { href: 'src/pixi-demo/index.html', text: 'View demo...' },
                    { href: 'src/spring/src/index.html', text: 'View demo...' },
                ]}
            />

            <h2 className="text-3xl font-serif italic font-bold mt-8">Studying Notes</h2>
            <p>
                <a href="https://www.yuque.com/songguo-jhekj">View yuque...</a>
            </p>

            <h2 className="text-3xl font-serif italic font-bold mt-8">Editor</h2>
            <HomeCard
                title="Python Editor"
                time="2021"
                description={[
                    'Python editing, running, and debugging capabilities',
                    'Implement Python syntax: lists, tuples, dictionaries, etc., modularization, etc.',
                    'Multiple themes and font customization',
                    'Support Electron and Web environment',
                    'Online file system',
                ]}
                icon={editor}
                links={[{ href: '/dist/editor/', text: 'View demo...' }]}
            />
        </section>
    </main>
);

// App component
const App = () => (
    <div className="font-sans text-gray-800">
        <Nav />
        <Header />
        <Main />
    </div>
);

export default App;
