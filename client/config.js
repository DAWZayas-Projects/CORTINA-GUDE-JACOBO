exports.client = {
  host: process.env.AIPOWER_CLIENT_URL || 'localhost',
  port: process.env.AIPOWER_CLIENT_PORT || 3000,
  protocol: process.env.AIPOWER_CLIENT_PROTOCOL || 'http',
};

exports.server = {
  host: process.env.AIPOWER_SERVER_URL || 'localhost',
  port: process.env.AIPOWER_SERVER_PORT || 5000,
  protocol: process.env.AIPOWER_SERVER_PROTOCOL || 'http',
};
