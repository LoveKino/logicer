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
import ast from "expressioner";

export default () => {
    let logicMap = {};

    var operationMap = {
        "&": {
            priority: 10,
            opNum: 2,
            execute: (name1, name2) => (...y) => {
                console.log(name1, name2);
                return logicMap[name1].apply(undefined, y) &&
                    logicMap[name2].apply(undefined, y)
            }
        },
        "|": {
            priority: 10,
            opNum: 2,
            execute: (name1, name2) => (...y) => {
                console.log(name1, name2);
                let fun1 = name1, fun2 = names;
                if(typeof fun1 === "string") fun1 = logicMap[name1];
                if(typeof fun2 === "string")
                return logicMap[name1].apply(undefined, y) ||
                    logicMap[name2].apply(undefined, y)
            }
        },
        "~": {
            priority: 40,
            opNum: 1,
            execute: (name) => (...y) =>
                !logicMap[name].apply(undefined, y)
        },
        "(": {
            type: "start"
        },
        ")": {
            type: "close",
            match: "("
        }
    }

    var translator = ast(operationMap);

    var defineUnit = (name, judge) => {
        for (let opName in operationMap) {
            if (name.indexOf(opName) !== -1) {
                throw new TypeError("unexpected name, contain special symbol, like " +
                    metalist.join(" "));
            }
        }
        if (typeof judge === "function" || judge instanceof RegExp) {
            logicMap[name] = judge;
        } else {
            throw new TypeError("unexpected type judge, expect function or RegExp instance.");
        }
    }

    var translate = (str) => translator(str).value;

    return {
        defineUnit,
        translate
    }
}