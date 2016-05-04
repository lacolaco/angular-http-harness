import {Http} from "@angular/http";
import {ObservableHttp} from "./harness";

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
 * * export abstract class TestService {
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
export function fromNg2(_http: Http): ObservableHttp {
    return _http;
}
