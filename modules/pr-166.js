module.exports = function (N, staff, K) {
    let swapped;
    do {
        swapped = false;
        staff.forEach((item, index) => {
            if (item < staff[index + 1]) {
                let temp = item;
                staff[index] = staff[index + 1];
                staff[index + 1] = temp;
                swapped = true;
            }
        })
    } while (swapped);
    let x = 0;
    for(let i=0; i<K; i++) {
        x+=staff[i];
    }
    return x;
}
