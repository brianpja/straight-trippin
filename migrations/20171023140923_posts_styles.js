
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts_styles', (table) => {
    table.increments();
    table.integer('post_id').references('posts.id').notNullable().onDelete('CASCADE');
    table.integer('style_id').references('styles.id').notNullable().onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts_styles');
};
