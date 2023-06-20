const { getHashByData, fetchData } = require('./utils');

module.exports = async function(urls, retryCount) {
    const results = [];

    const fetchPromises = urls.map(async (url) => {
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
    });

    const resolvedPromises = await Promise.all(fetchPromises);
    for (const data of resolvedPromises) {
        if (data !== null) {
            results.push(data);
        }
    }

    return results;
};
