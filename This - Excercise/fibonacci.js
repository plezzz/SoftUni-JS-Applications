function getFibonator() {
    let p = 0;
    let c = 1;
    return function () {
        let r = p + c;
        p = c;
        c = r;
        return p
    }
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
