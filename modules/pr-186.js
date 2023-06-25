function getLastCommonCommitMessage(commits, branches) {

    if (!commits.length) throw Error('No common commit');

    // const br1 = commits.filter(item => item.branches?.includes(branches[0]));
    // const br2 = commits.filter(item => item.branches?.includes(branches[1]));

    let commit1 = null;
    let commit2 = null;

    commits.forEach((item, index) => {
        if (item.branches?.includes(branches[0])) {
            if (commit1 && commit1.timestamp < item.timestamp)
                commit1 = item;
            else
                commit1 = item
        }
        if (item.branches?.includes(branches[1])) {
            if (commit2 && commit2.timestamp < item.timestamp)
                commit2 = item;
            else
                commit2 = item
        }
    });

    const br1commits = [];
    const stack = [commit1];
    while (stack.length) {
        const commit = stack.pop();
        br1commits.push(commit);
        //console.log(commit)
        commit.parents?.forEach(parentId => {
            const parent = commits.find(obj => parentId === obj.id);
            if (parent) stack.push(parent);
        })
    }

    // console.log(br1commits)

    const commonCommits = [];
    stack.push(commit2);
    while (stack.length) {
        const commit = stack.pop();
        const commonEl = br1commits.find(item => item.id === commit.id);
        if (commonEl) commonCommits.push(commonEl);
        commit.parents?.forEach(parentId => {
            const parent = commits.find(obj => parentId === obj.id);
            if (parent) stack.push(parent);
        })
    }

    //console.log(commonCommits)

    if (commonCommits) {
        let lastTime = commonCommits[0];
        commonCommits.forEach(item => {
            if (item.timestamp > lastTime.timestamp) lastTime = item
        })
        if (lastTime.message)
            return lastTime.message
        else
            return "";
    } else
        throw Error('No common commit');
}

module.exports = {getLastCommonCommitMessage};
