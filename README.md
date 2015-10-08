## Logicer

Logic computation is common. This module just try to make logic expresion simpler. It's try to do something like this:

```
var isOk = function(a, b, c){
    return (isGood(a, b, c) && isSimple(a, b, c)) || isTest(a, b , c)
}

=>

let logicCom = logicer({
    isGood,
    isSimple,
    isTest
});

let isOk = logicCom.translate("(isGood & isSimple) | isTest");
```

## Install

`npm install logicer`

## Usage

- import library

```
var logicer = require("logicer");
```

- define basic logic unit

```
let logicCom = logicer({
    "isA": function(x){},
    "isB": function(x){}
})
```

- translate logic expression, got a function

```
let isOk = logicCom.translate("isA | isB");
```

- use result

```
isOk("a")
```

## License

MIT