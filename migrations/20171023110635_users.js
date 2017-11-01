
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.date('birthdate').notNullable();
    table.string('location').defaultTo('');
    table.string('status').defaultTo('blank');
    table.string('img').defaultTo('http://res.cloudinary.com/hs8ytl7eb/image/upload/v1509559013/blank-profile-picture_h9yvyo.png');
    table.string('hashed_password').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
