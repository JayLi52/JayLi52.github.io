/**
 * Created by onlyjyf on 8/31/15.
 */
let mathjs = require("mathjs");
let NBMath = {};
/**
 * 点p1绕点p2旋转的角度
 */
NBMath.rotaPoint = function (p1, p2, angle) {
    let _x = p1.x - p2.x;
    let _y = p1.y - p2.y;

    let xp = Math.cos(angle) * _x - Math.sin(angle) * _y;
    let yp = Math.sin(angle) * _x + Math.cos(angle) * _y;

    return {
        x: xp + p2.x,
        y: yp + p2.y
    };
};
// 最小公倍数
NBMath.getLCM = function (num1, num2) {
    let max = NBMath.getGCD(num1, num2);
    return num1 * num2 / max;
};
// 最大公约数
NBMath.getGCD = function (num1, num2) {
    let min = num1 > num2 ? num2 : num1;
    let max = 1;
    for (let i = 2; i <= min; i++) {
        if (num1 % i === 0 && num2 % i === 0) {
            max = i;
        }
    }
    return max;
};

NBMath.GetGroupGCD = function (ary) {
    let length = ary.length;
    if (length <= 1) return;
    let lastNum = ary[0];
    for (let i = 1; i < length; i++) {
        lastNum = NBMath.getGCD(lastNum, ary[i]);
        if (lastNum === 1) {
            break;
        }
    }
    if (lastNum > 1) {
        ary.forEach((v, i, ary) => {
            ary[i] /= lastNum;
        });
    }
    return ary;
};

/**
 * 高斯消元法
 */
NBMath.GaussianElimination = function (calMatrix, calResult) {
    let currentRow = 0;
    let matrix = [].concat(calMatrix);
    let result = [].concat(calResult);
    for (let i = 0; i < matrix.length; i++) {
        let f = matrix[i][currentRow];
        if (f === 0) {
            let got = false;
            for (let j = 0; j < matrix.length; j++) {
                if (j === i) {
                    continue;
                }
                if (matrix[j][currentRow] !== 0) {
                    matrix[i].forEach((value, index, array) => {
                        array[index] += matrix[j][index];
                    });
                    got = true;
                }
            }
            if (got === false) {
                console.error("Wrong Matrix");
                return;
            }
            f = matrix[i][currentRow];
        }
        if (f === 0) {
            for (let w = 0; w < matrix.length; w++) {
                let r = matrix[w];
                if (r[currentRow] !== 0) {
                    matrix[i].forEach((v, index, array) => {
                        array[index] += r[index];
                    });
                    break;
                }
            }
            f = matrix[i][currentRow];
        }
        if (f !== 1) {
            matrix[i].forEach((value, index, array) => {
                array[index] = value / f;
            });
            result[i] = result[i] / f;
        }

        let currentArray = matrix[i];
        for (let j = 0; j < matrix.length; j++) {
            if (j === i) {
                continue;
            }
            let tf = matrix[j][currentRow];
            matrix[j].forEach((value, index, array) => {
                array[index] = value - tf * currentArray[index];
            });
            result[j] = result[j] - tf * result[i];
        }
        currentRow++;
    }
    return result;

};

// eslint-disable-next-line no-unused-vars
function checkMatrix(matrix) {
    let r1 = matrix.length;
    let r2 = matrix[0].length;
    for (let i = 0; i < r1; i++) {
        let row = matrix[i];
        for (let j = 0; j < r2; j++) {
            if (isNaN(row[j])) debugger;
        }
    }
}
/**
 * 牛顿迭代法
 * @param x 取的近似值
 * @param fx 函数fx
 * @param dfx  函数fx的导数
 * @param count 迭代次数 默认10次
 * <code>
 *     let fx = (x)=> {
 *          return Math.pow(x, 3) + Math.pow(x, 2) - 5
 *     }
 *     let fdx = (x)=> {
 *          return Math.pow(3*x, 2) + Math.pow(2*x, 1)
 *     }
 *     NBMath.newtonIterator(3, fx, dfx);
 * </code>
 */
NBMath.newtonIterator = function (x, fx, dfx, count) {
    function r(x, count) {
        let x0 = x;
        let fx0 = fx(x0);
        let ffx0 = dfx(x0);
        // 迭代方程
        let result = x0 - fx0 / ffx0;
        if (isNaN(result) || result === Infinity) {
            return NaN;
        }
        if (count <= 0 || (result === x)) {
            return result;
        }
        return r(result, count - 1);
    }
    return r(x, count || 10);
};

/**
 * @param mx : Array
 * @param mfx  : Array<function>
 * @param dmfx : Matrix, jacobianMatrix
 * @param count 迭代次数
 *
 * 代码示例
 * let mx = [0.1, 0.2, 0.1, 0.1, 0.1];
 * let mfx = [
 *   (x, y, z, m, k)=> {return z * x - 4.1e-7 * k},
 *   (x, y, z, m, k)=> {return z * y - 5.6e-11 * x},
 *   (x, y, z, m, k)=> {return z * m - 1e-14},
 *   (x, y, z, m, k)=> {return m + x + 2 * y - z - 0.002},
 *   (x, y, z, m, k)=> {return 2 * k + 2 * x + 2 * y - 0.002}
 *   ];
 * let jfx =
 *   [
 *   [(x, y, z, m, k)=> {return z}, 0, (x, y, z, m, k)=> {return x}, 0, -4.1e-7],
 *   [-5.6e-11, (x, y, z, m, k)=> {return z}, (x, y, z, m, k)=> {return y}, 0, 0],
 *   [0, 0, (x, y, z, m, k)=> {return m}, (x, y, z, m, k)=> {return z}, 0],
 *   [1, 2, -1, 1, 0],
 *   [2, 2, 0, 0, 2]
 *   ];
 * NBMath.newtonJacobianInterator(mx, mfx, jfx, 20);
 */
NBMath.newtonJacobianInterator = function (mx, mfx, jfx, count) {
    function r(mx, mfx, jfx, count) {
        let mx0 = mx;
        let mfx0Ary = [];
        for (let i = 0; i < mfx.length; i++) {
            mfx0Ary.push(mfx[i].apply(null, mx0));
        }
        // 更新算雅克比矩阵数据
        let jfxResult = [];
        for (let i = 0; i < jfx.length; i++) {
            let jfxAry = jfx[i];
            let ary = [];
            jfxResult.push(ary);
            for (let j = 0; j < jfxAry.length; j++) {
                if (jfxAry[j] instanceof Function) {
                    ary.push(jfxAry[j].apply(null, mx0));
                } else {
                    ary.push(jfxAry[j]);
                }
            }
        }
        // 迭代方程
        let jfxInv = mathjs.inv(jfxResult);
        let result = mathjs.subtract(mx0, mathjs.multiply(jfxInv, mfx0Ary));
        // console.log(result);
        if (count <= 0 || judgeEqual(result, mx)) {
            return result;
        }
        return r(result, mfx, jfx, count - 1);
    }

    function judgeEqual(res1, res2) {
        if (res1.length !== res2.length) {
            return false;
        }

        for (let i = 0; i < res1.length; i++) {
            if (res1[i] !== res2[i]) {
                return false;
            }
        }

        return true;
    }
    return r(mx, mfx, jfx, count || 10);
};



module.exports = NBMath;
