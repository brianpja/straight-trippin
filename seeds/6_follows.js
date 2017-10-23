
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('follows').del()
    .then(function () {
      // Inserts seed entries
      return knex('follows').insert([
        
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('follows_id_seq', (SELECT MAX(id) FROM follows));"
      );
    });
};
