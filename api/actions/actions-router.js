// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model.js');
const { validateActionId, validateAction, validateProjectId } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
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

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

router.post('/', validateAction, validateProjectId, (req, res) => {
    Actions.insert(req.action)
        .then(() => {
            res.status(201).json(req.action);
        })
        .catch(() => {
            res.status(500).json({message: 'failed to post action'});
        })
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
    const { id } = req.params;
    Actions.update(id, req.action)
        .then(resp => {
            res.status(200).json(resp);
        })
        .catch(() => {
            res.status(500).json({message: 'failed to update action'});
        })
});

router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(() => {
            res.status(200).json();
        })
        .catch(() => {
            res.status(500).json({message: 'failed to delete action'});
        })
});

module.exports = router;