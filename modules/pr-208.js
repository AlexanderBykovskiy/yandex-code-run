function getLastCompatibleDependencies(data, packageA, packageB) {

    //console.log(packageA, packageB)
    //console.log()


    const libAversions = data[packageA].versions.map(item => item.version);
    const libBversions = data[packageB].versions.map(item => item.version);
    //console.log(libAversions)
    //console.log(libBversions)



    const parcer = (lib, ver, list, data) => {

        const curVer = data[lib].versions.find(item => item.version === ver);

        if (!curVer) return null;

        //console.log()
        //console.log('####',lib, curVer)
        //console.log()

        const newLibObj = {
            name: lib,
            ver: ver,
        }

        let newList = Array.from(list);


        if (curVer.dependencies && curVer.dependencies.length) {
            curVer.dependencies.forEach(item => {
                newList = parcer(item.packageName, item.version, Array.from(newList), data)
            })
        }

        if (newList === null) return null;

        newList.push(newLibObj)

        return newList
    }


    // More fast way

    /*function whichNextDown(arr1, arr2) {


        const newA = [];
        const newB = [];

        arr1.forEach(itemA => {
            //console.log("++++++", itemA)
            const conflict = arr2.find(itemB => itemA.name === itemB.name && itemA.ver !== itemB.ver);
            //console.log("++++++", conflict)
            if (conflict) {
                newA.push(itemA);
                newB.push(conflict);
            }
        })

        const res = [0, 0];
        for (let i = 0; i < newA.length; i++) {
            if (newA[i].ver > newB[i].ver) {
                res[0]++;
            } else {
                res[1]++;
            }
        }

        return res;
    }*/


    // const var1 = parcer(packageA, 17, [], data);
    // const var2 = parcer(packageB, 5, [], data);
    // console.log('parser1', var1)
    // console.log('parser2', var2)
    //
    // console.log(whichNextDown(var1, var2))
/*

    const result = {};

    let verA = libAversions.shift();
    let verB = libBversions.shift();

    //console.log(verA, verB)

    while (libAversions.length || libBversions.length) {

        const depA = parcer(packageA, verA, [], data)
        const depB = parcer(packageB, verB, [], data)

        //console.log("+",depA)
        //console.log("-",depB)

        const conflicts = whichNextDown(depA, depB);

        //console.log("++", conflicts)

        if (conflicts[0] === 0 && conflicts[1] === 0) {
            result[packageA] = verA;
            result[packageB] = verB;
            break;
        } else {
            if (libAversions.length > 1  && conflicts[0] > conflicts[1]) {
                verA = libAversions.shift();
            } else if (libBversions.length > 1  && conflicts[0] < conflicts[1]) {
                verB = libBversions.shift();
            } else {
                if (libAversions.length !== 0) {
                    verA = libAversions.shift();
                }
                if (libBversions.length !== 0) {
                    verB = libBversions.shift();
                }

            }

        }

    }
*/

    //return result;

    const results = [];

    libAversions.forEach(verA => {
        libBversions.forEach(verB => {

            const libsOfA = parcer(packageA, verA, [], data);
            const libsObB = parcer(packageB, verB, [], data);

            if (libsOfA === null || libsObB === null) return;

            const fullDepsList = [...libsOfA, ...libsObB];

            let badVariant = false;
            loop: {
                for (let i = 0; i < fullDepsList.length - 1; i++) {
                    for (let j = i + 1; j < fullDepsList.length; j++) {
                        if (fullDepsList[i].name === fullDepsList[j].name && fullDepsList[i].ver !== fullDepsList[j].ver) {
                            badVariant = true;
                            break loop;
                        }
                    }
                }
            }

            if (!badVariant) {
                //console.log(badVariant, fullDepsList)
                const res = {};
                for (const item of fullDepsList) {
                    if (!res[packageA] && item.name === packageA) {
                        res[packageA] = item.ver;
                    }
                    if (!res[packageB] && item.name === packageB) {
                        res[packageB] = item.ver;
                    }
                    if (res[packageA] !== undefined && res[packageB] !== undefined) {
                        //console.log(res)
                        results.push(res);
                        break;
                    }
                }
            }

        })
    })

    let answer = results[0];

    results.forEach(item => {
        if (item[packageA] > answer[packageA] || item[packageB] > answer[packageB]) {
            answer = item;
        }
    })

    return answer;

}

exports.getLastCompatibleDependencies = getLastCompatibleDependencies;
