
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1,
        email: 'brianpja@gmail.com',
        first_name: 'Brian',
        last_name: 'James',
        birthdate: '1986-07-30',
        status: 'chillin',
        location: 'Seattle, WA, USA',
        hashed_password: 'password'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
