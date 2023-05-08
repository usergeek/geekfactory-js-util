import {promiseAllParallel, promiseAllSettledParallel, promiseWithTimeout, delayPromise} from "./promiseUtils";

const createTestPromises = (minNumberOfPromises: number, maxNumberOfPromises: number) => {
    const promises: Array<() => Promise<string>> = []
    const numberOfPromises = Math.floor(Math.random() * (maxNumberOfPromises - minNumberOfPromises + 1)) + minNumberOfPromises
    for (let i = 0; i < numberOfPromises; i++) {
        promises.push(() => new Promise((resolve, reject) => {
            const randomBoolean = Math.random() >= 0.7
            const randomSeconds = Math.floor(Math.random() * 2) + 1
            console.log("starting promise " + i, "randomSeconds", randomSeconds, new Date().toISOString());
            setTimeout(() => {
                if (randomBoolean) {
                    console.log("resolving promise " + i, new Date().toISOString());
                    resolve('peanut butter_' + i + '_' + Math.random())
                } else {
                    console.log("rejecting promise " + i, new Date().toISOString());
                    reject('error_' + i + '_' + Math.random())
                }
            }, randomSeconds * 1000)
        }))
    }
    return promises
}

describe("PromiseUtils", () => {
    it("promiseAllSettledParallel", async () => {
        const testPromises = createTestPromises(2, 10);
        return promiseAllSettledParallel(testPromises, 2).then(data => {
            console.log("RESULT", data, new Date().toISOString())
            expect(data).toBe('peanut butter');
        });
    }, 20000)

    it("promiseAllParallel", async () => {
        const testPromises = createTestPromises(2, 10);
        return promiseAllParallel(testPromises, 4).then(data => {
            console.log("RESULT", data, new Date().toISOString())
            expect(data).toBe('peanut butter');
        });
    }, 20000)

    describe("promiseWithTimeout", () => {
        it("promiseWithTimeout resolve", async () => {
            const testPromise = new Promise((resolve, reject) => {
                delayPromise(500).then(() => {
                    resolve('peanut butter');
                })
            });
            const timeoutMillis = 1000
            return promiseWithTimeout(testPromise, timeoutMillis).then(data => {
                console.log("RESULT", data, new Date().toISOString())
                expect(data).toBe('peanut butter');
            });
        }, 20000)

        it("promiseWithTimeout timeout", async () => {
            const testPromise = new Promise((resolve, reject) => {
                delayPromise(1500).then(() => {
                    resolve('peanut butter');
                })
            });
            return promiseWithTimeout(testPromise, 1000).catch(error => {
                console.log("ERROR", error, new Date().toISOString())
                expect(error).toEqual(new Error("Promise timed out after 1000ms"));
            })
        }, 20000)

        it("promiseWithTimeout timeout custom", async () => {
            const testPromise = new Promise((resolve, reject) => {
                delayPromise(1500).then(() => {
                    resolve('peanut butter');
                })
            });
            return promiseWithTimeout(testPromise, 1000, new Error("timeout!")).catch(error => {
                console.log("ERROR", error, new Date().toISOString())
                expect(error).toEqual(new Error("timeout!"));
            })
        }, 20000)
    })

})