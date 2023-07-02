/**
 * @param {PullRequest[]} pullRequests массив PR, отсортированных по времени создания
 * @returns {string[]} идентификаторы реквестов в порядке мёржа
 */
module.exports = function (pullRequests) {

    const conflictMatrix = new Uint8Array(pullRequests.length ** 2);
    //console.log("conflictMatrix", conflictMatrix)
    const prToIndex = new WeakMap();
    //console.log("prToIndex", prToIndex)

    for (let i = 0; i < pullRequests.length; i++) {
        const pr1 = pullRequests[i];
        prToIndex.set(pr1, i);
        //console.log("prToIndex",prToIndex)
        conflictMatrix[i * pullRequests.length + i] = 0;

        for (let j = i + 1; j < pullRequests.length; j++) {
            const pr2 = pullRequests[j];
            //console.log("pullRequests[j]", j, pullRequests[j])
            const res = conflicts(pr1.files, pr2.files);
            conflictMatrix[i * pullRequests.length + j] = res;
            conflictMatrix[j * pullRequests.length + i] = res;
            // conflictMatrix[i * pullRequests.length + j] = conflictMatrix[j * pullRequests.length + i] = conflicts(pr1.files, pr2.files);
        }
    }

    console.log('conflictMatrix')
    console.log(conflictMatrix.length)
    for (let i = 0; i < pullRequests.length; i++) {
        console.log(conflictMatrix.slice(i*pullRequests.length, i*pullRequests.length + pullRequests.length))
    }
    console.log()

    function doPRsConflict(pr1, pr2) {
        const i = prToIndex.get(pr1);
        const j = prToIndex.get(pr2);
        return conflictMatrix[i * pullRequests.length + j] === 1;
    }


    // function getNonConflictingPRs (prsSet, mergedPrs) {
    //     const result = [];
    //     const prsToTest = [...prsSet, ...mergedPrs];
    //     prsSet.forEach((pr) => {
    //         if (!doPRsConflict(pr, prsToTest)) {
    //             result.push(pr);
    //         }
    //     });
    //     return result;
    // }

    //console.log("+++",getNonConflictingPRs(pullRequests, ["2", "3"]))


    function conflicts(a, b) {
        let i = 0;
        let j = 0;

        while (i < a.length && j < b.length) {
            if (a[i] === b[j]) {
                return true;
            } else if (a[i] > b[j]) {
                j++;
            } else {
                i++;
            }
        }

        return false;
    }

    function search (stack, index) {

        while (stack.length > 0) {

            const item = stack.pop();

            for (let i = 0; i < pullRequests.length; i++) {
                if (item.id !== pullRequests[i].id && !doPRsConflict(item, pullRequests[i])) {
                    console.log(item, pullRequests[i], doPRsConflict(item, pullRequests[i]))
                    //stack.push(stack, stack.length);
                }
            }
        }

    }

    const fullSearch = (prsSet, mergedPrs = [], mergedFilesCount = 0) => {

        //допиши код

        // выбираем реквесты, которые не конфликтуют ни с одним из смерженных и оставшихся
        // их можно смержить, и конфликтов не будет

        // const safeToMergePRs = getNonConflictingPRs(prsSet, mergedPrs);
        // mergedPrs = mergedPrs.concat(safeToMergePRs);
        // safeToMergePRs.forEach((pr) => {
        //     prsSet.delete(pr);
        //     mergedFilesCount += pr.files.length;
        // });
        //
        // const pr = prsSet.values().next().value;

        //допиши код

    }




    if (!pullRequests.length) return [];

    if (pullRequests.length === 1) return [pullRequests[0].id];

    let result = [];

    const stack = Array.from(pullRequests);


    search(stack, pullRequests.length-1)

    //допиши код

    return result;
}
