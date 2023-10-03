module.exports = {
  HOST: "103.27.201.174",
  USER: "root",
  PASSWORD: "FLKxcp11881",
  DB: "koopai",
  dialect: "mariadb",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
