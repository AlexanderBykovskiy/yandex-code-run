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


    // const getPRIndex = (pr) => {
    //     pullRequests.findIndex(item => item === pr)
    // }

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

    const itemCount = (arrIndexes) => {
        let sum = 0;
        arrIndexes.forEach(item => sum += pullRequests[item].created)
        return sum;
    }

    const stack = conflictIndexes.map(item => ({
        prIndex: item,
        mergedIndexes: Array.from(notConflictIndexes),
        filesCount: filesCount(notConflictIndexes),
        time: itemCount(notConflictIndexes)
    }));

    //console.log(stack)

    while (stack.length) {

        const item = stack.pop();

        const newMergedPrIndexes = Array.from(item.mergedIndexes);
        newMergedPrIndexes.push(item.prIndex);
        //console.log('newMergedPrIndexes', newMergedPrIndexes)

        const newFilesCount = item.filesCount + pullRequests[item.prIndex].files.length;
        //console.log("############", newFilesCount)

        const newTimeCount = item.time + pullRequests[item.prIndex].created;
        //console.log(newTimeCount, pullRequests[item.prIndex].created, newTimeCount < pullRequests[item.prIndex].created)


        let steps = 0;
        for (let i = 0; i < pullRequests.length; i++) {
            if (!newMergedPrIndexes.includes(i) && !doPRsConflict(pullRequests[i], pullRequests[item.prIndex])) {
                //console.log("+++",item.filesCount)
                const newObj = {
                    prIndex: i,
                    mergedIndexes: Array.from(newMergedPrIndexes),
                    filesCount: item.filesCount + pullRequests[i].files.length,
                    time: item.time + pullRequests[i].created,
                }
                const sum = ""
                //newObj.time =
                //if(newObj.prIndex === 1) console.log("++++", newObj)
                console.log("++++", newObj.prIndex, newObj.mergedIndexes, newObj.filesCount, newObj.time)
                stack.push(newObj)
                steps++;
            }
        }


        if (steps === 0) {
            console.log("finish")
            const newObj = Object.assign({}, item);
            newObj.mergedIndexes = newMergedPrIndexes
                //.sort((a, b) => pullRequests[a].created - pullRequests[b].created);
            newObj.filesCount = newFilesCount;
            newObj.time = newTimeCount;

            //console.log("Finish", item.filesCount)

            //result.push(newObj)

            if (totalResult) {

                if (totalResult.filesCount - newObj.filesCount < 0) {
                    totalResult = newObj;
                } else if (newObj.filesCount === totalResult.filesCount && newObj.time < totalResult.time) {
                    //console.log(newObj.time > totalResult.time)
                    totalResult = newObj;
                }

            } else {
                totalResult = newObj;
            }

        }

    }

    const superRes = totalResult.mergedIndexes
        .sort((a,b) => pullRequests[a].created - pullRequests[b].created)
        .map(item => pullRequests[item].id)


    //return totalResult.mergedIndexes.map(index => pullRequests[index].id);

    return superRes

}
