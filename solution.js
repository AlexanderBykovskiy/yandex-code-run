const {getHashByData, fetchData} = require('./utils');

module.exports = async function(urls, retryCount) {

    const cb = (servHash) => console.log(servHash)


    const response = await fetchData(urls[0])
    console.log(response);
    const hash = getHashByData(response.data, cb)
    console.log(hash);

    return [response.data];
}
