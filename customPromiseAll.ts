type Fn<T> = () => Promise<T>

/**
 * Эта реализация PromiseAll немного отличается,
 * т.к. в массиве ф-ии, которые возвращают промисы, а не сами промисы.
 * https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/
 */
function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];
        let completed = 0;

        for (let i = 0; i < functions.length; i++) {
            functions[i]()
                .then(value => {
                    results[i] = value;
                    completed++;
                    if (completed === functions.length) {
                        resolve(results)
                    }
                })
                .catch(error => reject(error))
        }
    })
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */