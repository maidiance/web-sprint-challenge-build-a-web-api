// add middlewares here related to actions
const Actions = require('./actions-model');

function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
        .then(resp => {
            if(resp == null){
                res.status(404).json({message: `action ${id} could not be found`});
            } else {
                req.action = resp;
                next();
            }
        })
        .catch(() => {
            res.status(500).json({message: 'could not validate action'});
        })
}

function validateAction(req, res, next) {
    const action = req.body;
    if(action.project_id == null){
        req.params.id = -1;
    }else {
        req.params.id = action.project_id;
    }
    if(!action.description || !action.notes){
        res.status(400).json({message: 'missing required field(s)'});
    } else if(!action.completed) {
        req.action = {
            completed: false,
            ...action
        }
        next();
    } else {
        req.action = action;
        next();
    }
}

module.exports = {
    validateActionId,
    validateAction
};