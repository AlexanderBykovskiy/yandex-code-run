export const html = {
    "type": "ELEMENT",
    "tag": "parent",
    "styles": {},
    "children": [
        {
            "type": "TEXT",
            "text": "\n    "
        },
        {
            "type": "ELEMENT",
            "tag": "tag",
            "styles": {},
            "children": [
                {
                    "type": "TEXT",
                    "text": "TEXT"
                }
            ]
        },
        {
            "type": "TEXT",
            "text": "\n    "
        },
        {
            "type": "ELEMENT",
            "tag": "tag",
            "styles": {},
            "children": [
                {
                    "type": "TEXT",
                    "text": "TEXT"
                }
            ]
        },
        {
            "type": "ELEMENT",
            "tag": "tag",
            "styles": {},
            "children": [
                {
                    "type": "TEXT",
                    "text": "TEXT"
                }
            ]
        },
        {
            "type": "ELEMENT",
            "tag": "tag2",
            "styles": {},
            "children": [
                {
                    "type": "TEXT",
                    "text": "TEXT"
                }
            ]
        },
        {
            "type": "TEXT",
            "text": "\n    "
        },
        {
            "type": "ELEMENT",
            "tag": "tag",
            "styles": {},
            "children": [
                {
                    "type": "ELEMENT",
                    "tag": "tag2",
                    "styles": {},
                    "children": [
                        {
                            "type": "TEXT",
                            "text": "TEXT"
                        }
                    ]
                }
            ]
        },
        {
            "type": "ELEMENT",
            "tag": "tag2",
            "styles": {},
            "children": [
                {
                    "type": "TEXT",
                    "text": "TEXT"
                }
            ]
        },
        {
            "type": "TEXT",
            "text": "\n"
        }
    ]
};
export const css = [
    {
        "selector": "parent",
        "declarations": {
            "color": "rgb(0, 0, 0)",
            "text-align": "left",
            "font-size": "16px"
        }
    },
    {
        "selector": "tag",
        "declarations": {
            "color": "rgb(0, 255, 0)",
            "font-size": "13px"
        }
    },
    {
        "selector": "tag2",
        "declarations": {
            "text-align": "right"
        }
    },
    {
        "selector": "tag + tag2",
        "declarations": {
            "color": "rgb(255, 255, 255)",
            "text-align": "right"
        }
    }
];
