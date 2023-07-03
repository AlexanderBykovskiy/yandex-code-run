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

    const rowConflictMatrix = [];
    for (let i = 0; i < pullRequests.length; i++) {
        rowConflictMatrix.push(conflictMatrix.slice(i*pullRequests.length, i*pullRequests.length + pullRequests.length))
    }

    //console.log(rowConflictMatrix)
    //console.log()


    const getPRIndex = (pr) => {
        pullRequests.findIndex(item => item === pr)
    }

    const getNonConflictingPRsIndexes = () => {
        const nCPRIndexes = [];
        for (let i = 0; i < pullRequests.length; i++) {
            const conflict = rowConflictMatrix[i].find(item => item !== 0);
            if (!conflict)
                nCPRIndexes.push(i);
        }

        return nCPRIndexes;
    }

    const notConflictIndexes = getNonConflictingPRsIndexes();

    //console.log("not conflict", notConflictIndexes, notConflictIndexes.map(item => pullRequests[item].id))

    const getConflictingPRsIndexes = () => {
        const notConf = getNonConflictingPRsIndexes();
        const confIndexes = [];
        for (let i = 0; i < pullRequests.length; i++) {
            if (!notConf.includes(i)) {
                confIndexes.push(i);
            }
        }
        return confIndexes;
    }

    const conflictIndexes = getConflictingPRsIndexes();

    //console.log("conflict", conflictIndexes, conflictIndexes.map(item => pullRequests[item].id))
    //console.log()



    function doPRsConflict(pr1, pr2) {
        const i = prToIndex.get(pr1);
        const j = prToIndex.get(pr2);
        return conflictMatrix[i * pullRequests.length + j] === 1;
    }


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

    function search (stack, mergedFiles, mergedRequests, freeFilesCount) {

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




    if (!pullRequests.length) return [];

    if (pullRequests.length === 1) return [pullRequests[0].id];


    //const result = [];


    let totalResult = undefined;


    const filesCount = (arrIndexes) => {
        //console.log("++++++", arrIndexes)
        let count = 0;
        arrIndexes.forEach(item => count += pullRequests[item].files.length)
        //console.log('---------count', count)
        return count
    }

    const stack = conflictIndexes.map(item => ({
        prIndex: item,
        mergedIndexes: Array.from(notConflictIndexes),
        filesCount: filesCount(notConflictIndexes)
    }));

    while (stack.length) {

        const item = stack.pop();

        const newMergedPrIndexes = Array.from(item.mergedIndexes);
        newMergedPrIndexes.push(item.prIndex);
        //console.log('newMergedPrIndexes', newMergedPrIndexes)

        const newFilesCount = item.filesCount + pullRequests[item.prIndex].files.length;
        //console.log("############", newFilesCount)


        let steps = 0;
        for (let i = 0; i < pullRequests.length; i++) {
            if (!newMergedPrIndexes.includes(i) && !doPRsConflict(pullRequests[i], pullRequests[item.prIndex])) {
                //console.log("+++",item.filesCount)
                stack.push({prIndex: i, mergedIndexes: Array.from(newMergedPrIndexes), filesCount: item.filesCount + pullRequests[i].files.length})
                steps++;
            }
        }
        if (steps === 0) {
            const newObj = Object.assign({}, item);
            newObj.mergedIndexes = newMergedPrIndexes
                .sort((a, b) => pullRequests[a].created - pullRequests[b].created);
            newObj.filesCount = newFilesCount;

            //console.log("Finish", item.filesCount)

            //result.push(newObj)

            if (totalResult) {
                if (newObj.filesCount === totalResult.filesCount) {

                    if (newObj.mergedIndexes.length === totalResult.mergedIndexes.length) {

                        for (let i = 0; i < newObj.mergedIndexes.length; i++) {
                            if (pullRequests[newObj.mergedIndexes[i]].created < pullRequests[totalResult.mergedIndexes[i]].created) {
                                totalResult = newObj;
                                break;
                            }
                        }

                    } else if (newObj.mergedIndexes.length > totalResult.mergedIndexes.length) {
                        totalResult = newObj;
                    }

                } else if (totalResult.filesCount - newObj.filesCount < 0) {
                    totalResult = newObj;
                }
            } else {
                totalResult = newObj;
            }

        }

    }

    /*result.sort((a,b) => {
        if (b.filesCount === a.filesCount) {
            if (a.mergedIndexes.length === b.mergedIndexes.length) {
               // console.log(a.mergedIndexes.length)
                for (let i = 0; i < a.mergedIndexes.length; i++) {
                    //console.log(i, pullRequests[a.mergedIndexes[i]].created)
                    if (pullRequests[a.mergedIndexes[i]].created - pullRequests[b.mergedIndexes[i]].created !== 0) return pullRequests[a.mergedIndexes[i]].created - pullRequests[b.mergedIndexes[i]].created
                }
            } else {
                return !!(b.mergedIndexes.length - a.mergedIndexes.length)
            }

        } else {
            return !!(b.filesCount - a.filesCount)
        }
    } )*/

    //console.log(result)

    //console.log(totalResult)
    //console.log(totalResult.mergedIndexes.map(index => pullRequests[index].id))

    //return result[0].mergedIndexes.map(index => pullRequests[index].id);

    return totalResult.mergedIndexes.map(index => pullRequests[index].id);

}
