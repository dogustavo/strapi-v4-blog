module.exports = {
  routes: [
    {
      method: "GET",
      path: "/posts-report",
      handler: "posts-report.findAllSlugs",
      config: {
        policies: [],
      },
    },
  ],
};
