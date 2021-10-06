module.exports = {
  images: {
    domains: ['https:/raw.githubusercontent.com', "raw.githubusercontent.com"],
  },
  env: {
    base_api: "http://laravel-chat-irsan.000webhostapp.com/api/",
    PUSHER_APP_ID: "1251451",
    PUSHER_APP_KEY: "6f3367e70072cd5fd433",
    PUSHER_APP_SECRET: "0a51759393f0a7c05111",
    PUSHER_APP_CLUSTER: "ap1"
  },
  async rewrites() {
    return [
      { source: "/register", destination: "/auth/register" },
      { source: "/login", destination: "/auth/login" },
    ];
  }
}