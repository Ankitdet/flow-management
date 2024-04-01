export const Pick = <T, K extends keyof T>(Class: new () => T, keys: K[]): new () => Pick<T, (typeof keys)[number]> =>
    Class
