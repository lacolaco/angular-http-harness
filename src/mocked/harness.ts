/**
 * Without angular2 dependencies
 */

import {Http, RequestOptionsArgs, Response, ResponseOptions, Headers} from "./mock/http";
import {Observable, Observer} from "rxjs/Rx";

import Ng1Http = angular.IHttpService;

export interface ObservableHttp {
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
}

function wrapNg1Promise(p: angular.IHttpPromise<any>): Observable<Response> {
    return Observable.create((observer: Observer<Response>) => {
        p.then((resp: angular.IHttpPromiseCallbackArg<any>) => {
            observer.next(new Response(wrapNg1Response(resp)));
            observer.complete();
        }).catch(resp => {
            observer.error(new Response(wrapNg1Response(resp)));
        });
    });
}

function wrapNg1Response(resp: angular.IHttpPromiseCallbackArg<any>): ResponseOptions {
    return new ResponseOptions({
        body: resp.data,
        status: resp.status,
        headers: new Headers(resp.headers),
        statusText: resp.statusText,
    });
}

/**
 * Wrapped http services as a common interface.
 * HttpHarness allows you to separate a DI process and a http process.
 *
 *
 * ## Shared code: `TestService` as an abstract class
 *
 * ```
 * export abstract class TestService {
 *    private http: HttpHarness;
 *
 *    constructor(http: HttpHarness) {
 *        this.http = http;
 *    }
 *
 *    get(id: string): Observable<TestModel> {
 *        return this.http.get(`/${id}`)
 *            .map(resp => resp.json() as TestModel);
 *    }
 * }
 * ```
 *
 * ## Angular 1 code: `Ng1TestService` as an entry point for `$http`
 * Use `HttpHarness.fromNg1`
 *
 * ```
 * export class Ng1TestService extends TestService {
 * 
 *     constructor($http: angular.IHttpService) {
 *         super(HttpHarness.fromNg1($http));
 *     }
 * }
 *
 * angular.module("app").service("testService", ["$http", Ng1TestService]);
 * ```
 */
export class HttpHarness implements ObservableHttp {

    static fromNg1(ng1Http: Ng1Http): HttpHarness {
        return new HttpHarness({
            get: (url: string, options?: RequestOptionsArgs): Observable<Response> => {
                let p = ng1Http.get<any>(url, options);
                return wrapNg1Promise(p);
            },
            post: (url: string, body: string, options?: RequestOptionsArgs): Observable<Response> => {
                let p = ng1Http.post<any>(url, body, options);
                return wrapNg1Promise(p);
            },
            put: (url: string, body: string, options?: RequestOptionsArgs): Observable<Response> => {
                let p = ng1Http.put<any>(url, body, options);
                return wrapNg1Promise(p);
            },
            delete: (url: string, options?: RequestOptionsArgs): Observable<Response> => {
                let p = ng1Http.delete<any>(url, options);
                return wrapNg1Promise(p);
            },
        });
    };

    static fromNg2(ng2Http: Http): HttpHarness {
        return new HttpHarness(ng2Http);
    }

    constructor(private _http: ObservableHttp) {
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.get(url, options);
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.post(url, body, options);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.put(url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.delete(url, options);
    }
}
