# OAuth-Helpers-Server

Help you create oauth packages rapidly.

## Installation

meteor add leaf4monkey:oauth-helpers-server

## Getting Started

```js
import Service from 'leaf4monkey:oauth-helpers-server';
import {_} from 'meteor/underscore';

function handleAuthFromAccessToken(accessToken, expiresAt) {
}

function getTokenResponse(query) {
}

let MyService = new Service('myService');

let config = MyService.getConfigs();

MyService.register(2, null, function(query) {
  let response = getTokenResponse(query);
  let accessToken = response.accessToken;
  let expiresIn = response.expiresIn;

  return handleAuthFromAccessToken(accessToken, (+new Date) + (1000 * expiresIn));
});

MyService.registerRetrieveCredential();

MyService.addAutopublishFields(['services.myService'], [
  'services.myService.id', 'services.myService.username', 'services.myService.gender'
]);
```

## Apis

#### `constructor(serviceName)`

Nothing but initialize you service name.

#### `getConfigs(fields)`

Shorthand of:

```js
ServiceConfiguration.configurations.findOne({service: this.serviceName}, {fields});
```

#### `#register(name, version, urls, handleOauthRequest)`

Shorthand of `OAuth.registerService()`.

#### `#registerRetrieveCredential()`

Shorthand of:

```js
this.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

```

You may feel tired to copy and paste such code.

#### `#addAutopublishFields(forLoggedInUser, forOtherUsers)`

Shorthand of `Accounts.addAutopublishFields({forLoggedInUser, forOtherUsers})`.
