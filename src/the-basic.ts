function printId(id: number | string) {
    if (typeof id === 'string') {
        id.toUpperCase();
    } else {
        id.toFixed();
    }
}

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        console.log(`Hello, ${x.join(' and ')}`);
    } else {
        console.log(`Welcome, ${x}`);
    }

    return x.slice(0, 3);
}

welcomePeople(['John', 'Jane', 'Jim']);
welcomePeople('John');

type A = number | string;
type B = string | string[];
type C = A | B;

let c: C = ['hello'];

type X = {
    name: string;
    age: number;
}

type Y = {
    name: string;
    color: string[];
}

type Z = X | Y;

let z: Z = {
    name: '123',
    color: ['123'],
};