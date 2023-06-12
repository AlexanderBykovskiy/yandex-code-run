module.exports = function(nums, k) {
    const find = [];
    for(let i= 0; i < nums.length; i++) {
        const num = k-nums[i];
        if (find.includes(num))
            return true
        else
            find.push(nums[i])
    }
    return false;
}
