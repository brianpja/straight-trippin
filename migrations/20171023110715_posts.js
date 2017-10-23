
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');
    table.integer('target_id').references('users.id').onDelete('CASCADE').defaultTo(null);
    table.integer('style_id').references('styles.id').onDelete('CASCADE').defaultTo(null);
    table.string('location').defaultTo('');
    table.text('content').notNullable();
    table.integer('year');
    table.string('duration');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
