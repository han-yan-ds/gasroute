
module.exports = {

  development: {
    client: 'pg',
    // connection: 'postgres://localhost/greenfield',
    connection: {
      host: 'localhost',
      port: 4000, // not sure about syntax for this one
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