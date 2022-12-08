type ToStringFunction = <T>(x: T) => string;
type ConstantStringFunction = () => string;

//our initial logic is "String", it executes for values that are not divisible by 3 or 5
//for values that are divisible we ignore the number x and return appropriate string
type FooBarLogic = ToStringFunction | ConstantStringFunction;

//we base our solution on a state machine that works with functions, we pass our initial logic through two transforms
type FooBarTransform = (logic: FooBarLogic) => FooBarLogic;

const foobar = (x: number): string => {
    //if logic has not been transformed and remains ToStringF - change it to ConstantStringF
    //if logic has been transformed - create a ConstantStringF by concatenating prev and curr return values
    const fooTransform: FooBarTransform = logic => (x % 3 === 0) ? (() => logic('') + 'foo') : logic;
    const barTransform: FooBarTransform = logic => (x % 5 === 0) ? (() => logic('') + 'bar') : logic;

    const initialLogic = String;
    const resultLogic = barTransform(fooTransform(initialLogic));
    return resultLogic(x)
}

const rangeTo = (to: number) => Array(100).fill(0).map((_, i) => i)

rangeTo(100).forEach(i => console.log(foobar(i)))

