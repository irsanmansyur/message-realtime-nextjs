module.exports = {
  images: {
    domains: ['https:/raw.githubusercontent.com', "raw.githubusercontent.com", "i.imgur.com"],
  },
  env: {
    base_url: "https://message-realtime-nextjs-rho.vercel.app/", // https://message-realtime-nextjs-rho.vercel.app/  http://localhost:3000/
    base_api: "https://laravel-chat-irsan.000webhostapp.com/api/", // https://laravel-chat-irsan.000webhostapp.com/api/   ==   http://127.0.0.1:8001/api/
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