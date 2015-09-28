/**
 * 
 * define logic unit
 * 
 * definUnit(name, judge)
 *      name: logic unit name
 *      judge: accept elements return boolean value
 * 
 * basic logic compose: and or not
 * 
 * 1. support compose way
 * 
 * 2. logic language (main purpose)
 * meta: & | ~ ( )
 * 
 * a & b | (c & (e | ~f))
 * =>  or(and(a, b) ,or(and(c, or(e, not(f)))))
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _expressioner = require("expressioner");

var _expressioner2 = _interopRequireDefault(_expressioner);

exports["default"] = function () {
    var logicMap = {};

    var operationMap = {
        "&": {
            priority: 10,
            opNum: 2,
            execute: function execute(name1, name2) {
                return function () {
                    for (var _len = arguments.length, y = Array(_len), _key = 0; _key < _len; _key++) {
                        y[_key] = arguments[_key];
                    }

                    console.log(name1, name2);
                    return logicMap[name1].apply(undefined, y) && logicMap[name2].apply(undefined, y);
                };
            }
        },
        "|": {
            priority: 10,
            opNum: 2,
            execute: function execute(name1, name2) {
                return function () {
                    for (var _len2 = arguments.length, y = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        y[_key2] = arguments[_key2];
                    }

                    console.log(name1, name2);
                    var fun1 = name1,
                        fun2 = names;
                    if (typeof fun1 === "string") fun1 = logicMap[name1];
                    if (typeof fun2 === "string") return logicMap[name1].apply(undefined, y) || logicMap[name2].apply(undefined, y);
                };
            }
        },
        "~": {
            priority: 40,
            opNum: 1,
            execute: function execute(name) {
                return function () {
                    for (var _len3 = arguments.length, y = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        y[_key3] = arguments[_key3];
                    }

                    return !logicMap[name].apply(undefined, y);
                };
            }
        },
        "(": {
            type: "start"
        },
        ")": {
            type: "close",
            match: "("
        }
    };

    var translator = (0, _expressioner2["default"])(operationMap);

    var defineUnit = function defineUnit(name, judge) {
        for (var opName in operationMap) {
            if (name.indexOf(opName) !== -1) {
                throw new TypeError("unexpected name, contain special symbol, like " + metalist.join(" "));
            }
        }
        if (typeof judge === "function" || judge instanceof RegExp) {
            logicMap[name] = judge;
        } else {
            throw new TypeError("unexpected type judge, expect function or RegExp instance.");
        }
    };

    var translate = function translate(str) {
        return translator(str).value;
    };

    return {
        defineUnit: defineUnit,
        translate: translate
    };
};

module.exports = exports["default"];