const fs = require('fs');
const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.static('./static'));
app.use(express.json());
app.use(cors());

app.get('/data', (request, response) => {
    fs.readFile('./catalog.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('readFile Error', err);
            response.status(500).send('Server Error');
            return;
        }

        const catalog = JSON.parse(data);

        response.json(catalog);
    });
});

app.get('/cart', (request, response) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('readFile Error', err);
            response.status(500).send('Server Error');
            return;
        }

        const cart = JSON.parse(data);

        response.json(cart);
    });
});

app.post('/addToCart', (request, response) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Something goes wrong');
            return;
        }

        const cart = JSON.parse(data);
        cart.push(request.body);

        fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                return;
            }
            response.send('OK');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is listening port 3000');
});
