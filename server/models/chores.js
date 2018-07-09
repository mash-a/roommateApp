const knex = require('../db');

const index = () => {
  return knex('chores')
    .then(rows => rows)
    .catch(error => {console.error(error);});
};
const show = id => {
  return knex('chores')
    .then(rows => rows[0])
    .catch(error => {console.error(error);});
};
const create = ({name, task_name, due_date, frequency, unique_id}) => {
  return knex('chores')
    .returning('*')
    .insert({name, task_name, due_date, frequency, unique_id})
    .then(row => row[0])
    .catch(error => {console.error(error);});
};
const update = (id, updates) => {
  return knex('chores')
    .returning('*')
    .update({...updates, updated_at: new Date(Date.now()).toISOString() })
    .where('id', id)
    .then(row => row[0])
    .catch(error => {console.error(error);});
};
const destroy = (id) => {
  return knex('chores')
    .returning('*')
    .del()
    .where('id', id)
    .then(row => row[0])
    .catch(error => {console.error(error);});
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
