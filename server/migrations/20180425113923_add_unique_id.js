  
exports.up = function(knex, Promise) {
  return knex.schema.table('chores', table => {
    table.string('unique_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('chores', table => {
    table.dropColumn('unique_id');
  })
};
