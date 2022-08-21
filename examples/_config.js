"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.runtimeOptions = exports.matrixOptions = void 0;
var src_1 = require("../src");
exports.matrixOptions = __assign(__assign({}, src_1.LedMatrix.defaultMatrixOptions()), { rows: 64, cols: 64, chainLength: 2, hardwareMapping: src_1.GpioMapping.Regular, parallel: 2, 
    // panelType: 'FM6127',
    // limitRefreshRateHz: 1,
    showRefreshRate: true });
console.log('matrix options: ', JSON.stringify(exports.matrixOptions, null, 2));
exports.runtimeOptions = __assign(__assign({}, src_1.LedMatrix.defaultRuntimeOptions()), { gpioSlowdown: 4, dropPrivileges: src_1.RuntimeFlag.Off });
console.log('runtime options: ', JSON.stringify(exports.runtimeOptions, null, 2));
