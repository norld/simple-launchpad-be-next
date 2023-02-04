module.exports = {
  routes: [
    {
      method: "POST",
      path: "/drafted-launchpad",
      handler: "drafted-launchpad.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
