
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {id: 1,
          post_id: 1,
          url: 'http://lorempixel.com/550/400'},
        {id: 2,
          post_id: 2,
          url: 'http://lorempixel.com/550/400'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('images_id_seq', (SELECT MAX(id) FROM images));"
      );
    });
};
