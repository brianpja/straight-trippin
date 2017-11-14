
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments));"
      );
    });
};
