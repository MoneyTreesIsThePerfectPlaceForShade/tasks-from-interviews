/**
 * Самописная реализация Promise.any.
 */
function customPromiseAny<T>(
    promises: Promise<T>[]
): Promise<T> {
    return new Promise((resolve, reject) => {
        let totalRejects = 0;
        
        for (let i = 0; i < promises.length; i++) {
            const currentPromise = Promise.resolve(promises[i]);
            currentPromise
                .then(value => {
                    resolve(value);
                })
                .catch(() => {
                    totalRejects++;
                    if (totalRejects === promises.length) {
                        reject('All promises were rejected');
                    }
                })
        }
    })
}

const promise1 = Promise.reject(new Error("error"));
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises = [promise1, promise2, promise3];

customPromiseAny(promises).then((value) => console.log('Custom',value));
