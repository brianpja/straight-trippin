module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'straight_trippin',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
