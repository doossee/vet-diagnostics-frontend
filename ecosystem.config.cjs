module.exports = {
  apps: [
    {
      name: "vet-hab-ai-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "./",
      env: {
        NODE_ENV: "production",
        PORT: 3030,
      },
    },
  ],
};
