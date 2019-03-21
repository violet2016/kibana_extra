export default function (server) {

  server.route({
    path: '/api/gpdb_log/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

}
