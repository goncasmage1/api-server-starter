
const loot_data_routes = (app, fs) => {

    // variables
    const dataPath = './data/loot_data.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    };

    // CREATE
    app.post('/loot_data', (req, res) => {
        readFile(data => {
            const newUserId = Object.keys(data).length + 1;
            var id = req.body.id;
            if (id >= newUserId) {
                data[newUserId.toString()] = req.body;
                writeFile(JSON.stringify(data, null, 2), () => {
                    console.log("New Loot Data");
                    res.status(200).send('OK');
                });
            }
            else {
                res.status(200).send('OK');
            }
        },
        true);
    });
    
    // READ
    app.get('/loot_data', (req, res) => {
        readFile(data => {
            res.send(data.toString());
        },
        true);
    });
};

module.exports = loot_data_routes;
