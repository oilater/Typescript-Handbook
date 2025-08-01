// 인수를 그대로 반환하는 identity 함수

// any를 사용하면 어떤 타입이든 받을 수 있지만, 반환할 때 어떤 타입을 반환하는 지에 대한 정보를 잃게 된다.
function identity2(arg: any): any {
    return arg;
}

// 제네릭을 통해서 인수의 타입을 캡쳐할 수 있다.
function identity<Type>(arg: Type): Type {
    return arg;
}

let output = identity<string>("Hello");

// 근데 만약 length에 접근하면?
// function identity3<Type>(arg: Type): Type {
//    return arg.length; // Error: Type에는 length가 없습니다.
// }

function loggingIdentity<Type>(arg: Type[]): Type[] {
    console.log(arg.length); // Ok
    return arg;
}

// Generic Types
let myIdentity: <Type>(arg: Type) => Type = identity; // Ok

// 다른 이름도 사용 가능
let myIdentity2: <Input>(arg: Input) => Input = identity; // Ok

// 함수 호출 시그니처로도 사용 가능
let myIdentity3: { <Type>(arg: Type): Type } = identity;

// 제네릭 인터페이스를 만들어보자
interface GenericInterfaceFn {
    <Type>(arg: Type): Type;
}

let myIdentity4: GenericInterfaceFn = identity;

// 매개변수 타입 위로 옮겨도 됨
interface GenericInterfaceFn2<Type> {
    (arg: Type): Type;
}

let myIdentity5: GenericInterfaceFn2<string> = identity;

// Generic Class
// class GenericNumber<NumType> {
//     zeroValue: NumType;
//     add: (x: NumType, y: NumType) => NumType;
// }

// let my = new GenericNumber<number>();

// Generic Constraints
function loggingIdentity2<Type>(arg: Type): Type {
    // console.log(arg.length); // Error
    return arg;
}

interface Lengthwise {
    length: number;
}

function loggingIdentity3<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}

// loggingIdentity3(3); // Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
loggingIdentity3({ length: 1, value: 3 }); // Ok

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key): Type[Key] {
    return obj[key];
}

let x2 = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x2, 'a'); // Ok
// getProperty(x2, 'e'); // Argument of type '"e"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.


// Using Class Types in Generics
function create<Type>(c: { new(): Type }): Type {
    return new c();
}