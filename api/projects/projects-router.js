// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model.js');
const { validateProject, validateProjectId } = require('./projects-middleware');
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(resp => {
            if(resp == null) {
                res.status(200).json([]);
            } else {
                res.status(200).json(resp);
            }
        })
        .catch(() => {
            res.status(500).json({message: 'failed to get projects'});
        })
});

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.project)
        .then(() => {
            res.status(201).json(req.project);
        })
        .catch(() => {
            res.status(500).json({message: 'failed to post project'});
        })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    const { id } = req.params;
    Projects.update(id, req.project)
        .then(resp => {
            if(resp == null) {
                res.status(404).json({message: `project ${id} not found`});
            } else {
                res.status(200).json(resp);
            }
        })
        .catch(() => {
            res.status(500).json({message: 'failed to update project'});
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Projects.remove(id)
        .then(count => {
            if(count === 0) {
                res.status(404).json({message: `project ${id} not found`});
            } else {
                res.status(200).json();
            }
        })
        .catch(() => {
            res.status(500).json({message: 'failed to delete project'});
        })
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
        .then(resp => {
            if(resp == null) {
                res.status(200).json([]);
            } else {
                res.status(200).json(resp);
            }
        })
        .catch(() => {
            res.status(500).json({message: 'failed to get actions'});
        })
});

module.exports = router;