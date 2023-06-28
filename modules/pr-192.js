/**
 * @param {Band|Genre} obj - ссылка на группу или жанр,
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


module.exports = function (obj) {

    const bands = [];
    const genres = [];


    function isExistGenre (objName) {
        const index = genres.findIndex(item => item.name === objName);
        return index >=0;
    }

    function isExistBand (objName) {
        const index = bands.findIndex(item => item.name === objName);
        return index >=0;
    }



    function extractor (obj) {

        if (obj.type === "band" && !isExistBand(obj.name)) {

            const newBand = {name: obj.name, friends: obj.friends.map(item => item.name), genres: obj.genres.map(item => item.name)}
            bands.push(newBand);

            obj.friends.forEach(item => {
                extractor(item);
            })

            obj.genres.forEach(item => {
                extractor(item);
            })

        } else if (obj.type === "genre" && !isExistGenre(obj.name)) {

            //console.log(obj.subgenres)
            const newGenre = {name: obj.name, parent: obj?.parent?.name, subgenres: obj.subgenres.map(item => item.name)}
            genres.push(newGenre);

            obj.bands.forEach(item => {
                extractor(item);
            })

            obj.subgenres.forEach(item => {
                extractor(item);
            })

            if (obj.parent)
                extractor(obj.parent);

        }

    }

    extractor(obj)
    //console.log(obj)

    //console.log("g", genres)
    //console.log("b", bands)

    let result = "## Жанры\n\n";

    const rootGenre = genres.filter(item => item.parent === undefined);
    rootGenre
        .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            if (a.name === b.name) return 0;
        })
        .forEach(rootGenreItem => {

        const children = genres.filter(item => item.parent === rootGenreItem.name);

        const genreBangs = bands.filter(item => item.genres.includes(rootGenreItem.name))

        let string = "- " + rootGenreItem.name + (children.length ? "" : ": " + genreBangs.map(item => item.name).join(", ")) + "\n";

        if (children.length) {
            children
                .sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    if (a.name === b.name) return 0;
                })
                .forEach(item => {
                    const genreBangs = bands.filter(subitem => subitem.genres.includes(item.name));
                    let subString = "  - " + item.name + (genreBangs.length ? ": " + genreBangs.map(item => item.name).join(", ") + "\n" : "\n")
                    string += subString;
                })
        }

        result += string;
    })

    result += "\n## Группы\n\n"

    bands
        .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            if (a.name === b.name) return 0;
        })
        .forEach(band => {
        let string = "- " + band.name + (band.friends.length ? ", друзья: " + band.friends.sort().join(", ") + "\n" : "\n");
        result += string;
    });

    return result;
}

