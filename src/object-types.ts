interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

// strictNullChecks 옵션이 활성화되어 있으면, 옵셔널 값들은 undefined의 가능성이 있다고 얘기해준다.
function paintShape(opts: PaintOptions) {
    // ...
    let xPos = opts.xPos; // number | undefined

    let xPos2 = opts.xPos === undefined ? 0 : opts.xPos;
}

// js에서 지원하는 default 값을 쓸 수도 있다.
function paintShape2({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos);
    console.log(shape);
}

// const shape = getShape();

// 이건 오류난다. js의 구조분해 문법에서 객체에서 shape를 꺼내 Shape에 할당한다는 뜻이기 때문
// function draw({ shape: Shape, xPos: number = 0, yPos: number = 0 }) {
//     console.log(shape);
// }

// readonly
interface SomeType {
    readonly prop: string;
}

function doSomething(obj: SomeType) {
    // can read from obj
    console.log(obj.prop);

    // can't re-assign it
    // because it is a read-only property.
    // obj.prop = "";
}

interface Home {
    readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
    console.log(`happy birthday ${home.resident.name}`);

    // We can update properties from 'home.resident'
    // readonly읜 객체의 내부 프로퍼티는 업데이트할 수 있다.
    home.resident.age++;
}

function evict(home: Home) {
    // But we can't write to the 'resident' property itself on a 'Home'
    // home.resident = {
    //     name: 'SH',
    //     age: 14,
    // };
}

interface Person {
    name: string;
    age: number;
}

interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}

let writablePerson: Person = {
    name: 'sh',
    age: 14,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

// works
readonlyPerson = {
    name: '',
    age: 123,
}
// 구조적 타입 시스템 때문에 호환됨
// readonly는 타입 호환성 검사에서 무시됨


console.log(readonlyPerson.age); // 123
writablePerson.age++;
console.log(readonlyPerson.age); // 124

// Index Signatures(인덱스 시그니처)
// 객체의 모든 프로퍼티의 이름은 모르지만, 타입은 확실히 알 때

// In those cases you can use an index signature 
// to describe the types of possible values

interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = {
    1: ''
};

const abc: string = myArray[0]; // string

// index signature의 property로 string, number, symbol, 
// 템플릿 string pattern, 이들 중 union된 타입 사용 가능

// number, string 타입의 인덱서를 사용할 때
// number 타입의 인덱서의 반환값은 string 타입의 인덱서 반환값의 subtype이어야 한다.
// 자바스크립트는 arr[0]에서 인덱싱하기 전에 0을 문자열 '0'으로 변환해서 처리하기 때문이다.

// That means that indexing with 100 (a number) is the same thing 
// as indexing with "100" (a string), so the two need to be consistent.

interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
interface NotOkay {
    // [x: number]: Animal;
    [x: string]: Dog;
}

interface NumberDictionary {
    [index: string]: number;
    length: number;
    // name: string; // Error
    // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}

interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
}

// Finally, you can make index signatures readonly in order to prevent assignment to their indices:
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

// let myArray: ReadonlyStringArray = getReadOnlyStringArray();
// myArray[2] = "Mallory";
// Index signature in type 'ReadonlyStringArray' only permits reading.
// You can’t set myArray[2] because the index signature is readonly.

// 초과 프로퍼티 검사
// Where and how an object is assigned a type can make a difference in the type system. 

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
    return {
        color: config.color || 'red',
        area: config.width ? config.width * config.width : 20,
    };
}

// Object literal may only specify known properties, 
// but 'colour' does not exist in type 'SquareConfig'. 
// Did you mean to write 'color'?
// let mySquare: SquareConfig = createSquare({ colour: 'green', width: 10 });

// 어떤 사람은 이렇게 말할 수도 있습니다:
// “어차피 width 속성은 타입이 맞고, color 속성은 아예 없으며, colour는 그냥 쓸모없는 속성일 뿐이잖아.
// 그러니까 타입상으로도 문제 없지 않나?”

// 하지만 타입스크립트는 객체 리터럴을 변수에 할당하거나, 함수의 인자로 전달할 때 초과프로퍼티 검사를 한다.
// 대상 타입에 없는 속성이 포함되어 있으면 에러 발생 시킴

// 초과프로퍼티 검사를 피할 수 있는 가장 쉬운 방법은 타입 단언(Tyep Assertion)이다.
let mySqaure = createSquare({ color: 'blue', opacity: 0.5 } as SquareConfig);

