# angular-http-harness
[![Circle CI](https://circleci.com/gh/laco0416/angular-http-harness/tree/master.svg?style=svg)](https://circleci.com/gh/laco0416/angular-http-harness/tree/master)
[![npm version](https://badge.fury.io/js/angular-http-harness.svg)](https://badge.fury.io/js/angular-http-harness)

Angular library for **seamless** migration from `$http` to `Http`.

## Install

```
$ npm install --save angular-http-harness
```

## Usage:
This library provides only one API: `HttpHarness`.

`HttpHarness` is a wrapped HTTP service with a common interface.
`HttpHarness` allows you to separate a DI process and HTTP process.

### Preparation
If you use `Promise` in your HTTP services, you must rewrite it to use `Observable`.

1. Install `rxjs@5.0.0`
2. Replace your `then` and `catch` to `subscribe`.

```
// from
testService.get("test").then(
    resp => {
        ...
    })
    .catch(error => {
        ...
    });

// to
testService.get("test").subscribe(
    resp => {
        ...
    },
    error => {
        ...
    });
```

### Shared code: `TestService` as an abstract class
Implement a service **except for DI**.

Use `HttpHarness` instead of `$http` or `Http`.

```
export abstract class TestService {
   private http: HttpHarness;

   constructor(http: HttpHarness) {
       this.http = http;
   }

   get(id: string): Observable<TestModel> {
       return this.http.get(`/${id}`)
           .map(resp => resp.json() as TestModel);
   }
}
```

### Angular 1 code: `Ng1TestService` as an entry point for `$http`
Use `HttpHarness.fromNg1`.
```
export class Ng1TestService extends TestService {

    constructor($http: angular.IHttpService) {
        super(HttpHarness.fromNg1($http));
    }
}

angular.module("app").service("testService", ["$http", Ng1TestService]);
```

#### Use in only Angular 1

If you want to avoid installation of `angular2`, you can use `angular-http-harness/ng1-only`;

```
import {HttpHarness} from "angular-http-harness/ng1-only";

export class Ng1TestService extends TestService {

    constructor($http: angular.IHttpService) {
        super(HttpHarness.fromNg1($http));
    }
}

angular.module("app").service("testService", ["$http", Ng1TestService]);
```

`angular-http-harness/ng1-only` module doesn't have any dependencies of `angular2/*`.

### Angular 2 code: `Ng2TestService` as an entry point for `Http`
Use `HttpHarness.fromNg2`

```
@Injectable()
export class Ng2TestService extends TestService {

    constructor(private _http: Http) {
        super(HttpHarness.fromNg2(_http));
    }
}
```

## Compatibility

* Angular 1.5
* Angular 2.0.0-beta.12

## License
MIT
