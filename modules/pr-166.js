module.exports = function (N, staff, K) {
    staff.sort((a,b) => b-a);
    let x = 0;
    for(let i=0; i<K; i++) {
        x+=staff[i];
    }
    return x;
}
