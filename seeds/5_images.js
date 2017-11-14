
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('images_id_seq', (SELECT MAX(id) FROM images));"
      );
    });
};
