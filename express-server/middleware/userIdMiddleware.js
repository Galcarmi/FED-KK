const { v4 } = require('uuid');

function parseCookies(request) {
  var list = {},
    rc = request.headers.cookie;

  rc &&
    rc.split(';').forEach(function (cookie) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

  return list;
}

exports.userIdMiddleware = (req, res, next) => {
  const cookies = parseCookies(req);
  if (!cookies.userid) {
    res.cookie('userid', v4());
  }
  next();
};
