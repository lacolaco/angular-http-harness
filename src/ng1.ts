import {Observable, Observer} from "rxjs/Rx";
import {ObservableHttp} from "./harness";

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
 */
export function fromNg1($http: angular.IHttpService): ObservableHttp {
    return <ObservableHttp> {
        get<T>(url: string, options?: angular.IRequestShortcutConfig): Observable<angular.IHttpPromiseCallbackArg<T>> {
            return wrapNg1Promise($http.get<T>(url, options));
        },
        post<T>(url: string, body: any, options?: angular.IRequestShortcutConfig): Observable<angular.IHttpPromiseCallbackArg<T>> {
            return wrapNg1Promise($http.post<T>(url, body, options));
        },
        put<T>(url: string, body: any, options?: angular.IRequestShortcutConfig): Observable<angular.IHttpPromiseCallbackArg<T>> {
            return wrapNg1Promise($http.put<T>(url, body, options));
        },
        delete<T>(url: string, options?: angular.IRequestShortcutConfig): Observable<angular.IHttpPromiseCallbackArg<T>> {
            return wrapNg1Promise($http.delete<T>(url, options));
        },
    };
}

function wrapNg1Promise<T>(p: angular.IHttpPromise<T>): Observable<angular.IHttpPromiseCallbackArg<T>> {
    return Observable.create((observer: Observer<angular.IHttpPromiseCallbackArg<T>>) => {
        p.then((resp: angular.IHttpPromiseCallbackArg<T>) => {
            observer.next(resp);
            observer.complete();
        }).catch(resp => {
            observer.error(resp);
        });
    });
}
