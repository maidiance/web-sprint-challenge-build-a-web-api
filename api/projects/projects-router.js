// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { validateId } = require('/projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    const projects = Projects.get();
    res.status(200).json(projects);
});

module.exports = router;