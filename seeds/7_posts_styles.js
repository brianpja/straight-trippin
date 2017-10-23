
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts_styles').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts_styles').insert([
        {id: 1,
          post_id: 1,
          style_id: 6},
        {id: 2,
          post_id: 2,
          style_id: 3,},
        {id: 3,
          post_id: 2,
          style_id: 4},
        {id: 4,
          post_id: 3,
          style_id: 8},
        {id: 5,
          post_id: 3,
          style_id: 6}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('posts_styles_id_seq', (SELECT MAX(id) FROM posts_styles));"
      );
    });
};
