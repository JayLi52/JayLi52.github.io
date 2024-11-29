/**
 *
 * Created by onlyjyf on 9/14/16.
 */
var MatrixUtil = function() {};

/**
 * 提取矩阵的旋转角度
 * @returns {number}
 */
MatrixUtil.retrieveRotation = function(matrix) {
    // var value = matrix.c / matrix.d;
    return -Math.atan2(matrix.c, matrix.d);
};
module.exports = MatrixUtil;
