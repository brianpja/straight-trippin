
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {id: 1,
          post_id: 1,
          url: 'http://res.cloudinary.com/hs8ytl7eb/image/upload/v1510600910/IMG_2532_jlgx6d.jpg'},
        {id: 2,
          post_id: 1,
          url: 'http://res.cloudinary.com/hs8ytl7eb/image/upload/v1510600911/IMG_2578_yplfo4.jpg'},
        {id: 3,
          post_id: 1,
          url: 'http://res.cloudinary.com/hs8ytl7eb/image/upload/v1510600910/IMG_2508_yy2zhn.jpg'},
        {id: 4,
          post_id: 2,
          url: 'http://res.cloudinary.com/hs8ytl7eb/image/upload/v1510600920/fullsizeoutput_df_iwstgw.jpg'},
        {id: 5,
          post_id: 2,
          url: 'http://res.cloudinary.com/hs8ytl7eb/image/upload/v1510600919/IMG_3003_dxpgim.jpg'},
        {id: 6,
          post_id: 2,
          url: 'http://res.cloudinary.com/hs8ytl7eb/image/upload/a_0/v1510600918/IMG_2986_cvtgwg.jpg'},
        {id: 7,
          post_id: 3,
          url: 'http://res.cloudinary.com/hs8ytl7eb/image/upload/a_0/v1510600905/IMG_2255_ntnfp9.jpg'},
        {id: 8,
          post_id: 3,
          url: 'http://res.cloudinary.com/hs8ytl7eb/image/upload/a_0/v1510600903/IMG_2149_dafkxd.jpg'},
        {id: 9,
          post_id: 3,
          url: 'http://res.cloudinary.com/hs8ytl7eb/image/upload/a_0/v1510600908/IMG_2333_uum0vy.jpg'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('images_id_seq', (SELECT MAX(id) FROM images));"
      );
    });
};
