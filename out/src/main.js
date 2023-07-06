// Не забудьте перед отправкой изменить в module.exports = function(html, css) {
//module.exports = function(html, css) {
//export default function(html, css) {
import { css, html } from "../out/defaults";
const parser = function (html, css) {
    const INHERITED_PROPERTIES_ARR = [
        "azimuth",
        "border-collapse",
        "border-spacing",
        "caption-side",
        "color",
        "cursor",
        "direction",
        "elevation",
        "empty-cells",
        "font-family",
        "font-size",
        "font-style",
        "font-variant",
        "font-weight",
        "font",
        "letter-spacing",
        "line-height",
        "list-style-image",
        "list-style-position",
        "list-style-type",
        "list-style",
        "orphans",
        "pitch-range",
        "pitch",
        "quotes",
        "richness",
        "speak-header",
        "speak-numeral",
        "speak-punctuation",
        "speak",
        "speech-rate",
        "stress",
        "text-align",
        "text-indent",
        "text-transform",
        "visibility",
        "voice-family",
        "volume",
        "white-space",
        "widows",
        "word-spacing",
    ];
    const getParentStyles = currentStyles => {
        const objResult = {};
        if (currentStyles)
            for (const arr of Object.entries(currentStyles)) {
                const index = INHERITED_PROPERTIES_ARR.indexOf(arr[0]);
                if (index >= 0)
                    objResult[arr[0]] = arr[1];
            }
        return objResult;
    };
    const getChildren = (nodeHtml, css, { stylesOfParent, tagParents }) => {
        return nodeHtml.children.map((el, i) => {
            var _a, _b, _c, _d;
            const newStylesOfParent = (nodeHtml === null || nodeHtml === void 0 ? void 0 : nodeHtml.tag) ? Object.assign(Object.assign({}, stylesOfParent), getParentStyles((_a = css[nodeHtml === null || nodeHtml === void 0 ? void 0 : nodeHtml.tag]) !== null && _a !== void 0 ? _a : null)) : Object.assign({}, stylesOfParent);
            const newTagParents = nodeHtml.tag ? Array.from(new Set([...tagParents, nodeHtml.tag])) : tagParents;
            const newTagClosestParent = (_b = nodeHtml.tag) !== null && _b !== void 0 ? _b : null;
            const newNeighbors = nodeHtml.children.filter((element, j) => j < i && element.tag).map(element => element.tag);
            const newNearestNeighbor = i && ((_c = nodeHtml.children[i - 1]) === null || _c === void 0 ? void 0 : _c.tag) ? (_d = nodeHtml.children[i - 1]) === null || _d === void 0 ? void 0 : _d.tag : null;
            const newEl = setStyles(el, css, {
                stylesOfParent: newStylesOfParent,
                tagParents: newTagParents,
                tagClosestParent: newTagClosestParent,
                neighbors: newNeighbors,
                nearestNeighbor: newNearestNeighbor
            });
            return newEl;
        });
    };
    const setStyles = (nodeHtml, css, { stylesOfParent, tagParents, tagClosestParent, neighbors, nearestNeighbor }) => {
        var _a;
        if (nodeHtml === null || nodeHtml === void 0 ? void 0 : nodeHtml.tag) {
            nodeHtml.styles = Object.assign(Object.assign({}, stylesOfParent), css[nodeHtml.tag]);
            tagParents.forEach(el => {
                nodeHtml.styles = Object.assign(Object.assign({}, nodeHtml.styles), css[el + " " + nodeHtml.tag]);
            });
            if (tagClosestParent)
                nodeHtml.styles = Object.assign(Object.assign({}, nodeHtml.styles), css[tagClosestParent + " > " + nodeHtml.tag]);
            neighbors.forEach(el => {
                nodeHtml.styles = Object.assign(Object.assign({}, nodeHtml.styles), css[el + " ~ " + nodeHtml.tag]);
            });
            if (nearestNeighbor)
                nodeHtml.styles = Object.assign(Object.assign({}, nodeHtml.styles), css[nearestNeighbor + " + " + nodeHtml.tag]);
        }
        if ((_a = nodeHtml === null || nodeHtml === void 0 ? void 0 : nodeHtml.children) === null || _a === void 0 ? void 0 : _a.length)
            nodeHtml.children = getChildren(nodeHtml, css, { stylesOfParent, tagParents });
        return nodeHtml;
    };
    const objStyles = {};
    css === null || css === void 0 ? void 0 : css.forEach(el => {
        objStyles[el.selector] = el.declarations;
    });
    console.log(objStyles);
    const newHtml = setStyles(html, objStyles, {
        stylesOfParent: {}, tagParents: [], tagClosestParent: null, neighbors: [], nearestNeighbor: null
    });
    return newHtml;
};
parser(html, css);
