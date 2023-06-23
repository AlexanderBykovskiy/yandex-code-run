

module.exports = async function (input) {

    const stack = [];
    const result = [];

    const pattern = /^f+i+l+e+$/;

    // пример вызова read
    //input.read(1, (file) => console.log(file));
    // пример вызова size
    //input.size((size) => console.log(size));


    const size = await new Promise(resolve => {
        input.size(resolve);
    });

    // пример вызова size
    /*input.size((size) => {
        for (let i=0; i<size; i++) {
            input.read(i, (file) => {
                /!*if (typeof file == 'string' || file instanceof String) {
                    result.push(file)
                }*!/
                const calculatedHash = await new Promise(resolve => {
                    getHashByData(response.data, resolve);
                });

                console.log( i, file );
            });
        }
    });*/

    /*const fetchPromises = urls.map(async (url) => {
        for (let i = 0; i <= retryCount; i++) {
            try {
                const response = await fetchData(url);
                const calculatedHash = await new Promise(resolve => {
                    getHashByData(response.data, resolve);
                });

                if (calculatedHash === response.hashSum) {
                    return response.data;
                }
            } catch (error) {
                console.error(`Error fetching data from ${url}: ${error}`);
            }
        }
        return null;
    });*/

    await console.log();
    return ['ffffile', 'ffiillee', 'ffiillee', 'fiiile', 'filllle'];

}
