import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'gpdb_discover',
    uiExports: {
      app: {
        title: 'Gpdb Discover',
        description: 'gpdb discover',
        main: 'plugins/gpdb_discover/app',
      },
      hacks: [
        'plugins/gpdb_discover/hack'
      ],
      styleSheetPaths: require('path').resolve(__dirname, 'public/app.scss'),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      exampleRoute(server);
    }
  });
}
