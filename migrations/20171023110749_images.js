
exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', (table) => {
    table.increments();
    table.integer('post_id').references('posts.id').notNullable().onDelete('CASCADE');
    table.string('url').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images');
};
