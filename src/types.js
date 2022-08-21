"use strict";
exports.__esModule = true;
exports.GpioMapping = exports.RowAddressType = exports.RuntimeFlag = exports.PixelMapperType = exports.MuxType = exports.ScanMode = void 0;
var ScanMode;
(function (ScanMode) {
    ScanMode[ScanMode["Progressive"] = 0] = "Progressive";
    ScanMode[ScanMode["Interlaced"] = 1] = "Interlaced";
})(ScanMode = exports.ScanMode || (exports.ScanMode = {}));
var MuxType;
(function (MuxType) {
    MuxType[MuxType["Direct"] = 0] = "Direct";
    MuxType[MuxType["Stripe"] = 1] = "Stripe";
    MuxType[MuxType["Checker"] = 2] = "Checker";
    MuxType[MuxType["Spiral"] = 3] = "Spiral";
    MuxType[MuxType["ZStripe"] = 4] = "ZStripe";
    MuxType[MuxType["ZnMirrorZStripe"] = 5] = "ZnMirrorZStripe";
    MuxType[MuxType["Coreman"] = 6] = "Coreman";
    MuxType[MuxType["Kaler2Scan"] = 7] = "Kaler2Scan";
    MuxType[MuxType["ZStripeUneven"] = 8] = "ZStripeUneven";
    MuxType[MuxType["P10128x4Z"] = 9] = "P10128x4Z";
    MuxType[MuxType["QiangLiQ8"] = 10] = "QiangLiQ8";
    MuxType[MuxType["InversedZStripe"] = 11] = "InversedZStripe";
    MuxType[MuxType["P10Outdoor1R1G1BMultiplexMapper1"] = 12] = "P10Outdoor1R1G1BMultiplexMapper1";
    MuxType[MuxType["P10Outdoor1R1G1BMultiplexMapper2"] = 13] = "P10Outdoor1R1G1BMultiplexMapper2";
    MuxType[MuxType["P10Outdoor1R1G1BMultiplexMapper3"] = 14] = "P10Outdoor1R1G1BMultiplexMapper3";
    MuxType[MuxType["P10CoremanMapper"] = 15] = "P10CoremanMapper";
    MuxType[MuxType["P8Outdoor1R1G1BMultiplexMapper"] = 16] = "P8Outdoor1R1G1BMultiplexMapper";
    MuxType[MuxType["FlippedStripeMultiplexMapper"] = 17] = "FlippedStripeMultiplexMapper";
    MuxType[MuxType["P10Outdoor32x16HalfScanMapper"] = 18] = "P10Outdoor32x16HalfScanMapper";
})(MuxType = exports.MuxType || (exports.MuxType = {}));
var PixelMapperType;
(function (PixelMapperType) {
    PixelMapperType["Chainlink"] = "Chainlink";
    PixelMapperType["U"] = "U-mapper";
    PixelMapperType["Rotate"] = "Rotate";
    PixelMapperType["V"] = "V-mapper";
    PixelMapperType["VZ"] = "V-mapper:Z";
})(PixelMapperType = exports.PixelMapperType || (exports.PixelMapperType = {}));
/**
 * If a runtime option is set to Disabled, it's command line flag will be unavailable.
 */
var RuntimeFlag;
(function (RuntimeFlag) {
    RuntimeFlag[RuntimeFlag["Disabled"] = -1] = "Disabled";
    RuntimeFlag[RuntimeFlag["Off"] = 0] = "Off";
    RuntimeFlag[RuntimeFlag["On"] = 1] = "On";
})(RuntimeFlag = exports.RuntimeFlag || (exports.RuntimeFlag = {}));
var RowAddressType;
(function (RowAddressType) {
    /**
     * Corresponds to direct setting of the row.
     */
    RowAddressType[RowAddressType["Direct"] = 0] = "Direct";
    /**
     * Used for panels that only have A/B. (typically some 64x64 panels)
     */
    RowAddressType[RowAddressType["AB"] = 1] = "AB";
    /**
     * Direct row select
     */
    RowAddressType[RowAddressType["DirectRow"] = 2] = "DirectRow";
    /**
     * ABC addressed panels
     */
    RowAddressType[RowAddressType["ABC"] = 3] = "ABC";
    /**
     * 4 = ABC Shift + DE direct
     */
    RowAddressType[RowAddressType["ABCShift"] = 4] = "ABCShift";
})(RowAddressType = exports.RowAddressType || (exports.RowAddressType = {}));
var GpioMapping;
(function (GpioMapping) {
    /**
     * The regular hardware mapping described in the wiring.md and used
     * by the adapter PCBs.
     */
    GpioMapping["Regular"] = "regular";
    /**
     * This is used if you have an Adafruit HAT in the default configuration
     */
    GpioMapping["AdafruitHat"] = "adafruit-hat";
    /**
     * An Adafruit HAT with the PWM modification
     */
    GpioMapping["AdafruitHatPwm"] = "adafruit-hat-pwm";
    /**
     * The regular pin-out, but for Raspberry Pi1. The very first Pi1 Rev1 uses
     * the same pin for GPIO-21 as later Pis use GPIO-27. Make it work for both.
     */
    GpioMapping["RegularPi1"] = "regular-pi1";
    /**
     * Classic: Early forms of this library had this as default mapping, mostly
     * derived from the 26 GPIO-header version so that it also can work
     * on 40 Pin GPIO headers with more parallel chains.
     * Not used anymore.
     */
    GpioMapping["Classic"] = "classic";
    /**
     * Classic pin-out for Rev-A Raspberry Pi.
     */
    GpioMapping["ClassicPi1"] = "classic-pi1";
})(GpioMapping = exports.GpioMapping || (exports.GpioMapping = {}));
