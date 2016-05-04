import {Observable} from "rxjs/Observable";

export interface ObservableHttp {
    get(url: string, options?: any): Observable<any>;
    post(url: string, body: any, options?: any): Observable<any>;
    put(url: string, body: any, options?: any): Observable<any>;
    delete(url: string, options?: any): Observable<any>;
}

/**
 * Wrapped http services as a common interface.
 * HttpHarness allows you to separate a DI process and a http process.
 *
 *
 * ## Shared code: `TestService` as an abstract class
 *
 * ```
 * import {HttpHarness} from "angular-http-harness";
 *
 * export abstract class TestService {
 *    private http: HttpHarness;
 *
 *    constructor(http: HttpHarness) {
 *        this.http = http;
 *    }
 *
 *    get(id: string): Observable<any> {
 *        return this.http.get(`/${id}`);
 *    }
 * }
 * ```
 *
 * ## Angular 1 code: `Ng1TestService` as an entry point for `$http`
 * Use `angular-http-harness/ng1`
 *
 * ```
 * import {HttpHarness} from "angular-http-harness";
 * import {fromNg1} from "angular-http-harness/ng1";
 * 
 * export class Ng1TestService extends TestService {
 * 
 *     constructor($http: angular.IHttpService) {
 *         super(new HttpHarness(fromNg1($http)));
 *     }
 *     
 *     get(id: string): Observable<TestModel> {
 *         return super.get(id).map(resp => resp.data);
 *     }
 * }
 * 
 * angular.module("app").service("testService", ["$http", Ng1TestService]);
 * ```
 *
 * ## Angular 2 code: `Ng2TestService` as an entry point for `Http`
 * Use `angular-http-harness/ng2`
 *
 * ```
 * import {HttpHarness} from "angular-http-harness";
 * import {fromNg2} from "angular-http-harness/ng2";
 *
 * @Injectable()
 * export class Ng2TestService extends TestService {
 * 
 *     constructor(_http: Http) {
 *         super(new HttpHarness(fromNg2(_http)));
 *     }
 *     
 *     get(id: string): Observable<TestModel> {
 *         return super.get(id).map(resp => resp.json());
 *     }
 * }
 */
export class HttpHarness implements ObservableHttp {

    constructor(private _http: ObservableHttp) {
    }

    get(url: string, options?: any): Observable<any> {
        return this._http.get(url, options);
    }

    post(url: string, body: any, options?: any): Observable<any> {
        return this._http.post(url, body, options);
    }

    put(url: string, body: any, options?: any): Observable<any> {
        return this._http.put(url, body, options);
    }

    delete(url: string, options?: any): Observable<any> {
        return this._http.delete(url, options);
    }
}
