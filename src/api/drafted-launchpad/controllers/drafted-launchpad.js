"use strict";

/**
 * A set of functions called "actions" for `drafted-launchpad`
 */

module.exports = {
  create: async (ctx, next) => {
    try {
      console.log("Creating...", ctx.request.body);
      const { data } = ctx.request.body;
      const {
        hardcap,
        softcap,
        minContribution,
        maxContribution,
        priceLaunch,
        priceOffering,
        tokenInfo,
        linkWhitepaper,
        linkWebsite,
        linkContract,
        linkDiscord,
        linkTelegram,
        linkTwitter,
        linkInstagram,
        currency,
      } = JSON.parse(data);
      ctx.body = await strapi.db.query("api::launchpad.launchpad").create({
        data: {
          hardcap,
          softcap,
          minContribution,
          maxContribution,
          priceLaunch,
          priceOffering,
          tokenInfo,
          linkWhitepaper,
          linkWebsite,
          linkContract,
          linkDiscord,
          linkTelegram,
          linkTwitter,
          linkInstagram,
          currency,
        },
      });
    } catch (err) {
      ctx.body = err;
    }
  },
};
