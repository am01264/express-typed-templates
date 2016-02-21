/**
 * Express middleware that selects the best template engine for a requests
 * accepted response type. Engines are handed over as-is to Express.
 *
 * In case no engine exists for a response type, we terminate the response with
 * a "HTTP 406 Not Acceptable" response.
 *
 * For more information on how we choose accepted types,
 * see http://devdocs.io/express/index#req.accepts
 *
 * @typedef {Object.<string, (string|Function)} MapAcceptToEngine
 * @param   {MapAcceptToEngine}   mapTypeToTemplateEngine A map looking like: {"type": "engine", ...}
 * @return  Function              Express middleware which you can use either router-wide or app-wide
 */
function ExpressTypedTemplates(mapTypeToTemplateEngine) {
  return fnETTMiddleware.bind(null, mapTypeToTemplateEngine);
}

/**
 * Handles the selection of template engine before the request gets processed.
 *
 * @param  {MapAcceptToEngine}  mapTpl  A map looking like: {"type": "engine", ...}
 * @param  {Express~Request}    rq      The current Express\Request object
 * @param  {Express~Response}   rs      The current Express\Response object
 * @param  {Function}           fnNext  A callback to initiate the next middleware
 */
function fnETTMiddleware(mapTpl, rq, rs, fnNext) {

  var engineChosen;

  for (var type in mapTpl) {
    if (mapTpl.hasOwnProperty(typeTpl)) {
      var engine = mapTpl[type];

      if (rq.accepts(type)) {
        engineChosen = engine;
      }
    }
  }

  if (!engineChosen) {
    rs.sendStatus(406, 'Not Acceptable');
    rs.end();
    return;
  }

  rq.app.set('view engine', engineChosen);
  next();
};
