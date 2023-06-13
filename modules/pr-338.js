module.exports = function sumExcept ( nums, start, count ) {
    let sum = 0;
    let len = nums.length;

    const validStart = Number.isInteger(start) && start > 0
        ? start <= len ? start : len
        : 0;

    const validCount = Number.isInteger(count) && count > 0
        ? count + validStart > len ? len - validStart : count
        : 0;

    console.log('');
    console.log('arr:', nums);
    console.log('start:', start, 'count:', count, 'len:', len);
    console.log('---', validStart, validStart + validCount);

    const first = [];
    if (validStart) {
        for (let i = 0; i < validStart ; i++) {
            if (Number.isInteger(nums[i])) {
                sum += nums[ i ];
                first.push(nums[ i ])
            };
        }
    }
    const second = [];
    if (validCount) {
        for (let i = validStart + validCount; i < len; i++) {
            if (Number.isInteger(nums[i])) {
                sum += nums[ i ];
                second.push(nums[ i ])
            };
        }
    }
    console.log(first, second);

    return sum ? sum : 0;
}
