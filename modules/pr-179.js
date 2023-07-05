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




    const getNonConflictingPRsIndexes = () => {
        const nCPRIndexes = [];
        for (let i = 0; i < pullRequests.length; i++) {
            const conflict = rowConflictMatrix[i].find(item => item !== 0);
            if (!conflict)
                nCPRIndexes.push(i);
        }

        return nCPRIndexes;
    }


    const getConflictingPRsIndexes = (arr) => {
        const notConf = getNonConflictingPRsIndexes();
        const confIndexes = [];
        for (let i = 0; i < pullRequests.length; i++) {
            if (!notConf.includes(i)) {
                confIndexes.push(i);
            }
        }
        return confIndexes;
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


    if (pullRequests.length === 0) return [];

    if (pullRequests.length === 1) return [pullRequests[0].id];


    const ncPullRequests = getNonConflictingPRsIndexes().map(index => pullRequests[index]);
    //console.log("no conflict\n",ncPullRequests)

    const cPullRequests = Array.from(getConflictingPRsIndexes()).map(index => pullRequests[index]);
    //console.log("conflict\n",cPullRequests)

    const notIncludedFilesCount = cPullRequests.reduce((sum, item) => sum + item.files.length, 0);
    //console.log("files to merge", notIncludedFilesCount)

    const stack = cPullRequests
        .map((item, index) => ({
            index: index,
            mergedPR: [],
            files: new Set(),
            mergedFilesCount: 0,
            needToMergeFilesCount: notIncludedFilesCount,
        }))
        .sort((a,b) => b.created - a.created);

    const result = {
        prList: [],
        filesCount: 0,
        created: null,
    }

    const sumTime = (arr) => {
        return arr.reduce((sum, item) => sum + item.created, 0);
    }

    //console.log('stack',stack)

    loop:while (stack.length) {
        const curStep = stack.pop();
        const curPR = cPullRequests[curStep.index];

        //console.log("step", curStep)

        if (curStep.index === cPullRequests.length) {
            //console.log("step", curStep)
            const time = sumTime(curStep.mergedPR);
            if (curStep.files.size > result.filesCount || (curStep.files.size === result.filesCount && result.created !== null && time < result.created)) {
                //console.log("+", curStep)
                //console.log("-",curPR)
                result.filesCount = curStep.files.size;
                result.prList = curStep.mergedPR;
                result.created = time;
            }
            continue;
        }

        if (curStep.files.size + curStep.needToMergeFilesCount < result.filesCount ) {
            continue;
        }

        // Merge
        stack.push({
            index: curStep.index + 1,
            mergedPR: curStep.mergedPR,
            files: new Set(curStep.files),
            mergedFilesCount: curStep.mergedFilesCount,
            needToMergeFilesCount: curStep.needToMergeFilesCount - curPR.files.length,
        })
        for (let i = 0; i < curPR.files.length; i++) {
            const file = curPR.files[i];
            if (curStep.files.has(file)) {
                continue loop;
            } else {
                curStep.files.add(file);
            }
        }

        // No merge
        stack.push({
            index: curStep.index + 1,
            mergedPR: curStep.mergedPR.concat([curPR]),
            files: new Set(curStep.files),
            mergedFilesCount: curStep.mergedFilesCount,
            needToMergeFilesCount: curStep.needToMergeFilesCount - curPR.files.length,
        })

    }


    const answer = [...result.prList, ...ncPullRequests]
        .sort((a, b) => a.created - b.created)
        .map(item => item.id);

    return answer;

}
