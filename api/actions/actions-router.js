// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model.js');

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

module.exports = router;