interface fnitf {
    (a: number, b: number): number
};

let fn: fnitf = (a: number, b: number): number => {
    return a + b
};

interface aitf {
    name: string,
};

interface aitf {
    age: number,
    height?: number
};

let p: aitf = {
    name: '12',
    age: 12,
    height: 12
};

interface dataift {
    a: number,
    b: number
};

interface p1itf {
    code: number,
    data: dataift[], // { a: number, b: number }[]
    message: string
};

let p1: Promise<p1itf> = new Promise((resolve) => {
    resolve({
        code: 200,
        data: [{ a: 1, b: 1 }],
        message: ""
    })
});

p1.then(res => {
    if (res.code == 200) { }
    res.data.map(a => a.a)
});

