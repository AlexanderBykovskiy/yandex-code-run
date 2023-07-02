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

    const allPromises = Array(N).fill("*").map(async (_, checkpoint) => {

        return STREET_RACERS.map(function (streetRacer) {

            function waiting() {
                return new Promise(function(resolve, reject) {
                    wait(streetRacer, checkpoint + 1, callback);
                    const timer = setTimeout(()=> {
                        clearTimeout(timer);
                    }, 150);
                });
            }

            const callback = (lost = undefined) => {
                if (lost) {
                    //console.log("lost");
                    waiting(streetRacer, checkpoint + 1, callback);

                } else {
                    calculator(streetRacer, checkpoint+1);
                    //console.log(streetRacer, checkpoint+1, 'pass');
                }
            };

            return waiting();

        });

    })

    Promise.all(allPromises).then();

}
