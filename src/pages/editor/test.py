import turtle as t  # 导入turtle并起别名t，下面的t就表示turtle

def face():  # 定义face函数
    t.fillcolor('blue')  # 设置填充颜色为蓝色
    t.begin_fill()  # 开始填充
    t.circle(100)  # 画半径为100的圆
    t.end_fill()  # 结束填充
    t.fillcolor('white')  # 设置填充颜色为白色
    t.begin_fill()  # 开始填充
    t.circle(80)  # 画半径为80的圆
    t.end_fill()  # 结束填充

def eyes():  # 定义eyes函数
    for i in [-1, 1]:  # for循环，变量i分别赋值-1、1，循环2次
        t.penup()  # 抬笔
        t.goto(20*i, 140)  # 移动画笔到指定坐标位置
        t.pendown()  # 落笔
        t.fillcolor('white')  # 设置填充颜色为白色
        t.begin_fill()  # 开始填充
        t.circle(20)  # 画半径为20的圆
        t.end_fill()  # 结束填充
        t.penup()  # 抬笔
        t.goto(10*i, 160)  # 移动画笔到指定坐标位置
        t.pendown()  # 落笔
        t.dot(10)  # 画直径为10的实心点

def nose():  # 定义nose函数
    t.penup()  # 抬笔
    t.goto(0, 115)  # 移动画笔到坐标(0, 115)位置
    t.pendown()  # 落笔
    t.fillcolor('red')  # 设置填充颜色为红色
    t.begin_fill()  # 开始填充
    t.circle(15)  # 画半径为15的圆
    t.end_fill()  # 结束填充

def mouth():  # 定义mouth函数
    t.penup()  # 抬笔
    t.goto(0, 110)  # 移动画笔到坐标(0, 110)位置
    t.pendown()  # 落笔
    t.goto(0, 25)  # 移动画笔到坐标(0, 25)位置
    t.circle(120, 35)  # 画半径为120、角度为35度的圆弧
    t.circle(120, -70)  # 画半径为120的圆、角度为70度的圆弧，与上面左右方向相反

def beard():  # 定义beard函数
    for i in [-1, 1]:  # for循环，变量i分别赋值-1、1，循环2次
        t.penup()  # 抬笔
        t.goto(15*i, 90)  # 移动画笔到指定坐标位置
        t.pendown()  # 落笔
        t.goto(70*i, 90)  # 移动画笔到指定坐标位置
        for j in [-1, 1]:  # for循环，变量i分别赋值-1、1，循环2次
            t.penup()  # 抬笔
            t.goto(15*i, 90+10*j)  # 移动画笔到指定坐标位置
            t.pendown()  # 落笔
            t.goto(65*i, 90+30*j)  # 移动画笔到指定坐标位置

face()  # 调用face函数
eyes()  # 调用eyes函数
nose()  # 调用nose函数
mouth()  # 调用mouth函数
beard()  # 调用beard函数
t.hideturtle()  # 隐藏画笔形状
t.done()  # 画图完毕
print('drawing done')