module.exports = function winners(wait, pushResult, STREET_RACERS, N) {

  //console.log("racers", STREET_RACERS)
  //console.log("points", N)

    const result = [];
    const total = [];

    const calculator = (racer, point) => {
        const current = result.find(item => item.racer === racer)
        if (current) {
            if (current.point === point - 1) {
                current.point = point;
                if (point === N) {
                    total.push(current.racer)
                }
            }
        } else {
            result.push({
                racer: racer,
                point: point
            })
        }
        if (total.length === 3) {
            //console.log(total)
            pushResult(total);
        }
    }



    function waiting(streetRacer, checkpoint, callback) {
        return new Promise(function(resolve, reject) {
            wait(streetRacer, checkpoint, callback);
            const timer = setTimeout(()=> {
                resolve();
                clearTimeout(timer);
            }, 150);
        });
    }

    const allPromises = [];

    for (let checkpoint = 1; checkpoint <= N; checkpoint++) {
        STREET_RACERS.forEach((streetRacer) => {

            const callback = (lost = undefined) => {
                    if (lost) {
                        //console.log("lost");
                        allPromises.push(waiting(streetRacer, checkpoint, callback));

                    } else {
                        calculator(streetRacer, checkpoint+1);
                        //console.log(streetRacer, checkpoint+1, 'pass');
                    }
                };

                allPromises.push(waiting(streetRacer, checkpoint, callback))
        })
    }

    Promise.all(allPromises).then();

}
