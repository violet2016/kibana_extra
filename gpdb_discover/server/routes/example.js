export default function (server) {

  server.route({
    path: '/api/gpdb_discover/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

}
