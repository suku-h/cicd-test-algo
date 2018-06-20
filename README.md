NodeJs Boilerplate
===================

## Initial step
After checkout edit below files as per your preoject details

* **package.json** : edit name, contributors section
* **config\sample_db.js** : copy sample db to `db.json` for using db related functionlity


## How to run
```sh
$ npm install
$ NODE_ENV="development" DEBUG="true" node app.js
```

## Features of This BoilerPlate
- modularize structure
- environment wise setting i.e can be run of different environment by setting NODE_ENV
- easy to use
- route versioning
- common utils
- secured using cors and helmet
- common response builder and error handling
- es6 structure