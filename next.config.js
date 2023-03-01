// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   sw: "service-worker.js",
//   disable: process.env.NODE_ENV === "development",
// });

// module.exports = withPWA({
//   reactStrictMode: true,
// });

module.exports = {
  reactStrictMode: true,
  redirect: [{ source: "/campaigns", destination: "/", permanent: true }],
};
