module.exports = ({ env }) => ({
  // ..
  transformer: {
    enabled: true,
    config: {
      prefix: "/api/",
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
  email: {
    config: {
      provider: "sendgrid", // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "grymore@grymore.xyz",
        defaultReplyTo: "grymore@grymore.xyz",
        testAddress: "grymore@grymore.xyz",
      },
    },
  },
  // "entity-relationship-chart": {
  //   enabled: true,
  //   config: {
  //     exclude: [
  //       "strapi::core-store",
  //       "webhook",
  //       "admin::permission",
  //       "admin::user",
  //       "admin::role",
  //       "admin::api-token",
  //       "plugin::upload.file",
  //       "plugin::i18n.locale",
  //       "plugin::users-permissions.permission",
  //       "plugin::users-permissions.role",
  //     ],
  //   },
  // },
  // ..
});
