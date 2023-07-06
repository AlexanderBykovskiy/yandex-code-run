// Не забудьте перед отправкой изменить в module.exports = function(html, css) {
module.exports = function (html, css) {
    // export default function(html, css) {
    //const parser = function (html, css) {
    // const INHERITED_PROPERTIES_ARR = [
    //     "azimuth",
    //     "border-collapse",
    //     "border-spacing",
    //     "caption-side",
    //     "color",
    //     "cursor",
    //     "direction",
    //     "elevation",
    //     "empty-cells",
    //     "font-family",
    //     "font-size",
    //     "font-style",
    //     "font-variant",
    //     "font-weight",
    //     "font",
    //     "letter-spacing",
    //     "line-height",
    //     "list-style-image",
    //     "list-style-position",
    //     "list-style-type",
    //     "list-style",
    //     "orphans",
    //     "pitch-range",
    //     "pitch",
    //     "quotes",
    //     "richness",
    //     "speak-header",
    //     "speak-numeral",
    //     "speak-punctuation",
    //     "speak",
    //     "speech-rate",
    //     "stress",
    //     "text-align",
    //     "text-indent",
    //     "text-transform",
    //     "visibility",
    //     "voice-family",
    //     "volume",
    //     "white-space",
    //     "widows",
    //     "word-spacing",
    // ];
    //
    // const getParentStyles = currentStyles => {
    //     const objResult = {};
    //     if (currentStyles)
    //         for (const arr of Object.entries(currentStyles)) {
    //             const index = INHERITED_PROPERTIES_ARR.indexOf(arr[0]);
    //             if (index >= 0) objResult[arr[0]] = arr[1];
    //         }
    //     return objResult;
    // }
    //
    // const getChildren = (nodeHtml, css, { stylesOfParent, tagParents }) => {
    //     return nodeHtml.children.map((el, i) => {
    //         const newStylesOfParent = nodeHtml?.tag ? { ...stylesOfParent, ...getParentStyles(css[nodeHtml?.tag] ?? null) } : { ...stylesOfParent };
    //         const newTagParents = nodeHtml.tag ? Array.from(new Set([...tagParents, nodeHtml.tag])) : tagParents;
    //         const newTagClosestParent = nodeHtml.tag ?? null;
    //         const newNeighbors = nodeHtml.children.filter((element, j) => j < i && element.tag).map(element => element.tag);
    //         const newNearestNeighbor = i && nodeHtml.children[i - 1]?.tag ? nodeHtml.children[i - 1]?.tag : null;
    //         const newEl = setStyles(el, css, {
    //             stylesOfParent: newStylesOfParent,
    //             tagParents: newTagParents,
    //             tagClosestParent: newTagClosestParent,
    //             neighbors: newNeighbors,
    //             nearestNeighbor: newNearestNeighbor
    //         });
    //         return newEl;
    //     });
    // }
    //
    // const setStyles = (nodeHtml, css, { stylesOfParent, tagParents, tagClosestParent, neighbors, nearestNeighbor }) => {
    //     if (nodeHtml?.tag){
    //         nodeHtml.styles = { ...stylesOfParent, ...css[nodeHtml.tag] };
    //         tagParents.forEach(el => {
    //             nodeHtml.styles = { ...nodeHtml.styles, ...css[el + " " + nodeHtml.tag] };
    //         });
    //         if (tagClosestParent)
    //             nodeHtml.styles = { ...nodeHtml.styles, ...css[tagClosestParent + " > " + nodeHtml.tag] };
    //         neighbors.forEach(el => {
    //             nodeHtml.styles = { ...nodeHtml.styles, ...css[el + " ~ " + nodeHtml.tag] };
    //         });
    //         if (nearestNeighbor)
    //             nodeHtml.styles = { ...nodeHtml.styles, ...css[nearestNeighbor + " + " + nodeHtml.tag] };
    //     }
    //
    //     if (nodeHtml?.children?.length)
    //         nodeHtml.children = getChildren(nodeHtml, css, { stylesOfParent, tagParents });
    //     return nodeHtml;
    // }
    //
    // const objStyles = {};
    //
    // css?.forEach(el => {
    //     objStyles[el.selector] = el.declarations;
    // })
    //
    // console.log(objStyles)
    //
    // const newHtml = setStyles(html, objStyles, {
    //     stylesOfParent: {}, tagParents: [], tagClosestParent: null, neighbors: [], nearestNeighbor: null
    // });
    const styleList = css.map(item => {
        item.selector = item.selector.split(" ");
        return item;
    });
    console.log(styleList);
    function getStylesBySelector(selector) {
        return styleList.filter(styleObj => styleObj.selector.includes(selector));
    }
    function getStyle(selector) {
        // const curStyles = css.filter(item => {
        //     const selectorList = item.selector.split(" ");
        //     return selectorList.includes(selector);
        // });
        // curStyles.forEach(style => {
        //     if (style)
        // })
        // console.log('styles', curStyles)
    }
    function parser(element) {
        if (element.type === "ELEMENT") {
            console.log("\n", element.tag);
            getStyle(element.tag);
            element.children.forEach(item => {
                parser(item);
            });
        }
    }
    parser(html);
    return "newHtml";
};
