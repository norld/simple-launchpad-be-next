module.exports = {
  afterUpdate(event) {
    const { result, params } = event;
    console.log(event);
    params.data.verifiedAt &&
      !params.data.deployed &&
      strapi
        .service("api::launchpad.auto-deployer")
        .deployFromFactory(result.id);
  },
};
