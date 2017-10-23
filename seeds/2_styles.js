
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('styles').del()
    .then(function () {
      // Inserts seed entries
      return knex('styles').insert([
        {id: 1, name: 'Weekend Break'},
        {id: 2, name: 'Package/All Inclusive'},
        {id: 3, name: 'Group Tour'},
        {id: 4, name: 'Road Trip'},
        {id: 5, name: 'Volunteer Travel'},
        {id: 6, name: 'Backpacking'},
        {id: 7, name: 'Gap Year'},
        {id: 8, name: 'Visiting Friends/Relatives'},
        {id: 9, name: 'Event Travel'},
        {id: 10, name: 'Business Travel'},
        {id: 11, name: 'Long Term Travel'},
        {id: 12, name: 'Luxury Travel'},
        {id: 13, name: 'Family Travel'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('styles_id_seq', (SELECT MAX(id) FROM styles));"
      );
    });
};
