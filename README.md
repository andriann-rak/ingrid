# ingrid

lightweight and minimalist structure for building REST API

### Main config

create a dotenv file in the root directory and add these line and fill

``` dotenv
#debug config | DO NOT CHANGE
DEBUG="http server database modules info"

# server and database config
PORT=YOUR_SERVER_PORT
HOST=YOUR_SERVER_HOST
DB_URL=YOUR_DATABASE_URL_STRING_CONNECTION
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
