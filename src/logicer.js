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

var getOperationMap = logicMap => {
    return {
        "&": {
            priority: 10,
            opNum: 2,
            execute: (name1, name2) => (...y) => {
                let fun1 = name1,
                    fun2 = name2;
                if (typeof fun1 === "string") fun1 = logicMap[name1];
                if (typeof fun2 === "string") fun2 = logicMap[name2];
                return fun1.apply(undefined, y) && fun2.apply(undefined, y);
            }
        },
        "|": {
            priority: 10,
            opNum: 2,
            execute: (name1, name2) => (...y) => {
                let fun1 = name1,
                    fun2 = name2;
                if (typeof fun1 === "string") fun1 = logicMap[name1];
                if (typeof fun2 === "string") fun2 = logicMap[name2];
                return fun1.apply(undefined, y) || fun2.apply(undefined, y);
            }
        },
        "~": {
            priority: 40,
            opNum: 1,
            execute: (name) => (...y) => {
                let fun = name;
                if (typeof fun === "string") fun = logicMap[name];
                return !fun.apply(undefined, y);
            }
        },
        "(": {
            type: "start"
        },
        ")": {
            type: "close",
            match: "("
        }
    }
}

var defineUnit = (name, judge, logicMap, operationMap) => {
    for (let opName in operationMap) {
        if (name.indexOf(opName) !== -1) {
            throw new TypeError("unexpected name, contain special symbol '" + opName + "' in " + name);
        }
    }
    if (typeof judge === "function" || judge instanceof RegExp) {
        logicMap[name] = judge;
    } else {
        throw new TypeError("unexpected type judge, expect function or RegExp instance.");
    }
}

export default (setMap = {}, cacheMax = 10000) => {
    if (!setMap || typeof setMap !== "object")
        throw new TypeError("accept object only.");

    let logicMap = {},
        cacheMap = {},
        counter = 0;
    for (let name in setMap) {
        defineUnit(name, setMap[name], logicMap, operationMap);
    }

    var operationMap = getOperationMap(logicMap);

    var translator = ast(operationMap);

    var translate = (str) => {
        if (cacheMap.hasOwnProperty(str)) {
            return cacheMap[str];
        }
        let value = translator(str).value;
        if (typeof value === "string")
            value = logicMap[value];
        if (counter < cacheMax) {
            cacheMap[str] = value;
            counter++;
        }
        return value;
    }

    return {
        translate
    }
}