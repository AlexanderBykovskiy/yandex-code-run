// Не забудьте перед отправкой изменить в module.exports = function(html, css) {




module.exports = function(html, css) {
// export default function(html, css) {

    const cssObj = css.map(item => {
        item.selector = item.selector.split(" ");
        return item;
    })
    //console.log('css obj',cssObj)

    function serializer(arr) {
        const obj = {};
        arr.forEach(item => {
            obj[item.prop] = item.val;
        })
        return obj;
    }


    function extractFromDeclaration (declaration) {
        const styleList = [];
        for(let key in declaration) {
            styleList.push(Object.assign({prop: key, val: declaration[key]}));
        }
        return styleList;
    }

    function mergeFirstToSecond(newArr, oldArr) {
        const currentArr = oldArr.map(item => Object.assign(item));

        newArr.forEach(newStyle => {
            const index = currentArr.findIndex(item => item.prop === newStyle.prop);
            if (index >= 0) {
                currentArr[index].val = newStyle.val;
            } else {
                currentArr.push(Object.assign(newStyle));
            }
        })

        return currentArr;

    }


    function getCurrentStyle(selector, parentStyles, allParentsTags, leftSiblings, leftSib, parent, level) {

        let newStyles = [];
        parentStyles.forEach(item => newStyles.push(Object.assign(item)));

        const currentCSS = cssObj
            .filter(item => item.selector.includes(selector))
            .map(item => Object.assign(item));

        currentCSS.forEach(cssStyle => {

            if (cssStyle.selector.length === 1) {
                const cssSelectorStyles = extractFromDeclaration(cssStyle.declarations);
                newStyles = mergeFirstToSecond(cssSelectorStyles, newStyles);
            }

            if (cssStyle.selector.length === 2 && cssStyle.selector[1] === selector) {
                if (allParentsTags && allParentsTags.includes(cssStyle.selector[0])) {
                    //console.log("*****", cssStyle.selector[0], allParentsTags.includes(cssStyle.selector[0]))
                    const cssSelectorStyles = extractFromDeclaration(cssStyle.declarations);
                    newStyles = mergeFirstToSecond(cssSelectorStyles, newStyles);
                }
            }

            if (cssStyle.selector.length === 3 && cssStyle.selector[1] === ">") {
                if (parent && cssStyle.selector[2] === selector && cssStyle.selector[0] === parent) {
                    const cssSelectorStyles = extractFromDeclaration(cssStyle.declarations);
                    newStyles = mergeFirstToSecond(cssSelectorStyles, newStyles);
                }
            }

            if (cssStyle.selector.length === 3 && cssStyle.selector[1] === "+") {

                if (leftSib && cssStyle.selector[2] === selector && cssStyle.selector[0] === leftSib) {
                    const cssSelectorStyles = extractFromDeclaration(cssStyle.declarations);
                    newStyles = mergeFirstToSecond(cssSelectorStyles, newStyles);
                }
            }

            if (cssStyle.selector.length === 3 && cssStyle.selector[1] === "~") {

                if (leftSiblings && cssStyle.selector[2] === selector && leftSiblings.includes(cssStyle.selector[0])) {
                    console.log('BINGO')
                    const cssSelectorStyles = extractFromDeclaration(cssStyle.declarations);
                    newStyles = mergeFirstToSecond(cssSelectorStyles, newStyles);
                }
            }


            console.log("leftSib", leftSib)
            console.log("leftSib", leftSiblings)

        })

        return newStyles;
    }


    function parser ({element, parentStyles, parent, allParentsTags, leftSiblings, leftSib, level}) {

        if (element.type === "ELEMENT") {
            // console.log("\n+++++++++++++++++++++\nTAG\n", element.tag, allParentsTags)

            const currentStyles = getCurrentStyle(element.tag, parentStyles, allParentsTags, leftSiblings, leftSib, parent, level);
            element.styles = serializer(currentStyles);
            console.log(level, element.tag)
            console.log("-".repeat(level*2), element.styles)

            const goodChildren = element.children.filter(item => item.type === "ELEMENT")

            goodChildren.forEach((children, index) => {

            const obj = {
                element: children,
                parentStyles: Array.from(getCurrentStyle(element.tag, parentStyles)),
                parent: element.tag,
                allParentsTags: [...allParentsTags, element.tag],
                leftSiblings: [...(goodChildren.filter((i, j) => j <= index - 1).map(i => i.tag))],
                leftSib: index - 1 >= 0 ? goodChildren[index - 1].tag : undefined,
                level: level + 1,
            }
            //console.log('currentStyles',Array.from(currentStyles))
            parser(obj)

            })

        }

    }

    parser({element: html, parentStyles: [], parent: undefined, allParentsTags: [], leftSiblings: [], leftSib: undefined, level: 1});


    return html;

}
