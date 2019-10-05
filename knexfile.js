
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'gasprices',
      user: 'han',
      password: 'face468a',
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 100,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
  },

}