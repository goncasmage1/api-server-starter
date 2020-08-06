
const skill_data_routes = (app, fs) => {

    // variables
    const dataPath = './data/skill_data.json';

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
    app.post('/skill_data', (req, res) => {
        readFile(data => {
            var id = req.body.id;
            if (!data.hasOwnProperty(id.toString())) {
                data[id.toString()] = req.body;
                writeFile(JSON.stringify(data, null, 2), () => {
                    console.log("New Loot Data");
                    res.status(200).send('OK');
                });
            }
            else {
                res.status(200).send('OK');
            }z
        },
        true);
    });
    
    // READ
    app.get('/skill_data', (req, res) => {
        readFile(data => {
            res.send(data);
        },
        false);
    });
};

module.exports = skill_data_routes;