// 하지만 어떤 객체가 추가적인 프로퍼티를 가질 수 있는 확신이 있다면, 
// 문자열 인덱스 시그니처를 추가하는 것이 더 좋은 방법일 듯

interface SquareConfig2 {
    color?: string;
    width?: number;
    [propName: string]: unknown;
}

// One final way to get around these checks, which might be a bit surprising, 
// is to assign the object to another variable: 
// Since assigning squareOptions won’t undergo excess property checks, 
// the compiler won’t give you an error:

// 우회하는 또 최후의 방법은 다른 변수에 객체를 할당하는 것
// 그럼 초과프로퍼티 검사를 하지 않는다.

let squareOptions = { colour: 'red', width: 20 };
let square = createSquare(squareOptions); // ok


// 대신 common property가 하나라도 있어야 한다.

// Keep in mind that for simple code like above, 
// you probably shouldn’t be trying to “get around” these checks. 
// For more complex object literals that have methods and hold state, 
// you might need to keep these techniques in mind, but a majority of excess property errors are actually bugs.

// 웬만하면 초과 프로퍼티 검사를 피하진 말자 -> 에러 발생 가능성 높음

// Extending Types (타입 확장하기)

interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

// 유닛 있는 경우 이렇게 될 수도 있음
// interface AddressWithUnit {
//     name?: string;
//     unit: string;
//     street: string;
//     city: string;
//     country: string;
//     postalCode: string;
// }

// 이거 대신 확장을 이용하자
interface AddressWithUnit extends BasicAddress {
    unit: string;
}

// 인터페이스는 다중 상속도 가능하다.

interface Colorful {
    color: string;
}

interface Circle2 {
    radius: number;
}

interface ColorfulCircle extends Colorful, Circle2 { }

const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
};

// Intersection Types (교집합 타입)

// interfaces allowed us to build up new types from other types by extending them. 
// TypeScript provides another construct called intersection types 
// that is mainly used to combine existing object types.
// An intersection type is defined using the & operator.

interface Colorful3 {
    color: string;
}

interface Circle3 {
    radius: number;
}

type ColorfulCircle3 = Colorful3 & Circle3;

function draw(circle: Colorful3 & Circle3) {
    console.log(circle.color);
    console.log(circle.radius);
}

draw({ color: 'blue', radius: 19 }); // okay
// draw({ color: 'green' }); // oops

// Interface Extension vs. Intersection

interface Person1 {
    name: string;
}

interface Person2 {
    name: number;
}

type Staff = Person1 & Person2;

declare const staffer: Staff;
staffer.name; // (property) name : never

// Generic Object Types
interface Box2 {
    contents: any; // works, but can lead to accidents down the line.
}

// We could instead use unknown
interface Box {
    contents: unknown;
}

let box: Box = {
    contents: 'hello'
};

// box.contents.toLowerCase(); // Error 
if (typeof box.contents === 'string') {
    box.contents.toLowerCase(); // okay
}

// or use type assertion
console.log((box.contents as string).toLowerCase());

// One type safe approach would be to instead scaffold out different Box types for every type of contents.
interface NumberBox {
    contents: number;
}

interface StringBox {
    contents: string;
}

interface BooleanBox {
    contents: boolean;
}

// But that means we’ll have to create different functions, 
// or overloads of functions, to operate on these types.
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: StringBox, newContents: boolean): void;

function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents;
}

// That’s a lot of boilerplate.
// Instead, we can make a generic Box type which declares a type parameter.
interface GenericBox<Type> {
    contents: Type;
}

let genericBox: GenericBox<string> = {
    contents: '1',
};

// Box를 실제 타입을 위한 템플릿으로 생각해 보세요.
// 여기서 Type은 나중에 다른 타입으로 대체될 자리표시자(placeholder) 역할을 합니다.
// TypeScript가 Box<string>을 만나면,
// Box<Type> 안의 모든 Type을 string으로 바꿔서,
// 결과적으로 { contents: string }과 같은 타입으로 처리합니다.
// 다시 말해, Box<string>은 이전에 만들었던 StringBox와 동일하게 동작합니다.

interface BBox<Type> {
    contents: Type;
}

interface StringBBox {
    contents: string;
}

let boxA: BBox<string> = { contents: 'hello' };
boxA.contents; // BBox<string>.contents: string

