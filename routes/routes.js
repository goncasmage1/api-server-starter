// import other routes
const countRoutes = require('./count');
const isLootRoutes = require('./is_loot');
const lootDataRoutes = require('./loot_data');
const skillDataRoutes = require('./skill_data');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    countRoutes(app, fs);
    isLootRoutes(app, fs);
    lootDataRoutes(app, fs);
    skillDataRoutes(app, fs);
};

module.exports = appRouter;