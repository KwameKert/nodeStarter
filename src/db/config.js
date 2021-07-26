module.exports = {
  development: {
    username: "postgres",
    password:  "kwamepass",
    database: "dev-ci-messenger",
    host: "localhost",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password:  "kwamepass",
    database: "test-ci-messenger",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  staging: {
    username: "postgres",
    password:  "Asante=0198",
    database: "staging-ci-messenger",
    //host: "127.0.0.1",
    host: "165.227.192.124",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password:  "A$@nte=0198",
    database: "production-ci-messenger",
    host: "142.93.57.146",
    dialect: "postgres"
  }
}
