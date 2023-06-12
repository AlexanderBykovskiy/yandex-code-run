module.exports = function (N, staff, K) {
    let biggest=25;
    let x = 0;
    let count = 0;
    while ( biggest > 0 ) {
        for (let i = 0; i < N; i++) {
            if(staff[i] === biggest) {
                x+=staff[i];
                count++;
                if (count === K) return x;
            }
        }
        biggest--;
    }
    return x;
}
