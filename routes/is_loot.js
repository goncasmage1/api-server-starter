
const is_loot_routes = (app, fs) => {

    // variables
    const dataPath = './data/is_loot.json';

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

    // READ
    app.get('/is_loot', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            data["num"] = data["num"] == 1 ? 0 : 1;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.send((JSON.parse(data)["num"] == 1) ? "0" : "1");
            });
        });
    });
};

module.exports = is_loot_routes;