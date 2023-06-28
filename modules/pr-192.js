/**
 * @param {Band|Genre} data - ссылка на группу или жанр,
 * из которой нужно восстановить все возможные данные
 * @return {string}
 * class Band {
 *     name: string;
 *     friends: Band[];
 *     genres: Genre[];
 * }
 *
 * class Genre {
 *     name: string;
 *     bands: Band[];
 *     subgenres: Genre[];
 *     parent: Genre | null;
 * }
 */
module.exports = function (data) {

    const bands = new Set();
    const genres = new Set();


    function bandAppender (name, bands) {
        const newBand = {name: name, friends: bands.map(item => item.name)};
        bands.add(newBand);
    }

    function genreAppender (name, parentName, bands) {
        const newGenre = {name: name, parentName: parentName, bands: bands.map(item => item.name)};
        genres.add(newGenre);
    }

    function extractor (data, bands, genres) {
        if (data.type === "band") {

            bandAppender(data.name, data.friends)

            const bandFriends = data.friends.filter(item => !bands.has(item));
            console.log("------brs",bandFriends.map(item=> item.name))
            bandFriends.forEach(band => extractor(band, data));

            const bandGenres = data.genres.filter(item => !genres.has(item));
            console.log("------gnrs",bandGenres.map(item=> item.name))
            bandGenres.forEach(genre => extractor(genre));

        } else if (data.type === "genre") {

            genreAppender(data.name, data.parent?.name, data.bands);

            if (data.parent) extractor(data.parent);

            const bandFriends = data.bands.filter(item => !bands.has(item));
            console.log("------brs",bandFriends.map(item=> item.name))
            //bandFriends.forEach(band => extractor(band));

            const bandGenres = data.subgenres.filter(item => !genres.has(item));
            console.log("------gnrs",bandGenres.map(item=> item.name))
            //.forEach(genre => extractor(genre));

        }
    }

    extractor(data)
    console.log(data)

    console.log(genres)
    console.log(bands)

    //return 'X';
}

