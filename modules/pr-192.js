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

    function genreParser (parent, level) {
        let res = "";
        const rootList = genres
            .filter(item => item.parent === parent)
            .sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                if (a.name === b.name) return 0;
            });

        if (!rootList.length) return ""; // +++++++++

        //console.log("rootList")
        //console.log(rootList.map(i=>i.name).join("\n"))

        rootList.forEach(item => {

            const genreBangs = bands
                .filter(band => band.genres.includes(item.name))
                .sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    if (a.name === b.name) return 0;
                })
                .map(band=>band.name);

            const genreChildren = genres
                .filter(subGenre => item.name === subGenre.parent)
                .sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    if (a.name === b.name) return 0;
                })
                .map(subgenre=>subgenre.name);

            //console.log("+++", genreChildren)

            const subGenreList = genreParser(item.name, level+1);

            res += "  ".repeat(level) + marker + item.name
                + (genreBangs.length ? ": " + genreBangs.join(", ") + "\n" : "\n")
                + (subGenreList ? subGenreList : "");

        })

        return res;
    }


    const marker = "- "

    let result = "## Жанры\n\n";

    result += genreParser(undefined, 0);

    result += "\n## Группы\n\n"

    bands
        .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            if (a.name === b.name) return 0;
        })
        .forEach(band => {
        let string = marker + band.name + (band.friends.length ? ", друзья: " + band.friends.sort().join(", ") + "\n" : "\n");
        result += string;
    });

    return result;
}

