"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseWithTimeout = exports.createParallelExecutor = exports.promiseAllParallel = exports.promiseAllSettledParallel = exports.OneAtATimePromiseFacade = exports.reusePromiseWrapper = exports.delayPromise = exports.isCancellableAsyncError = exports.isCancellableAsyncCancelled = exports.isCancellableAsyncSuccess = exports.makeCancelableAsync = void 0;
const reuse_promise_1 = __importDefault(require("reuse-promise"));
const makeCancelableAsync = (callback) => {
    let hasCanceled_ = false;
    const run = async (...args) => {
        try {
            const result = await callback.apply(null, args);
            if (hasCanceled_) {
                return { state: "cancelled" };
            }
            return { state: "success", result: result };
        }
        catch (error) {
            if (hasCanceled_) {
                return { state: "cancelled", error: error };
            }
            return { state: "error", error: error };
        }
    };
    const cancel = () => {
        hasCanceled_ = true;
    };
    return {
        run: run,
        cancel: cancel,
    };
};
exports.makeCancelableAsync = makeCancelableAsync;
const isCancellableAsyncSuccess = (obj) => {
    return obj.state === "success";
};
exports.isCancellableAsyncSuccess = isCancellableAsyncSuccess;
const isCancellableAsyncCancelled = (obj) => {
    return obj.state === "cancelled";
};
exports.isCancellableAsyncCancelled = isCancellableAsyncCancelled;
const isCancellableAsyncError = (obj) => {
    return obj.state === "error";
};
exports.isCancellableAsyncError = isCancellableAsyncError;
function delayPromise(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}
exports.delayPromise = delayPromise;
function reusePromiseWrapper(promiseSourceFn) {
    return (0, reuse_promise_1.default)(promiseSourceFn);
}
exports.reusePromiseWrapper = reusePromiseWrapper;
exports.OneAtATimePromiseFacade = (() => {
    const create = () => {
        let oneAtATimePromiseInProgressPromise = Promise.resolve();
        const oneAtATimePromise = (promiseFactory, ctx) => {
            return new Promise((resolve, reject) => {
                oneAtATimePromiseInProgressPromise = oneAtATimePromiseInProgressPromise.then(() => {
                    return new Promise((resolveInner, rejectInner) => {
                        promiseFactory().then((promiseFactoryResult) => {
                            resolveInner(promiseFactoryResult);
                        }).catch(rejectInner);
                    });
                }).then((value) => {
                    resolve(value);
                }).catch(reject);
            });
        };
        return {
            oneAtATimePromise: oneAtATimePromise
        };
    };
    return {
        create: create
    };
})();
/**
 * Method runs promises in parallel.
 * @param {Array<() => Promise<T>>} promises array of promise factories.
 * @param {number} parallel number of promises to run in parallel.
 * @returns {Promise<Array<PromiseSettledResult<T>>>} promise that resolves to an array of promise settled results.
 */
const promiseAllSettledParallel = (promises, parallel) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let promisesInProgress = 0;
        let promiseIndex = 0;
        const runNextPromise = () => {
            if (promiseIndex >= promises.length) {
                if (promisesInProgress === 0) {
                    resolve(results);
                }
                return;
            }
            const promiseFactory = promises[promiseIndex];
            promiseIndex++;
            promisesInProgress++;
            promiseFactory().then((result) => {
                results.push({ status: "fulfilled", value: result });
                promisesInProgress--;
                runNextPromise();
            }).catch((error) => {
                results.push({ status: "rejected", reason: error });
                promisesInProgress--;
                runNextPromise();
            });
        };
        for (let i = 0; i < parallel; i++) {
            runNextPromise();
        }
    });
};
exports.promiseAllSettledParallel = promiseAllSettledParallel;
/**
 * Method runs promises in parallel.
 * @param {Array<() => Promise<T>>} promises array of promise factories.
 * @param {number} parallel number of promises to run in parallel.
 * @returns {Promise<Array<T>>} promise that resolves to an array of promise results or rejects if any promise rejects.
 */
const promiseAllParallel = (promises, parallel) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let promisesInProgress = 0;
        let promiseIndex = 0;
        const runNextPromise = () => {
            if (promiseIndex >= promises.length) {
                if (promisesInProgress === 0) {
                    resolve(results);
                }
                return;
            }
            const promiseFactory = promises[promiseIndex];
            promiseIndex++;
            promisesInProgress++;
            promiseFactory().then((result) => {
                results.push(result);
                promisesInProgress--;
                runNextPromise();
            }).catch(reject);
        };
        for (let i = 0; i < parallel; i++) {
            runNextPromise();
        }
    });
};
exports.promiseAllParallel = promiseAllParallel;
class PromisePool {
    constructor(limit) {
        this.limit = limit;
        this.activePromises = [];
    }
    execute(promise) {
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
function createParallelExecutor(parallelLimit) {
    const pool = new PromisePool(parallelLimit);
    return function executeParallel(promise) {
        return pool.execute(promise);
    };
}
exports.createParallelExecutor = createParallelExecutor;
/**
 * @param {Promise<T>} promise Promise to wrap.
 * @param {number} timeoutMillis Timeout in milliseconds.
 * @param {any} reason Optional reason to reject the promise with if the given promise does not resolve within the given timeout.
 * @return {Promise<T>} Promise that resolves with the result of the given promise or rejects with the given (optional) reason if the given promise does not resolve within the given timeout.
 */
const promiseWithTimeout = (promise, timeoutMillis, reason) => {
    const timeout = new Promise((resolve, reject) => setTimeout(() => reject(reason || new Error(`Promise timed out after ${timeoutMillis}ms`)), timeoutMillis));
    return Promise.race([
        promise,
        timeout
    ]);
};
exports.promiseWithTimeout = promiseWithTimeout;
//# sourceMappingURL=promiseUtils.js.map