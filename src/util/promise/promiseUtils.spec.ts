import {promiseAllParallel, promiseAllSettledParallel} from "./promiseUtils";

const createTestPromises = (minNumberOfPromises: number, maxNumberOfPromises: number) => {
    const promises: Array<() => Promise<string>> = []
    const numberOfPromises = Math.floor(Math.random() * (maxNumberOfPromises - minNumberOfPromises + 1)) + minNumberOfPromises
    console.log("will create", numberOfPromises, "promises", new Date().toISOString());
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
        console.log("will create test promises", new Date().toISOString())
        let testPromises = createTestPromises(2, 10);
        console.log("test promises created", testPromises, new Date().toISOString())
        // await delayPromise(3000)
        return promiseAllSettledParallel(testPromises, 2).then(data => {
            console.log("RESULT", data, new Date().toISOString())
            expect(data).toBe('peanut butter');
        });
    }, 20000)

    it("promiseAllParallel", async () => {
        console.log("will create test promises", new Date().toISOString())
        let testPromises = createTestPromises(2, 10);
        console.log("test promises created", testPromises, new Date().toISOString())
        // await delayPromise(3000)
        return promiseAllParallel(testPromises, 4).then(data => {
            console.log("RESULT", data, new Date().toISOString())
            expect(data).toBe('peanut butter');
        });
    }, 20000)
})