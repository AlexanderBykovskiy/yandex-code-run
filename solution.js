const { getHashByData, fetchData } = require('./utils');

module.exports = async function(urls, retryCount) {
    const results = [];

    for (const url of urls) {
        let success = false;
        let response;

        for (let i = 0; i <= retryCount; i++) {
            try {
                response = await fetchData(url);
                const calculatedHash = await new Promise(resolve => {
                    getHashByData(response.data, resolve);
                });

                if (calculatedHash === response.hashSum) {
                    success = true;
                    break;
                }
            } catch (error) {
                console.error(`Error fetching data from ${url}: ${error}`);
            }
        }

        if (success) {
            results.push(response.data);
        }
    }

    return results;
};
