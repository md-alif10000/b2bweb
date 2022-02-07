module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = { topLevelAwait: true ,layers:true};
    return config;
  },
  images:{
    domains:["res.cloudinary.com"]
  }
}
