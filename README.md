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
import {HttpHarness} from "angular-http-harness";

export abstract class TestService {
   private http: HttpHarness;

   constructor(http: HttpHarness) {
       this.http = http;
   }

   get(id: string): Observable<any> {
       return this.http.get(`/${id}`);
   }
}
```

### Angular 1 code: `Ng1TestService` as an entry point for `$http`
Use `fromNg1`.

```
import {HttpHarness} from "angular-http-harness";
import {fromNg1} from "angular-http-harness/ng1";
export class Ng1TestService extends TestService {
    constructor($http: angular.IHttpService) {
        super(new HttpHarness(fromNg1($http)));
    }

    get(id: string): Observable<TestModel> {
        return super.get(id).map(resp => resp.data);
    }
}
angular.module("app").service("testService", ["$http", Ng1TestService]);
```

### Angular 2 code: `Ng2TestService` as an entry point for `Http`
Use `fromNg2`

```
import {HttpHarness} from "angular-http-harness";
import {fromNg2} from "angular-http-harness/ng2";

@Injectable()
export class Ng2TestService extends TestService {
    constructor(_http: Http) {
        super(new HttpHarness(fromNg2(_http)));
    }

    get(id: string): Observable<TestModel> {
        return super.get(id).map(resp => resp.json());
    }
}
```

## Compatibility

* Angular 1.5
* Angular 2.0.0-beta.12

## License
MIT
