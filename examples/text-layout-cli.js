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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var globby = require("globby");
var path_1 = require("path");
var ora = require("ora");
var prompts = require("prompts");
var src_1 = require("../src");
var _config_1 = require("./_config");
var Colors = {
    Aquamarine: 0x7fffd4,
    Black: 0x000000,
    Blue: 0x0000ff,
    Cyan: 0x00ffff,
    Green: 0x00ff00,
    Magenta: 0xff00ff,
    Purple: 0x800080,
    Red: 0xff0000,
    White: 0xffffff,
    Yellow: 0xffff00
};
var wait = function (t) { return new Promise(function (ok) { return setTimeout(ok, t); }); };
var CliMode;
(function (CliMode) {
    CliMode["BgColor"] = "bgColor";
    CliMode["Brightness"] = "brightness";
    CliMode["Exit"] = "exit";
    CliMode["FgColor"] = "fgColor";
    CliMode["Font"] = "font";
    CliMode["HorizontalAlignment"] = "horizontalAlignment";
    CliMode["Text"] = "text";
    CliMode["VerticalAlignment"] = "verticalAlignment";
})(CliMode || (CliMode = {}));
var prependChoiceToGoBack = function (choices) { return __spreadArray([
    { title: '⬅️  Go back', value: '' }
], choices, true); };
var createBrightnessPrompter = function () {
    return function (currentBrightness) {
        if (currentBrightness === void 0) { currentBrightness = 100; }
        return prompts({
            name: 'brightness',
            type: 'number',
            max: 100,
            min: 0,
            message: "Enter a brightness value or press escape to go back (current brightness is ".concat(currentBrightness, "%)")
        });
    };
};
var createColorSelector = function (colorType, colors) {
    var colorIndex = Object.entries(colors).reduce(function (index, _a) {
        var _b;
        var name = _a[0], value = _a[1];
        return (__assign(__assign({}, index), (_b = {}, _b[value] = name, _b)));
    }, {});
    var findColorName = function (_a) {
        var r = _a.r, g = _a.g, b = _a.b;
        return colorIndex[((r << 16) | (g << 8) | b) & 0xffffff];
    };
    return function (currentColor) {
        var currentColorName = findColorName(currentColor);
        var currentColorIndex = Object.keys(colors).indexOf(currentColorName) || 0;
        return prompts({
            name: 'color',
            type: 'select',
            hint: !currentColorName
                ? ''
                : "Current ".concat(colorType, " color is ").concat(currentColorName.toLowerCase()),
            initial: currentColorIndex + 1,
            message: "Select a ".concat(colorType, " color"),
            choices: prependChoiceToGoBack(Object.entries(colors).map(function (_a) {
                var title = _a[0], value = _a[1];
                return ({
                    title: title,
                    value: "".concat(value)
                });
            }))
        });
    };
};
var createFontSelector = function (fontList) {
    return function (currentFont) {
        if (currentFont === void 0) { currentFont = ''; }
        var currentFontIndex = fontList.map(function (f) { return f.name(); }).indexOf(currentFont) || 0;
        return prompts({
            name: 'font',
            type: 'select',
            message: "Select a font",
            initial: currentFontIndex + 1,
            hint: !currentFont ? '' : "Current font is \"".concat(currentFont, "\""),
            choices: prependChoiceToGoBack(fontList.map(function (font) { return ({
                title: "".concat(font.name(), "\t(height ").concat(font.height(), "px)"),
                value: font.name()
            }); }))
        });
    };
};
function createAlignmentSelector(alignmentType, alignments) {
    return function (currentAlignment) {
        var currentIndex = Object.values(alignments).indexOf(currentAlignment) || 0;
        return prompts({
            name: 'alignment',
            type: 'select',
            message: "Set the ".concat(alignmentType, " alignment"),
            initial: currentIndex + 1,
            hint: !currentAlignment
                ? ''
                : "Current alignment is \"".concat(currentAlignment, "\""),
            choices: prependChoiceToGoBack(Object.entries(alignments).map(function (_a) {
                var k = _a[0], v = _a[1];
                return ({
                    title: k,
                    value: v
                });
            }))
        });
    };
}
var createTextPrompter = function () { return function () {
    return prompts({
        name: 'text',
        type: 'text',
        message: 'Input text to display or press escape to go back'
    });
}; };
var createModeSelector = function () { return function () {
    return prompts({
        name: 'mode',
        type: 'select',
        message: 'What would you like to do?',
        hint: 'Use tab or arrow keys and press enter to select.',
        choices: [
            { value: CliMode.Text, title: '🔠 Render some text' },
            { value: CliMode.Font, title: '✒️  Change the font' },
            { value: CliMode.BgColor, title: '🎨 Pick a background color' },
            { value: CliMode.FgColor, title: '🎨 Pick a foreground color' },
            {
                value: CliMode.HorizontalAlignment,
                title: '↔️  Set the horizontal alignment'
            },
            {
                value: CliMode.VerticalAlignment,
                title: '↕️  Set the vertical alignment'
            },
            { value: CliMode.Brightness, title: '🌟 Set the display brightness' },
            { value: CliMode.Exit, title: '🚪 Exit' },
        ]
    });
}; };
// tslint:disable-next-line: cyclomatic-complexity
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var matrix_1, fontLoader_1, fontExt_1, fontList, fonts_1, chooseBgColor, chooseFgColor, chooseHorizontalAlignment, chooseVerticalAlignment, chooseMode, chooseFont, inputText, setBrightness, alignmentH_1, alignmentV_1, render, _a, color, color, font, brightness, alignment, alignment, _loop_1, state_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 29, , 30]);
                matrix_1 = new src_1.LedMatrix(_config_1.matrixOptions, _config_1.runtimeOptions).afterSync(function () { return undefined; });
                fontLoader_1 = ora({ color: 'magenta' })
                    .start('Loading fonts')
                    .stopAndPersist();
                fontExt_1 = '.bdf';
                return [4 /*yield*/, globby("".concat(process.cwd(), "/fonts/*").concat(fontExt_1))];
            case 1:
                fontList = (_b.sent())
                    .filter(function (path) { return !Number.isSafeInteger(+(0, path_1.basename)(path, fontExt_1)[0]); })
                    .map(function (path) {
                    var name = (0, path_1.basename)(path, fontExt_1);
                    fontLoader_1.start("\"".concat(name, "\""));
                    var font = new src_1.Font((0, path_1.basename)(path, fontExt_1), path);
                    fontLoader_1.succeed();
                    return font;
                });
                if (fontList.length < 1) {
                    throw new Error("No fonts were loaded!");
                }
                else {
                    // Set some default values
                    matrix_1.clear().font(fontList[18]).fgColor(Colors.Magenta).sync();
                }
                fonts_1 = fontList.reduce(function (map, font) {
                    var _a;
                    return (__assign(__assign({}, map), (_a = {}, _a[font.name()] = font, _a)));
                }, {});
                chooseBgColor = createColorSelector('background', Colors);
                chooseFgColor = createColorSelector('foreground', Colors);
                chooseHorizontalAlignment = createAlignmentSelector('horizontal', Object.values(src_1.HorizontalAlignment));
                chooseVerticalAlignment = createAlignmentSelector('vertical', Object.values(src_1.VerticalAlignment));
                chooseMode = createModeSelector();
                chooseFont = createFontSelector(fontList);
                inputText = createTextPrompter();
                setBrightness = createBrightnessPrompter();
                alignmentH_1 = src_1.HorizontalAlignment.Center;
                alignmentV_1 = src_1.VerticalAlignment.Middle;
                render = function () {
                    matrix_1.clear();
                    var fgColor = matrix_1.fgColor();
                    matrix_1.fgColor(matrix_1.bgColor()).fill().fgColor(fgColor);
                    var font = fonts_1[matrix_1.font()];
                    var lines = src_1.LayoutUtils.textToLines(font, matrix_1.width(), 'Hello, matrix!');
                    src_1.LayoutUtils.linesToMappedGlyphs(lines, font.height(), matrix_1.width(), matrix_1.height(), alignmentH_1, alignmentV_1).map(function (glyph) {
                        matrix_1.drawText(glyph.char, glyph.x, glyph.y);
                    });
                    matrix_1.sync();
                };
                // Render the hello message
                render();
                _b.label = 2;
            case 2:
                if (!true) return [3 /*break*/, 28];
                return [4 /*yield*/, chooseMode()];
            case 3:
                _a = (_b.sent()).mode;
                switch (_a) {
                    case CliMode.BgColor: return [3 /*break*/, 4];
                    case CliMode.FgColor: return [3 /*break*/, 7];
                    case CliMode.Font: return [3 /*break*/, 10];
                    case CliMode.Brightness: return [3 /*break*/, 13];
                    case CliMode.HorizontalAlignment: return [3 /*break*/, 16];
                    case CliMode.VerticalAlignment: return [3 /*break*/, 19];
                    case CliMode.Text: return [3 /*break*/, 22];
                    case CliMode.Exit: return [3 /*break*/, 26];
                }
                return [3 /*break*/, 27];
            case 4:
                if (!true) return [3 /*break*/, 6];
                return [4 /*yield*/, chooseBgColor(matrix_1.bgColor())];
            case 5:
                color = (_b.sent()).color;
                if (color && Number.isSafeInteger(+color)) {
                    matrix_1.bgColor(+color);
                    render();
                }
                else
                    return [3 /*break*/, 6];
                return [3 /*break*/, 4];
            case 6: return [3 /*break*/, 27];
            case 7:
                if (!true) return [3 /*break*/, 9];
                return [4 /*yield*/, chooseFgColor(matrix_1.fgColor())];
            case 8:
                color = (_b.sent()).color;
                if (color && Number.isSafeInteger(+color)) {
                    matrix_1.fgColor(+color);
                    render();
                }
                else
                    return [3 /*break*/, 9];
                return [3 /*break*/, 7];
            case 9: return [3 /*break*/, 27];
            case 10:
                if (!true) return [3 /*break*/, 12];
                return [4 /*yield*/, chooseFont(matrix_1.font())];
            case 11:
                font = (_b.sent()).font;
                if (font in fonts_1) {
                    matrix_1.font(fonts_1[font]);
                    render();
                }
                else
                    return [3 /*break*/, 12];
                return [3 /*break*/, 10];
            case 12: return [3 /*break*/, 27];
            case 13:
                if (!true) return [3 /*break*/, 15];
                return [4 /*yield*/, setBrightness(matrix_1.brightness())];
            case 14:
                brightness = (_b.sent()).brightness;
                if (Number.isSafeInteger(brightness)) {
                    matrix_1.brightness(brightness);
                    render();
                }
                else
                    return [3 /*break*/, 15];
                return [3 /*break*/, 13];
            case 15: return [3 /*break*/, 27];
            case 16:
                if (!true) return [3 /*break*/, 18];
                return [4 /*yield*/, chooseHorizontalAlignment(alignmentH_1)];
            case 17:
                alignment = (_b.sent()).alignment;
                if (alignment) {
                    alignmentH_1 = alignment;
                    render();
                }
                else
                    return [3 /*break*/, 18];
                return [3 /*break*/, 16];
            case 18: return [3 /*break*/, 27];
            case 19:
                if (!true) return [3 /*break*/, 21];
                return [4 /*yield*/, chooseVerticalAlignment(alignmentV_1)];
            case 20:
                alignment = (_b.sent()).alignment;
                if (alignment) {
                    alignmentV_1 = alignment;
                    render();
                }
                else
                    return [3 /*break*/, 21];
                return [3 /*break*/, 19];
            case 21: return [3 /*break*/, 27];
            case 22:
                _loop_1 = function () {
                    var text;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, inputText()];
                            case 1:
                                text = (_c.sent()).text;
                                // Go back to mode select if escape was pressed (text will be undefined)
                                if (typeof text !== 'string')
                                    return [2 /*return*/, "break"];
                                // Otherwise, show'em some text and thunk the operation
                                render = function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var fgColor, font, lines, glyphs, _i, glyphs_1, glyph;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                matrix_1.clear();
                                                fgColor = matrix_1.fgColor();
                                                matrix_1.fgColor(matrix_1.bgColor()).fill().fgColor(fgColor);
                                                font = fonts_1[matrix_1.font()];
                                                lines = src_1.LayoutUtils.textToLines(font, matrix_1.width(), text);
                                                glyphs = src_1.LayoutUtils.linesToMappedGlyphs(lines, font.height(), matrix_1.width(), matrix_1.height(), alignmentH_1, alignmentV_1);
                                                _i = 0, glyphs_1 = glyphs;
                                                _a.label = 1;
                                            case 1:
                                                if (!(_i < glyphs_1.length)) return [3 /*break*/, 4];
                                                glyph = glyphs_1[_i];
                                                matrix_1.drawText(glyph.char, glyph.x, glyph.y);
                                                matrix_1.sync();
                                                return [4 /*yield*/, wait(150 * Math.random() + 20)];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3:
                                                _i++;
                                                return [3 /*break*/, 1];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); };
                                render();
                                return [2 /*return*/];
                        }
                    });
                };
                _b.label = 23;
            case 23:
                if (!true) return [3 /*break*/, 25];
                return [5 /*yield**/, _loop_1()];
            case 24:
                state_1 = _b.sent();
                if (state_1 === "break")
                    return [3 /*break*/, 25];
                return [3 /*break*/, 23];
            case 25: return [3 /*break*/, 27];
            case 26:
                {
                    console.log('Bye!');
                    process.exit(0);
                }
                _b.label = 27;
            case 27: return [3 /*break*/, 2];
            case 28: return [3 /*break*/, 30];
            case 29:
                error_1 = _b.sent();
                console.error("".concat(__filename, " caught: "), error_1);
                return [3 /*break*/, 30];
            case 30: return [2 /*return*/];
        }
    });
}); })();
