# Protractor _backend mock_ plugin

Protractor plugin used to mock backend calls.

## Usage

1. Add NPM dependency to your `package.json`:
    
    ```bash
    npm install --save-dev protractor-backend-mock-plugin
    ```

2. [Add & Configure Protractor plugin](https://github.com/angular/protractor/blob/master/docs/plugins.md#using-plugins):
    
    ```javascript
    // protractor.conf.js
    exports.config = {
        plugins: [
            {
                package: 'protractor-backend-mock-plugin',
                // config
                backend: [8080, 'localhost'],
                fake: [9999, 'localhost']
            }
        ]
    }
    ```

3. Use [Nock](https://github.com/node-nock/nock) to mock results from `fake` server:
    
    ```bash
    npm install --save-dev nock
    ```
    
    ```javascript
    import * as nock from 'nock';
    beforeEach(() => {
      nock('http://localhost:9999').get(`/user/me`).reply(200, {id: 42, name: 'John Doe'})
    });
    ```

## How it works?

An [Express.js](http://expressjs.com) server is started locally, to intercept webapp calls.
In order to intercept and mock calls (using `nock`), request must be emitted inside NodeJS application.
So all request are redirected to another URL, defined by `fake` section.

```txt
             +-------------------------------------------+
             |               NodeJS                      |
+--------+   | +---------+             +------+ +------+ |
| Webapp + --> | Backend + --> proxy ->| Nock | | Fake | |
+--------+   | +---------+             +------+ +------+ |
             +-------------------------------------------+
```
