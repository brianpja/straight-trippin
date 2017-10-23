
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1,
          user_id: 1,
          target_id: null,
          location: 'Spain',
          content: 'Some content about my time that I spent in Spain. So fun!',
          year: 2015},
        {id: 2,
          user_id: 1,
          target_id: null,
          location: 'Namibia',
          content: 'Some content about my time that I spent in Namibia. So cool!',
          year: 2015},
        {id: 3,
          user_id: 1,
          target_id: null,
          location: 'Norway',
          content: 'This is content about my time I spent in Norway. So sweet!',
          year: 2015}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));"
      );
    });
};
