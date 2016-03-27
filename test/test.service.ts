import {Observable} from "rxjs/Observable";
import {TestModel} from "./test.model";
import {HttpHarness} from "../index";

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