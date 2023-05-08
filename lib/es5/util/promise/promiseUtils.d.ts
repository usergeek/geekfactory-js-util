export type RunCancelled = {
    state: "cancelled";
    error?: Error;
};
export type RunFailed = {
    state: "error";
    error: Error;
};
export type RunSuccess<R> = {
    state: "success";
    result: R;
};
type RunPromiseResult<R> = RunSuccess<R> | RunCancelled | RunFailed;
export type CancellableAsync<R, T extends (...args: any) => Promise<R>> = {
    run: (...args: Parameters<T>) => Promise<RunPromiseResult<R>>;
    cancel: () => void;
};
export declare const makeCancelableAsync: <R, T extends (...args: any) => Promise<R>>(callback: T) => CancellableAsync<R, T>;
export declare const isCancellableAsyncSuccess: <T>(obj: RunPromiseResult<T>) => obj is RunSuccess<T> & {
    state: "success";
};
export declare const isCancellableAsyncCancelled: <T>(obj: RunPromiseResult<T>) => obj is RunCancelled & {
    state: "cancelled";
};
export declare const isCancellableAsyncError: <T>(obj: RunPromiseResult<T>) => obj is RunFailed & {
    state: "error";
};
export declare function delayPromise(duration: any): Promise<unknown>;
export declare function reusePromiseWrapper<A extends any[], R extends any, T extends (...args: A) => R>(promiseSourceFn: T): (...args: Parameters<T>) => ReturnType<T>;
export declare const OneAtATimePromiseFacade: {
    create: () => {
        oneAtATimePromise: <T>(promiseFactory: () => Promise<T>, ctx: string) => Promise<T>;
    };
};
/**
 * Method runs promises in parallel.
 * @param {Array<() => Promise<T>>} promises array of promise factories.
 * @param {number} parallel number of promises to run in parallel.
 * @returns {Promise<Array<PromiseSettledResult<T>>>} promise that resolves to an array of promise settled results.
 */
export declare const promiseAllSettledParallel: <T>(promises: (() => Promise<T>)[], parallel: number) => Promise<PromiseSettledResult<T>[]>;
/**
 * Method runs promises in parallel.
 * @param {Array<() => Promise<T>>} promises array of promise factories.
 * @param {number} parallel number of promises to run in parallel.
 * @returns {Promise<Array<T>>} promise that resolves to an array of promise results or rejects if any promise rejects.
 */
export declare const promiseAllParallel: <T>(promises: (() => Promise<T>)[], parallel: number) => Promise<T[]>;
type PromiseExecutor<T> = () => Promise<T>;
export declare function createParallelExecutor<T>(parallelLimit: number): (promise: PromiseExecutor<T>) => Promise<T>;
/**
 * @param {Promise<T>} promise Promise to wrap.
 * @param {number} timeoutMillis Timeout in milliseconds.
 * @param {any} reason Optional reason to reject the promise with if the given promise does not resolve within the given timeout.
 * @return {Promise<T>} Promise that resolves with the result of the given promise or rejects with the given (optional) reason if the given promise does not resolve within the given timeout.
 */
export declare const promiseWithTimeout: <T>(promise: Promise<T>, timeoutMillis: number, reason?: any) => Promise<T>;
export {};
