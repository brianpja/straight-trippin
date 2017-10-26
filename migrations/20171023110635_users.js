
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.date('birthdate').notNullable();
    table.string('location').defaultTo('');
    table.string('status');
    table.string('large_img').defaultTo('http://lorempixel.com/300/300');
    table.string('small_img').defaultTo('http://lorempixel.com/40/40');
    table.string('hashed_password').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
