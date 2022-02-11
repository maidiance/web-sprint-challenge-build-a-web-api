// add middlewares here related to projects
const Projects = require('./projects-model');

function validateId(req, res, next) {
    const id = req.params.id;
    Projects.update(id)
        .then(project => {
            if(project == null) {
                res.status(404).json({message: 'project not found'});
            } else {
                res.project = project;
                next();
            }
        })
        .catch(() => {
            res.status(500).json({message: 'failed to validate id'});
        })
}

module.exports = {
    validateId
};