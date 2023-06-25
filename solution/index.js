// STYLE MAPPERS
const TEXT_STYLES_MAPPER = {
    fontSize: (value) => `font-size: ${value}px;`,
    fontWeight: (value) => `font-weight: ${value};`,
    fontFamily: (value) => `font-family: ${value};`,
    textAlignHorizontal: (value) => `text-align: ${value.toLowerCase()};`,
    width: (value) => `width: ${value}px;`,
    paddingLeft: (value) => `padding-left: ${value}px;`,
    paddingRight: (value) => `padding-right: ${value}px;`,
    paddingTop: (value) => `padding-top: ${value}px;`,
    paddingBottom: (value) => `padding-bottom: ${value}px;`,
    backgroundColor: (value) => `background-color: ${value};`,
    boxShadow: (value) => `box-shadow: ${value};`,
}



// BUILDER
const buildBlock = ({ type, content, className, style }) => {
    return `<${type} class="${className}" style="${style}">${content}</${type}>`;
};


// GETTERS
const getTextStyles = (node) => {
    const styleArr = [];
    if (node.style) {
        for (let [key, value] of Object.entries(node.style)) {
            if (TEXT_STYLES_MAPPER[key]) {
                styleArr.push(TEXT_STYLES_MAPPER[key](value));
            }
        }
    }
    if (node.effects) {
        node.effects.forEach(item => {
            if (item.type === "DROP_SHADOW") {
                if (TEXT_STYLES_MAPPER["boxShadow"]) {
                    styleArr.push(TEXT_STYLES_MAPPER["boxShadow"](`${item.offset.x}px ${item.offset.y}px ${item.radius}px rgba(${(Math.trunc(item.color.r * 100))}, ${(Math.trunc(item.color.g * 100))}, ${(Math.trunc(item.color.b * 100))}, ${item.color.a})`));
                }
            }
        })
    }
    for (let [key, value] of Object.entries(node)) {

        if (key === "absoluteBoundingBox") {
            styleArr.push(TEXT_STYLES_MAPPER["width"](value.width));
        } else if (key === "backgroundColor") {
            styleArr.push(TEXT_STYLES_MAPPER["backgroundColor"](`rgba(${Math.trunc(value.r * 255)}, ${Math.trunc(value.g * 255)}, ${Math.trunc(value.b * 255)}, ${value.a})`));
        } else if (TEXT_STYLES_MAPPER[key]) {
            styleArr.push(TEXT_STYLES_MAPPER[key](value));
        }

    }
    return styleArr.join(' ');
}

const PRIMITIVES = {
    TEXT: (node) => {
        return buildBlock({
            type: 'span',
            content: node.characters,
            className: node.type,
            style: getTextStyles(node),
        });
    },
    FRAME: (node) => {
        return buildBlock({
            type: 'div',
            content: traverse(node.children[0]),
            className: node.type,
            style: getTextStyles(node),
        });
    },
    INSTANCE: (node) => {
        return buildBlock({
            type: 'div',
            content: "+++",
            className: node.type,
            style: "+++",
        });
    },
    RECTANGLE: (node) => {
        return buildBlock({
            type: 'div',
            content: "+++",
            className: node.type,
            style: "+++",
        });
    },
};

const parse = (entry) => {
    return traverse(entry.children[0]);
};

const traverse = (node) => {
    console.log("******************************************")
    console.log(node.id, node.type, node.name)
    return PRIMITIVES[node.type](node);
}


module.exports = function (json) {
    const entry = json.document.children[0];
    return parse(entry);
};
