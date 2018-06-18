NodeJs Boilerplate
===================

## Initial step
After checkout edit below files as per your preoject details

* **package.json** : edit name, contributors section
* **config\index.js** : edit app_name, port etc.


## How to run
```sh
$ npm install
$ NODE_ENV=development node app.js
```

## Features of This BoilerPlate
- modularize structure
- jwt token based authentication(Working)
- environment wise setting i.e can be run of different environment by setting NODE_ENV
- easy to use
- Winston logger to save datewise logs on server with daily rotate facility
- can be exteneded to use any external library
- route versioning
- common utils
- secured using cors and helmet
- common response builder and error handling