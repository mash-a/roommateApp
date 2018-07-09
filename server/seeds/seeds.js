
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('chores').del()
    .then(function () {
      // Inserts seed entries
      return knex('chores').insert([
        {id: 1, name: 'Jon',task_name: 'Guard the wall',due_date: 'April 30',frequency: '1x a day'},
        {id: 2, name: 'Arya',task_name: 'Feed the cats',due_date: 'April 30',frequency: '2x a day'},
        {id: 3, name: 'Sansa',task_name: 'Sew a new tablecloth',due_date: 'June 10',frequency: '1x'}
      ]);
    });
};
