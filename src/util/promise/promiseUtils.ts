import reusePromise from "reuse-promise";

export type RunCancelled = { state: "cancelled", error?: Error }
export type RunFailed = { state: "error", error: Error }
export type RunSuccess<R> = { state: "success", result: R }
type RunPromiseResult<R> = RunSuccess<R> | RunCancelled | RunFailed
export type CancellableAsync<R, T extends (...args: any) => Promise<R>> = {
    run: (...args: Parameters<T>) => Promise<RunPromiseResult<R>>
    cancel: () => void
}

export const makeCancelableAsync = <R, T extends (...args: any) => Promise<R>>(callback: T): CancellableAsync<R, T> => {
    let hasCanceled_ = false;
    const run = async (...args: Parameters<T>): Promise<RunPromiseResult<R>> => {
        try {
            const result = await callback.apply(null, args)
            if (hasCanceled_) {
                return {state: "cancelled"}
            }
            return {state: "success", result: result}
        } catch (error) {
            if (hasCanceled_) {
                return {state: "cancelled", error: error}
            }
            return {state: "error", error: error}
        }
    }
    const cancel = () => {
        hasCanceled_ = true;
    };
    return {
        run: run,
        cancel: cancel,
    };
};

export const isCancellableAsyncSuccess = <T>(obj: RunPromiseResult<T>): obj is RunSuccess<T> & { state: "success" } => {
    return obj.state === "success"
}

export const isCancellableAsyncCancelled = <T>(obj: RunPromiseResult<T>): obj is RunCancelled & { state: "cancelled" } => {
    return obj.state === "cancelled"
}

export const isCancellableAsyncError = <T>(obj: RunPromiseResult<T>): obj is RunFailed & { state: "error" } => {
    return obj.state === "error"
}

export function delayPromise(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

export function reusePromiseWrapper<A extends any[], R extends any, T extends (...args: A) => R>(promiseSourceFn: T) {
    return reusePromise(promiseSourceFn) as (...args: Parameters<T>) => ReturnType<T>
}

export const OneAtATimePromiseFacade = (() => {
    type PromiseFactory<T> = () => Promise<T>
    const create = () => {
        let oneAtATimePromiseInProgressPromise = Promise.resolve();
        const oneAtATimePromise = <T>(promiseFactory: PromiseFactory<T>, ctx: string): Promise<T> => {
            return new Promise<T>((resolve, reject) => {
                oneAtATimePromiseInProgressPromise = oneAtATimePromiseInProgressPromise.then(() => {
                    return new Promise((resolveInner, rejectInner) => {
                        promiseFactory().then((promiseFactoryResult) => {
                            resolveInner(promiseFactoryResult)
                        }).catch(rejectInner);
                    })
                }).then((value: T) => {
                    resolve(value)
                }).catch(reject)
            });
        }
        return {
            oneAtATimePromise: oneAtATimePromise
        }
    }
    return {
        create: create
    }
})()

/**
 * Method runs promises in parallel.
 * @param {Array<() => Promise<T>>} promises array of promise factories.
 * @param {number} parallel number of promises to run in parallel.
 * @returns {Promise<Array<PromiseSettledResult<T>>>} promise that resolves to an array of promise settled results.
 */
export const promiseAllSettledParallel = <T>(promises: Array<() => Promise<T>>, parallel: number): Promise<Array<PromiseSettledResult<T>>> => {
    return new Promise((resolve, reject) => {
        const results: Array<PromiseSettledResult<T>> = [];
        let promisesInProgress = 0;
        let promiseIndex = 0;
        const runNextPromise = () => {
            if (promiseIndex >= promises.length) {
                if (promisesInProgress === 0) {
                    resolve(results)
                }
                return;
            }
            const promiseFactory = promises[promiseIndex];
            promiseIndex++;
            promisesInProgress++;
            promiseFactory().then((result) => {
                results.push({status: "fulfilled", value: result})
                promisesInProgress--;
                runNextPromise();
            }).catch((error) => {
                results.push({status: "rejected", reason: error})
                promisesInProgress--;
                runNextPromise();
            })
        }
        for (let i = 0; i < parallel; i++) {
            runNextPromise();
        }
    })
}

/**
 * Method runs promises in parallel.
 * @param {Array<() => Promise<T>>} promises array of promise factories.
 * @param {number} parallel number of promises to run in parallel.
 * @returns {Promise<Array<T>>} promise that resolves to an array of promise results or rejects if any promise rejects.
 */
export const promiseAllParallel = <T>(promises: Array<() => Promise<T>>, parallel: number): Promise<Array<T>> => {
    return new Promise((resolve, reject) => {
        const results: Array<T> = [];
        let promisesInProgress = 0;
        let promiseIndex = 0;
        const runNextPromise = () => {
            if (promiseIndex >= promises.length) {
                if (promisesInProgress === 0) {
                    resolve(results)
                }
                return;
            }
            const promiseFactory = promises[promiseIndex];
            promiseIndex++;
            promisesInProgress++;
            promiseFactory().then((result) => {
                results.push(result)
                promisesInProgress--;
                runNextPromise();
            }).catch(reject)
        }
        for (let i = 0; i < parallel; i++) {
            runNextPromise();
        }
    })
}

////////////////////////////////////////////////
// Promise Executor
////////////////////////////////////////////////

type PromiseExecutor<T> = () => Promise<T>;

class PromisePool<T> {
    private activePromises: Promise<T>[] = [];

    constructor(private readonly limit: number) {}

    execute(promise: PromiseExecutor<T>): Promise<T> {
        const activePromiseCount = this.activePromises.length;
        if (activePromiseCount >= this.limit) {
            return Promise.race(this.activePromises).then(() => this.execute(promise));
        }

        const newPromise = promise();
        this.activePromises.push(newPromise);

        newPromise.finally(() => {
            const index = this.activePromises.indexOf(newPromise);
            if (index !== -1) {
                this.activePromises.splice(index, 1);
            }
        });

        return newPromise;
    }
}

export function createParallelExecutor<T>(parallelLimit: number): (promise: PromiseExecutor<T>) => Promise<T> {
    const pool = new PromisePool<T>(parallelLimit);

    return function executeParallel(promise: PromiseExecutor<T>): Promise<T> {
        return pool.execute(promise);
    };
}