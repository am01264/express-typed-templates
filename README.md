# `express-typed-templates`
_Designed for Express 4.x_

Using the least configuration possible, this middleware for express selects the
best template-engine for an client-acceptable response type.

Any requests for content-types you haven't set a template engine for will return
a HTTP 406 Not Acceptable response.

# Installation
Simply navigate to your project using your favourite command prompt, and type:

```sh
npm install --save express-typed-templates
```

This package has the amazing dependency count of 0 (yes, zero), so it should be
a fast install.

# How To Use
This is designed as express middleware, so it exposes a function that can be
used anywhere in express such as `app.use` or `router.use`.

```js
var app = require('express'),
    typedTemplates = require('express-typed-templates');

// No fancy config, just set it and forget it
app.use(typedTemplates({

  /* Content-Types are the keys.
     They can be the full "application/json" etc, but not necessary as we use
     [Request.accepts()](http://devdocs.io/express/index#req.accepts) to
     determine the template engine to use. */
  'json': 'ejs',

  /* Template engines are the values.
     It's handed over to Express using app.set('view engine')
  */
  'html': 'jade'
});

app.listen(3000);
```
