/** 
 * 타입과 인터페이스
 */

interface Animal {
    name: string;
}

interface Bear extends Animal {
    honey: boolean;
}

// const bear = getBear();


type Animal2 = {
    name: string;
}

type Bear2 = Animal2 & {
    honey: boolean;
}

// const bear2 = getBear2();

// 새 필드 추가
interface Window {
    title: string;
}

interface Window {
    ts: string;
}

// 타입 단언
// 타입스크립트보다 타입에 대해 내가 더 잘 알 때 사용
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.getElementById('main_canvas');

const x = 'hello' as string;

// const a = (expr as any) as T;

let changingString = "Hello World";
changingString = "Olá Mundo";
// 변수 `changingString`은 어떤 문자열이든 모두 나타낼 수 있으며,
// 이는 TypeScript의 타입 시스템에서 문자열 타입 변수를 다루는 방식과 동일합니다.
changingString;
      
let changingString2: string
 
const constantString = "Hello World";
// 변수 `constantString`은 오직 단 한 종류의 문자열만 나타낼 수 있으며,
// 이는 리터럴 타입의 표현 방식입니다.
constantString;

// 리터럴은 유니온과 함께 쓸 때 유용하다
function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b? 0 : a > b ? 1 : -1;
}

// 리터럴이 아닌 타입과 사용하기
interface Options {
    width: number;
}

function configure(x: Options | 'auto') {

}

configure({width: 100});
configure('auto');
// configure('automatic'); // Error

// 리터럴 추론
const obj = { counter: 0 }; // counter의 값은 number로 추론된다.
if (true) {
    obj.counter = 1; // 그래서 이후 수정 가능
}

// string에서도 마찬가지
const req = { url: 'https://example.com', method: 'GET' } as const;

type RequestMethod = 'GET' | 'POST';

function handleRequest(url: string, method: RequestMethod) {

}

// handleRequest(req.url, req.method); // Error string =x> RequestMethod
handleRequest(req.url, req.method);

// as const 접미사는 일반적인 const와 유사하게 작동하는데, 
// 해당 객체의 모든 프로퍼티에 string 또는 number와 같은 보다 일반적인 타입이 아닌 리터럴 타입의 값이 대입되도록 보장합니다.

// not null 단언 연산자 (!)는 반드시 해당 값이 null or undefined가 아닐 때만 쓰기
// 코드의 런타임 동작을 변화시키지 않기 때문

