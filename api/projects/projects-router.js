// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { validateId } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    let projects = [];
    Projects.get()
        .then(resp => {
            projects = resp;
        })
        .catch(() => {
            res.status(500).json({message: 'failed to get projects'});
        })
    res.status(200).json(projects);
});

router.get('/:id', validateId, (req, res) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(() => {
            res.status(500).json({message: 'failed to get project'});
        })
});

module.exports = router;