
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts_styles').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts_styles').insert([
        
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('posts_styles_id_seq', (SELECT MAX(id) FROM posts_styles));"
      );
    });
};
