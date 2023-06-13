module.exports = function sumExcept ( nums, start, count ) {

    let len = nums.length;

    const validStart = Number.isInteger(start) && start > 0
        ? start <= len ? start : len
        : 0;

    const validCount = Number.isInteger(count) && count > 0
        ? validStart + count > len ? len - validStart : count
        : 0;

    // console.log('');
    // console.log('arr:', nums);
    // console.log('start:', start, 'count:', count, 'len:', len);
    // console.log('---', validStart, validCount);
    // nums.splice(validStart, validCount)
    // console.log('splice:', nums);

    return nums.reduce((sum, item) => sum + (Number.isInteger(item) && item > 0 ? item : 0), 0);
}
