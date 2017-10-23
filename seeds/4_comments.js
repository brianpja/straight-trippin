
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1,
          user_id: 1,
          post_id: 1,
          content: 'This really was so fun!'},
        {id: 2,
          user_id: 1,
          post_id: 1,
          content: 'Another one!'},
        {id: 3,
          user_id: 1,
          post_id: 2,
          content: 'Arbitrary third comment'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments));"
      );
    });
};
