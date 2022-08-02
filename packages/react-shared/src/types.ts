export type MaybeRef<T> = T | React.RefObject<T> | React.MutableRefObject<T>;

export type MaybeComputedRef<T> = T extends () => void ? never : (() => T) | MaybeRef<T>;
