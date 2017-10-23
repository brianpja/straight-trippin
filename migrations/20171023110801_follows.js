
exports.up = function(knex, Promise) {
  return knex.schema.createTable('follows', (table) => {
    table.increments();
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');
    table.integer('friend_id').references('users.id').notNullable().onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('follows');
};
