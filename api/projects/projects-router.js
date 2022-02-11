// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model.js');

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
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'failed to get projects'});
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects.get(id)
        .then(resp => {
            if(resp == null) {
                res.status(404).json({message: `project ${id} not found`});
            } else {
                res.status(200).json(resp);
            }
        })
        .catch(() => {
            res.status(500).json({message: 'failed to get project'});
        })
});

module.exports = router;