# fibonacci.py

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

# 测试计算 30 项 Fibonacci 数列的时间
if __name__ == '__main__':
    print(fibonacci(32))
