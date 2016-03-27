import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {HttpHarness} from "../../index";
import {TestService} from "../test.service";

@Injectable()
export class Ng2TestService extends TestService {

    constructor(private _http: Http) {
        super(HttpHarness.fromNg2(_http));
    }
}