let boxB: StringBBox = { contents: 'hi' };
boxB.contents; // StringBBox.contents: string

interface Apple {
    year: number;
}

// Same as '{ contents: Apple }'. 
// BBox<Apple>.contents: Apple
const appleBox: BBox<Apple> = {
    contents: {
        year: 1,
    },
}

function setContents2<Type>(box: BBox<Type>, newContents: Type) {
    box.contents = newContents;
}

// type alias로도 Generic 가능
type BoxType<Type> = {
    contents: Type;
}

// Since type aliases, unlike interfaces, can describe more than just object types, 
// we can also use them to write other kinds of generic helper types.

type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = Type | Type[] | null;
// type OneOrManyOrNull<Type> = Type | Type[] | null

type OneOrManyOrNullString = OneOrManyOrNull<string>;
// type OneOrManyOrNullString = string | string[] | null
// type OneOrManyOrNullStrings = OneOrMany<string> | null

// 제네릭 객체 타입은 종종 그 안에 담긴 요소의 타입과는 독립적으로 동작하는 일종의 컨테이너 타입입니다.
// 이런 방식으로 데이터 구조를 설계하면, 다양한 데이터 타입에 대해 재사용하기에 이상적입니다.
// 사실 이 핸드북 전체를 통해 우리가 다뤄온 타입이 바로 그런 타입인데요: 바로 Array 타입입니다.
// number[]나 string[]처럼 타입을 쓸 때, 이는 사실 Array<number>나 Array<string>의 축약형에 불과합니다.

function doSomething2(value: Array<string>) {
    // ...
}

let myArray2: string[] = ["hello", "world"];

// either of these work
doSomething2(myArray2);
doSomething2(new Array("hello", "world"));

interface Array2<Type> {
    length: number;

    pop(): Type | undefined;

    push(...items: Type[]): number;
}

function doStuff(values: ReadonlyArray<string>) {
    const copy = values.slice();
    console.log(copy[0]); // we can read

    // ...but we can't mutate 'values'.
    // values.push('123'); 
}

// shorthand syntax
function doStuff2(values: readonly string[]) {
    const copy = values.slice(); // can read
    // values.push('123'); // can't mutate 'values'
}

// 객체와 달리 readonly array는 일반 배열에 할당할 수 없음
let xArr: readonly string[] = [];
let yArr: string[] = [];

xArr = yArr; // 일반 배열을 readonly 배열에 할당하는 것은 가능함
// yArr = xArr; // Error

// Tuples
type StringNumberPair = [string, number];

function doSomething3(pair: [string, number]) {
    const a = pair[0]; // const a: string

    const b = pair[1]; // const b: number
}

doSomething3(['hello', 1]);

// destructure 가능
function doSomething4(stringHash: [string, number]) {
    // 튜플을 구조 분해(destructuring)할 때, 변수 이름을 자유롭게 정할 수 있는 유연성을 제공
    const [inputString, hash] = stringHash;
    console.log(inputString); // string
    console.log(hash); // number
}

interface StringNumberPairEquivalent {
    length: 2;
    0: string;
    1: number;

    slice(start?: number, ends?: number): Array<string | number>;
}

// Optional tuple
type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
    const [x, y, z] = coord;
    console.log(z); // number | undefined
    console.log(coord.length); // length: 2 | 3
}

// Tuples can also have rest elements, which have to be an array/tuple type.

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

const a2: StringNumberBooleans = ['hello', 1];
const b2: StringNumberBooleans = ['hello', 1, true];
const c2: StringNumberBooleans = ['hello', 1, false, true, true];

function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args;
    // ...
}

function readButtonInputEquivalent(name: string, version: number, ...input: boolean[]) {
    console.log(name, version, input);
}

// readonly Tuple Types
function doSomething5(pair: readonly [string, number]) {
    // ...
    // pair[0] = '1'; // Error
}

// 튜플은 대부분의 코드에서 생성된 후 수정되지 않고 그대로 사용되기 때문에,
// 가능하다면 튜플 타입에 readonly를 붙이는 것이 좋은 기본값(기본 전략)이 됩니다.
// 또한, const 단언이 붙은 배열 리터럴은 TypeScript에서 readonly 튜플 타입으로 추론되기 때문에,
// 이 점 역시 중요하게 고려해야 합니다.

let point = [3, 4] as const; // point: readonly [3, 4]

function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2);
}

// distanceFromOrigin(point);
// Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
// The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.

