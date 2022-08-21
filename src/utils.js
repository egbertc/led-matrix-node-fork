"use strict";
exports.__esModule = true;
exports.LedMatrixUtils = void 0;
var types_1 = require("./types");
var LedMatrixUtils = /** @class */ (function () {
    function LedMatrixUtils() {
    }
    LedMatrixUtils.encodeMappers = function () {
        var mappers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mappers[_i] = arguments[_i];
        }
        return mappers
            .map(function (mapper) {
            switch (mapper.type) {
                case types_1.PixelMapperType.Chainlink:
                    return types_1.PixelMapperType.Chainlink;
                case types_1.PixelMapperType.Rotate:
                    return [types_1.PixelMapperType.Rotate, mapper.angle].join(':');
                case types_1.PixelMapperType.U:
                    return types_1.PixelMapperType.U;
                case types_1.PixelMapperType.V:
                    return types_1.PixelMapperType.V;
                case types_1.PixelMapperType.VZ:
                    return types_1.PixelMapperType.VZ;
            }
        })
            .join(';');
    };
    return LedMatrixUtils;
}());
exports.LedMatrixUtils = LedMatrixUtils;
