
const count_routes = (app, fs) => {

    // variables
    const dataPath = './data/count.json';

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
    app.get('/count', (req, res) => {
        readFile(data => {
            var newID = data["num"] + 1;
            data["num"] = newID;
            writeFile(JSON.stringify(data, null, 2), () => {
                console.log("\nNew ID: " + newID.toString());
                res.send(newID.toString());
            });
        },
        true);
    });
};

module.exports = count_routes;