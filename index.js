const express = require('express');
const { BEEP_CODES } = require('@yandex-blitz/phone');

const createApp = ({ phone }) => {
    const app = express();

    // звонит по номеру записанному в "быстром наборе" под цифрой digit
    app.get('/speeddial/:digit', async (req, res) => {
        try {
            const value = await phone.getData();
            const speeddialDict = JSON.parse(value);

            await phone.connect();
            phone.dial(speeddialDict[req.params.digit]);

            res.sendStatus(200);
        } catch (error) {
            phone.beep(BEEP_CODES.ERROR);
            res.sendStatus(500);
        }
    });

    // записывает в "быстрый набор" под цифру digit номер phonenumber
    app.post('/speeddial/:digit/:phonenumber', async (req, res) => {
        try {
            const value = await phone.getData();
            const speeddialDict = JSON.parse(value);
            speeddialDict[req.params.digit] = Number(req.params.phonenumber);

            await phone.setData(JSON.stringify(speeddialDict));
            phone.beep(BEEP_CODES.SUCCESS);

            res.sendStatus(200);
        } catch (error) {
            phone.beep(BEEP_CODES.ERROR);
            res.sendStatus(500);
        }
    });

    return app;
};

exports.createApp = createApp;
