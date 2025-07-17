type Fish = {
    swim: () => void;
}

type Bird = {
    fly: () => void;
}

type Human = {
    swim?: () => void;
    fly?: () => void
}

function move(animal: Fish | Bird) {
    if ('swim' in animal) {
        return animal.swim();
    }

    return animal.fly();
}

function move2(animal: Fish | Bird | Human) {
    if ('swim' in animal) {
        // animal : Fish | Human
    }
    // animal : Bird | Human
}

function logValue(x: Date | string) {

    if (x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        x.toUpperCase();
    }
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

interface ShapeBefore {
    kind: 'circle' | 'square';
    radius?: number;
    sideLength?: number;
}


interface Circle {
    kind: 'circle';
    radius: number;
}

interface Square {
    kind: 'square';
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    }

    return shape.sideLength ** 2;
}

function getArea2(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        // 모든 경우를 처리하지 않았을 때 발생하는 에러를 방지하기 위해 사용
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}