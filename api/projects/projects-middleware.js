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

function validateProject(req, res, next) {
    const project = req.body;
    if(!project.name || !project.description || project.completed == null){
        res.status(400).json({message: 'missing required field(s)'});
    } else if(!project.completed) {
        req.project = {
            completed: false,
            ...project
        }
        next();
    } else {
        req.project = project;
        next();
    }
}

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
        .then(resp => {
            if(resp == null){
                res.status(404).json({message: `project ${id} could not be found`});
            } else {
                req.project = resp;
                next();
            }
        })
        .catch(() => {
            res.status(500).json({message: 'could not validate project'});
        })
}

module.exports = {
    logger,
    validateProject,
    validateProjectId
};