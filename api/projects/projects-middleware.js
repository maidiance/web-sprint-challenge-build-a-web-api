// add middlewares here related to projects
const Projects = require('./projects-model');

function logger(req, res, next) {
    console.log({
        method: `${req.method}`,
        url: `${req.url}`,
        timestamp: `${Date.now()}`
    });
    next();
}

module.exports = {
    logger
};