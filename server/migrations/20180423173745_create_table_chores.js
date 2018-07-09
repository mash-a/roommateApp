
exports.up = function(knex, Promise) {
  return knex.schema.createTable('chores', table => {
    table.increments();
    table.string('name');
    table.string('task_name');
    table.string('due_date');
    table.string('frequency');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chores');
};
