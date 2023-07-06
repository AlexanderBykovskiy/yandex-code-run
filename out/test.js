const parser = require('./main');
const html = {
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
                        },
                        {
                            "type": "ELEMENT",
                            "tag": "tag3",
                            "styles": {},
                            "children": [
                                {
                                    "type": "TEXT",
                                    "text": "TEXT1"
                                },
                                {
                                    "type": "TEXT",
                                    "text": "TEXT2"
                                },
                            ]
                        },
                        {
                            "type": "ELEMENT",
                            "tag": "tag4",
                            "styles": {},
                            "children": [
                                {
                                    "type": "TEXT",
                                    "text": "TEXT3"
                                },
                                {
                                    "type": "TEXT",
                                    "text": "TEXT4"
                                },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "TEXT",
            "text": "\n"
        }
    ]
};
const css = [
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
            "color": "rgb(0, 0, 255)",
            "text-align": "right"
        }
    },
    {
        "selector": "tag3",
        "declarations": {
            "color": "rgb(0, 255, 255)",
            "text-align": "right"
        }
    },
    {
        "selector": "tag2 tag4",
        "declarations": {
            "color": "rgb(60, 70, 50)",
            "text-align": "right"
        }
    },
    {
        "selector": "tag2 ~ tag3",
        "declarations": {
            "color": "rgb(60, 70, 50)",
            "text-align": "right"
        }
    },
    {
        "selector": "tag + tag3",
        "declarations": {
            "color": "rgb(60, 70, 50)",
            "text-align": "right"
        }
    }
];
console.log(parser(html, css));
