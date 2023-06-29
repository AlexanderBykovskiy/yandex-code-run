/**
 * @param {Good|Comment} data - ссылка на товар, отзыв или ответ на отзыв,
 * из которой нужно восстановить все возможные данные
 * @return {string}
 * class Good {
 *     name: string;
 *     comments: Comment[];
 *     related: Good[];
 * };
 *
 * class Comment {
 *     text: string;
 *     comments: Comment[];
 *     parent: Good | Comment;
 * };
 */
module.exports = function (data) {

    const goods = [];
    const comments = [];

    function isExist (obj) {
        let index;
        if ("text" in obj)
            index = comments.findIndex(item => item.text === obj.text);
        if ("name" in obj)
            index = goods.findIndex(item => item.name === obj.name);
        return index >= 0;
    }

    function extractor (obj) {

        if (!isExist(obj)) {
            //console.log(obj)

            if ("name" in obj) {

                // name: string;
                // comments: Comment[];
                // related: Good[];

                const newGood = {
                    name: obj.name,
                    comments: obj.comments.map(item => item.text),
                    related: obj.related.map(item => item.name),
                }
                goods.push(newGood);

                obj.comments.forEach(item => {
                    extractor(item);
                })

                obj.related.forEach(item => {
                    extractor(item);
                })

            } else if ("text" in obj) {

                // text: string;
                // comments: Comment[];
                // parent: Good | Comment;

                const newComment = {
                    text: obj.text,
                    comments: obj.comments.map(item => item.text),
                    parent: "text" in obj.parent ? obj.parent.text : undefined,
                    good: "name" in obj.parent ? obj.parent.name : undefined
                }
                comments.push(newComment);

                obj.comments.forEach(item => {
                    extractor(item);
                })

                if (obj.parent)
                    extractor(obj.parent);

            }

        }

    }

    extractor(data)


    const marker = "- "
    const listMarker = "  * "


    function commentParser (parent, level) {

        let res = "";

        const rootList = comments
            .filter(item => item.parent === parent)
            .sort((a, b) => {
                if (a.text > b.text) return 1;
                if (a.text < b.text) return -1;
                if (a.text === b.text) return 0;
            });

        if (!rootList.length) return ""; // +++++++++

        //console.log("rootList")
        //console.log(rootList.map(i=>i.text).join("\n"))

        rootList.forEach(item => {

            const subCommentList = commentParser(item.text, level+1);

            res += "  ".repeat(level) + marker + item.text
                + (item.good ? " - про " + item.good + "\n" : "\n")
                + (subCommentList ? subCommentList : "");

        })

        return res;
    }



    let result = "## Отзывы\n\n";

    result += commentParser(undefined, 0);

    result += "\n## Товары\n\n"

    goods
        .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            if (a.name === b.name) return 0;
        })
        .forEach(good => {

            const relatedList = good.related
                .sort()
                .map(item => listMarker + item)
                .join("\n");

            let string = marker + good.name + (good.related.length ? "\n" + relatedList + "\n" : "\n"); //+++
            result += string;

        });


    //console.log("g", goods);
    //console.log("c", comments);

    return result;
}
