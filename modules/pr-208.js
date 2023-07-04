function getLastCompatibleDependencies(data, packageA, packageB) {
    console.log(packageA)
    console.log(packageB)
    for (const key in data) {
        console.log(key)
        //console.log(data[key])
        data[key].versions.forEach(item => console.log(item))
    }
}

exports.getLastCompatibleDependencies = getLastCompatibleDependencies;
