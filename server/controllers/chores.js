const choreModel = require('../models/chores');

const index = (req, res) => {
  choreModel.index()
    .then(result => {
      res.json(result);
    })
    .catch(error => {console.error(error); });
};

const show = (req, res) => {
  choreModel.show(req.params.id)
    .then (result => {
      res.json(result);
    })
    .catch(error => {console.error(error);});
}

const create = (req, res) => {
  choreModel.create(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(error => {console.error(error);});
}

const update = (req, res) => {
  choreModel.update(req.params.id, req.body)
    .then(result => {
      res.json(result);
    })
    .catch(error => {console.error(error);});
}

const destroy = (req, res) => {
  choreModel.destroy(req.params.id)
    .then(result => {
      res.json(result);
    })
    .catch(error => {console.error(error);});
}
module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
