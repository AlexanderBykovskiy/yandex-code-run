module.exports = function winners(wait, pushResult, STREET_RACERS, N) {

    //console.log("racers", STREET_RACERS)
    //console.log("points", N)

    const allPromises = [];
    const result = [];


    function waiting(streetRacer, checkpoint) {
        return new Promise(resolve => {
            const timer = setTimeout(()=> {
                resolve();
            }, 300);
            wait(streetRacer, checkpoint, (lost) => {
                clearTimeout(timer);
                if (lost) {
                    waiting(streetRacer, checkpoint)
                } else {
                    //console.log({streetRacer, checkpoint})
                    result.push({streetRacer, checkpoint})
                }
                resolve();
            })
        });
    }



    for (let checkpoint = 1; checkpoint <= N; checkpoint++) {
        STREET_RACERS.forEach((streetRacer) => {
            allPromises.push(waiting(streetRacer, checkpoint));
        })
    }

    Promise.all(allPromises).then(res => {
        //console.log('result',result)
        const finishers = result.filter(item => {
            if (item.checkpoint === N) {
                const way = result.filter(way => way.streetRacer === item.streetRacer);
                let isCheater = false;
                way.forEach((subWai, index) => {
                    if (subWai.checkpoint !== index +1 ) isCheater = true;
                })
                return !isCheater;
            }
            return false;
        })

        pushResult(finishers.slice(0, 3).map(item => item.streetRacer))

    });

}
