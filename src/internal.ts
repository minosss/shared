export const internal = Symbol.for('internal');

export function setInternal(data: any, value: any) {
    return (data[internal] = value);
}

export function getInternal<T = any>(data: any): T | undefined {
    return data[internal];
}
