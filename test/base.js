import logic from "../index.js";
import assert from "assert";

describe("base", () => {
    it("base", () => {
        let logicCom = logic();
        logicCom.defineUnit("test1", () => true);
        logicCom.defineUnit("test2", () => false);

        let newF1 = logicCom.translate("test1 | test2");
        let newF2 = logicCom.translate("test1 & test2");
        let newF3 = logicCom.translate("~test2");
        assert(newF1() === true, true);
        assert(newF2() === false, true);
        assert(newF3() === true, true);
    });

    it("blanket", () => {
        let logicCom = logic();
        logicCom.defineUnit("a", a => false);
        logicCom.defineUnit("b", a => false);
        logicCom.defineUnit("c", a => !!a);

        let strOrNum = logicCom.translate("a | b & ~c");

        assert(strOrNum(10) === true, false);
    });
});