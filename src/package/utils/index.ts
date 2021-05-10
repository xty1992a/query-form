export const isFn = (obj: any) => typeof obj === 'function';

interface ToKeys<Obj = { [key: string]: any }, T = ''> {
  (obj: Obj, replacer?: T): { [key in keyof Obj]: T }
}

// 将{a: 1, b: boolean, c: [1]}转为{a:'',b:'',c:''}
export const toKeys: ToKeys = (obj, replacer) => JSON.parse(JSON.stringify(obj), (k, v) => k ? replacer : v);
