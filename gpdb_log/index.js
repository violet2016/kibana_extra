import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'gpdb_log',
    uiExports: {
      app: {
        title: 'Gpdb Log',
        description: '6.5.5',
        main: 'plugins/gpdb_log/test_vis_app',
      },
      docViews: ['plugins/gpdb_log/analyze'], //point to public/analyze.js
      hacks: [
        'plugins/gpdb_log/hack'
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
      server.injectUiAppVars('gpdb_log', async () => {
        return await server.getInjectedUiAppVars('kibana');
      });
    }
  });
}
