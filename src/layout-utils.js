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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.LayoutUtils = exports.VerticalAlignment = exports.HorizontalAlignment = void 0;
var isSeparator = function (_a) {
    var char = _a.char;
    return char === ' ';
};
var glphysToWords = function (glphys) {
    var index = glphys
        .map(function (g, i) { return (i === 0 && isSeparator(g) ? null : g.char); })
        .indexOf(' ');
    return index > 0
        ? __spreadArray([glphys.slice(0, index)], glphysToWords(glphys.slice(index)), true) : [glphys];
};
var calcWordWidth = function (gs) { return gs.reduce(function (sum, _a) {
    var w = _a.w;
    return sum + w;
}, 0); };
var wordsToLines = function (maxWidth, words) {
    var lines = [];
    var tmpLine = [];
    var tmpLineWidth = 0;
    words
        .filter(function (_a) {
        var length = _a.length;
        return length > 0;
    })
        .forEach(function (word) {
        var wordWidth = calcWordWidth(word);
        if (tmpLineWidth + wordWidth > maxWidth) {
            lines.push(tmpLine);
            var firstWord = word.filter(function (g) { return !isSeparator(g); });
            tmpLine = [firstWord];
            tmpLineWidth = calcWordWidth(firstWord);
        }
        else {
            tmpLine.push(word);
            tmpLineWidth += wordWidth;
        }
    });
    if (tmpLine.length > 0)
        lines.push(tmpLine);
    return lines;
};
var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment["Left"] = "left";
    HorizontalAlignment["Center"] = "center";
    HorizontalAlignment["Right"] = "right";
})(HorizontalAlignment = exports.HorizontalAlignment || (exports.HorizontalAlignment = {}));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment["Bottom"] = "bottom";
    VerticalAlignment["Middle"] = "middle";
    VerticalAlignment["Top"] = "top";
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
var LayoutUtils = /** @class */ (function () {
    function LayoutUtils() {
    }
    LayoutUtils.textToLines = function (font, maxW, text) {
        var fontHeight = font.height();
        var glphys = text.split('').map(function (char) { return ({
            char: char,
            h: fontHeight,
            w: font.stringWidth(char)
        }); });
        return wordsToLines(maxW, glphysToWords(glphys));
    };
    LayoutUtils.linesToMappedGlyphs = function (lines, lineH, containerW, containerH, alignH, alignV) {
        if (alignH === void 0) { alignH = HorizontalAlignment.Center; }
        if (alignV === void 0) { alignV = VerticalAlignment.Middle; }
        var blockH = lineH * lines.length;
        var offsetY = (function () {
            switch (alignV) {
                case VerticalAlignment.Top:
                    return 0;
                case VerticalAlignment.Middle:
                    return Math.floor((containerH - blockH) / 2);
                case VerticalAlignment.Bottom:
                    return containerH - blockH;
            }
        })();
        return lines
            .map(function (words, i) {
            var lineGlyphs = words.reduce(function (glyphs, word) { return __spreadArray(__spreadArray([], glyphs, true), word, true); }, []);
            var lineW = calcWordWidth(lineGlyphs);
            var offsetX = (function () {
                switch (alignH) {
                    case HorizontalAlignment.Left:
                        return 0;
                    case HorizontalAlignment.Center:
                        return Math.floor((containerW - lineW) / 2);
                    case HorizontalAlignment.Right:
                        return containerW - lineW;
                }
            })();
            return lineGlyphs.map(function (glyph) {
                var mapped = __assign(__assign({}, glyph), { x: offsetX, y: offsetY + i * lineH });
                offsetX += glyph.w;
                return mapped;
            });
        })
            .reduce(function (glyphs, words) { return __spreadArray(__spreadArray([], glyphs, true), words, true); }, []);
    };
    return LayoutUtils;
}());
exports.LayoutUtils = LayoutUtils;
