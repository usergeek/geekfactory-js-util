"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneAtATimePromiseFacade = exports.reusePromiseWrapper = exports.delayPromise = exports.isCancellableAsyncError = exports.isCancellableAsyncCancelled = exports.isCancellableAsyncSuccess = exports.makeCancelableAsync = void 0;
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
//# sourceMappingURL=promiseUtils.js.map