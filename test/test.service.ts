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

    get(id: string): Observable<any> {
        return this.http.get(`/${id}`);
    }

    post(data: TestModel): Observable<any> {
        return this.http.post(`/`, JSON.stringify(data));
    }
}