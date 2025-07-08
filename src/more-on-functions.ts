// 함수 타입 표현식
type GreetFunction = (a: string) => void;

function greeter(fn: GreetFunction) {
    fn("Hello, world");
}

function printToConsole(s: string) {
    console.log(s);
}

greeter(printToConsole);

// 호출 시그니처

type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
}

function doSomething(fn: DescribableFunction) {
    console.log(fn.description + ' returned' + fn(6));
}

// Construct 시그니처

// type SomeConstructor = {
//     new (s: string): SomeObject;
// }

// function fn(ctor: SomeConstructor) {
//     return new ctor('hello');
// }

// Date 객체는 두 가지 특성을 다 가지고 있음
interface CallOrConstruct {
    (n?: number): string;
    new (s: string): Date;
}

function fn(ctor: CallOrConstruct) {
    console.log(ctor(10));

    console.log(new ctor('10'));
}

fn(Date);

// Generic 함수
// 타입을 특정하지 않아도 추론됨

// function firstElement(arr: any[]) {
//     return arr[0];
// }

function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}

const s = firstElement(['a', 'b', 'c']);
const n = firstElement([1, 2, 3]);
const u = firstElement([]);

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}

const parsed = map(['1', '2', '3'], (n) => parseInt(n));

const numbers = [1, 2, 3, 4];
const increment = (n: number) => n + 1;

const incremented = map(numbers, increment);

// 타입 제한 조건
function longest<Type extends { length: number}>(a: Type, b: Type) {
    return a.length >= b.length ? a : b;
}

const longerArray = longest([1, 2], [2, 3, 4]);
const longerString = longest("Alice", "Bob");

function minimumLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
    if (obj.length >= minimum) {
        return obj;
    } else {
        // return {length: minimum};
        return obj;
    }
}

// 타입 인수를 명시하기
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}

// 이걸 의도했다면, 타입 수동으로 명시하기
const arr = combine<string | number>([1, 2, 3], ["hello"]);

// 가능하다면, 타입 매개변수를 제약하기보다는 타입 매개변수 그 자체를 사용하기

// good
function firstElement1<Type>(arr: Type[]) {
    return arr[0];
}

// bad
function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0];
}

const a = firstElement1([1, 2, 3]); // number - good
const b = firstElement2([1, 2, 3]); // any - bad


// 가능한 타입 매개변수는 적게 사용하기
function filter1<Type>(arr: Type[], func: (value: Type) => boolean): Type[] {
    return arr.filter(func);
}

// 불필요한 타입 매개변수 Func 사용으로 이해하기만 어려워질 뿐
function filter2<Type, Func extends (value: Type) => boolean>(arr: Type[], func: Func): Type[] {
    return arr.filter(func);
}

// 타입 매개변수는 두 번 나타나야 한다
function greet<Str extends string>(s: Str) {
    console.log("Hello, " + s);
}

greet("world");

function greetBetter(s: string) {
    console.log("Hello, " + s);
}

greetBetter("world");


f(190);
f();
f(undefined);

function f(n = 10) {
    console.log(n.toFixed());
}
