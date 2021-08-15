# ingrid

lightweight and minimalist structure for building REST API

### Main config

create a dotenv file in the root directory and add these line and fill

``` dotenv
#debug config | Do not change
DEBUG="http server database modules info"

# server and database config
PORT=
HOST=
DB_URL=
```

### Modules config

* Create a new folder in the root path and name it ``modules``
* Put your module folder inside.
* The name of your module folder will be the ``api url endpoint``

````text
-- Modules
   -- auth
   -- check-list
   -- users
-- index.js
-- package.json
-- ...
````

The module must contain at least `index.js` file which exposes the express router

This is for example the auth module. Here, the api endpoint will be ``/auth`` 

````javascript
const router = require("express").Router()
const ctrl = require("./auth.controller")

router.post("/", ctrl.login)
router.get("/check-email/:email", ctrl.checkEmail)

// this export is required
module.exports = router

````
