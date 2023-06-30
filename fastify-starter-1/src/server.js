const app = require('fastify')();
const fs = require('node:fs');

const productsJson = fs.readFileSync(__dirname + '/data/products.json');
const products = JSON.parse(productsJson);


app.get('/health', async (req, res) => {
    const healthResponse = {
        statusCode: 200,
        message: 'Ok'
    };
    res.send(healthResponse);
});


app.get('/products', async (req, res) => {
    res.send(products.productList);
});


app.get('/products/:productId', async (req, res) => {
    const product = products.productList.find(product => product.id === +req.params.productId)
    if (product) {
        res.send(product);
    } else {
        const emptyResponse = {};
        res.code(404).send(emptyResponse);
    }
});


app.post('/products', async (req, res) => {
    const product = req.body;
    let maxId = 0;
    for (let i = 0; i < products.productList.length; i++) {
        if (products.productList[i].id > maxId) {
            maxId = products.productList[i].id;
        }
    }
    product.id = maxId + 1;
    products.productList.push(product);
    res.send(product);
});


app.put('/products/:productId', async (req, res) => {
    let product = req.body;
    let matchFound = false;
    for (let i = 0; i < products.productList.length; i++) {
        if (products.productList[i].id == req.params.productId) {
            product.id = products.productList[i].id;
            products.productList[i] = product;
            matchFound = true;
            break;
        }
    }
    if (matchFound) {
        res.send(product);
    } else {
        const emptyResponse = {};
        res.code(404).send(emptyResponse);
    }
});


app.delete('/products/:productId', async (req, res) => {
    let matchFound = false
    let product;
    for (let i = 0; i < products.productList.length; i++) {
        if (products.productList[i].id == req.params.productId) {
            product = products.productList[i];
            products.productList.splice(i, 1);
            matchFound = true;
            break;
        }
    }
    if (matchFound) {
        res.send(product);
    } else {
        const emptyResponse = {};
        res.code(404).send(emptyResponse);
    }
});


const startServer = async () => {
    try {
        const port = process.env.PORT || 3000
        await app.listen({port});
        console.log(`Fastify ready at http://localhost:${app.server.address().port}`);

    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

startServer();