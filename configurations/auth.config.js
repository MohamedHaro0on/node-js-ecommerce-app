const config = {
  secret: process.env.SECRET_ACCESS_TOKEN,
  jwtExpiration: 3600, // 1 hour
  refreshSecret: process.env.SECRET_REFRESH_TOKEN,
  jwtRefreshExpiration: 86400, // 24 hours

  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};

export default config;
