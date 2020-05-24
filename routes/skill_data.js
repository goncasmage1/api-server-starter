
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
            const newUserId = Object.keys(data).length + 1;
            var id = req.body.id;
            if (id >= newUserId) {
                data[newUserId.toString()] = req.body;
                writeFile(JSON.stringify(data, null, 2), () => {
                    console.log("New Skill Data");
                    res.status(200).send('OK');
                });
            }
            else {
                res.status(200).send('OK');
            }
        },
        true);
    });
};

module.exports = skill_data_routes;