// STYLE MAPPERS
const TEXT_STYLES_MAPPER = {
    fontSize: (value) => `font-size: ${value}px;`,
    fontWeight: (value) => `font-weight: ${value};`,
    fontFamily: (value) => `font-family: ${value};`,
    color: (value) => `color: ${value};`,
    textAlignHorizontal: (value) => `text-align: ${value.toLowerCase()};`,
    width: (value) => `width: ${value}px;`,
    paddingLeft: (value) => `padding-left: ${value}px;`,
    paddingRight: (value) => `padding-right: ${value}px;`,
    paddingTop: (value) => `padding-top: ${value}px;`,
    paddingBottom: (value) => `padding-bottom: ${value}px;`,
    backgroundColor: (value) => `background-color: ${value};`,
    boxShadow: (value) => `box-shadow: ${value};`,
    display: (value) => `display: ${value};`,
    flexDirection: (value) => `flex-direction: ${value};`,
    primaryAxisAlignItems: (value) => `justify-content: ${value};`,
    counterAxisAlignItems: (value) => `align-items: ${value.toLowerCase()};`,
    itemSpacing: (value) => `gap: ${value}px;`,
    borderWidth: (value) => `border-width: ${value}px;`,
    borderStyle: (value) => `border-style: ${value.toLowerCase()};`,
    borderColor: (value) => `border-color: ${value};`,
    boxHeight: (value) => `height: ${value}px;`,
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
            styleArr.push(TEXT_STYLES_MAPPER["boxHeight"](value.height));
        } else if (key === "backgroundColor") {
            styleArr.push(TEXT_STYLES_MAPPER["backgroundColor"](`rgba(${Math.trunc(value.r * 255)}, ${Math.trunc(value.g * 255)}, ${Math.trunc(value.b * 255)}, ${value.a})`));
        } else if (key === "layoutMode") {
            if (value === "HORIZONTAL") {
                styleArr.push(TEXT_STYLES_MAPPER["display"]("flex"));
                styleArr.push(TEXT_STYLES_MAPPER["flexDirection"]("row"));
            } else if (value === "VERTICAL") {
                styleArr.push(TEXT_STYLES_MAPPER["display"]("flex"));
                styleArr.push(TEXT_STYLES_MAPPER["flexDirection"]("column"));
            }
        } else if (key === "fills") {
            if (value[0] && value[0]?.color?.r >= 0) {
                styleArr.push(TEXT_STYLES_MAPPER[node.type === "RECTANGLE" ? "backgroundColor" : "color"](`rgba(${Math.trunc(value[0].color.r * 255)}, ${Math.trunc(value[0].color.g * 255)}, ${Math.trunc(value[0].color.b * 255)}, ${value[0].color.a})`));
            }

        } else if (key === "strokes") {
            if (value[0] && value[0]?.color?.r >= 0 && value[0]?.type) {
                styleArr.push(TEXT_STYLES_MAPPER["borderStyle"](value[0].type));
                styleArr.push(TEXT_STYLES_MAPPER["borderColor"](`rgba(${Math.trunc(value[0].color.r * 255)}, ${Math.trunc(value[0].color.g * 255)}, ${Math.trunc(value[0].color.b * 255)}, ${value[0].color.a})`));
                styleArr.push(TEXT_STYLES_MAPPER["borderWidth"](1));
            }
        } else if (key === "primaryAxisAlignItems") {
            if (value === "SPACE_BETWEEN") {
                styleArr.push(TEXT_STYLES_MAPPER["primaryAxisAlignItems"]("space-between"));
            }
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
        const parsedChildren = node.children.map(item => traverse(item)).join("");
        return buildBlock({
            type: 'div',
            content: parsedChildren,
            className: node.type,
            style: getTextStyles(node) + " box-sizing: border-box;",
        });
    },
    INSTANCE: (node) => {
        const parsedChildren = node.children.map(item => traverse(item)).join("");
        return buildBlock({
            type: 'div',
            content: parsedChildren,
            className: node.type,
            style: getTextStyles(node) + " box-sizing: border-box;",
        });
    },
    RECTANGLE: (node) => {
        return buildBlock({
            type: 'div',
            content: "",
            className: node.type,
            style: getTextStyles(node) + " box-sizing: border-box;",
        });
    },
};

const parse = (entry) => {
    return traverse(entry.children[0]);
};

const traverse = (node) => {
    console.log(node.id, node.type, node.name)
    return PRIMITIVES[node.type](node);
}


module.exports = function (json) {
    const entry = json.document.children[0];
    return parse(entry);
};
