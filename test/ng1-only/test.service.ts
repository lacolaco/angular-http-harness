import {Observable} from "rxjs/Observable";
import {HttpHarness} from "../../ng1-only";
import {TestModel} from "../test.model";

/**
 * TestService base class
 */
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