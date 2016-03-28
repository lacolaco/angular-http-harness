import {Observable} from "rxjs/Observable";
import {ObservableHttp} from "../harness";

/**
 * angular2/http mock
 */

/**
 * Dummy :P
 */
export class Http implements ObservableHttp {

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return null;
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return null;
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return null;
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return null;
    }
}

export interface RequestOptionsArgs {
    url?: string;
    method?: string;
    headers?: Headers;
    body?: string;
}

export class Response {
    url: string;
    status: number;
    statusText: string;
    headers: Headers;
    private _body: string | any;
    constructor(responseOptions: ResponseOptions) {
        this.status = responseOptions.status;
        this.statusText = responseOptions.statusText;
        this.headers = responseOptions.headers;
        this._body = responseOptions.body;
        this.url = responseOptions.url;
    }
    
    json(): any {
        if (typeof this._body === "string") {
            return JSON.parse(this._body);
        } else {
            return this._body;
        }
    }
}

export interface ResponseOptionsArgs {
    body?: string | Object;
    status?: number;
    statusText?: string;
    headers?: Headers;
    url?: string;
}

export class ResponseOptions {

    body: string | Object;
    status: number;
    headers: Headers;
    statusText: string;
    url: string;

    constructor(optionArgs: ResponseOptionsArgs) {
        this.body = optionArgs.body;
        this.status = optionArgs.status;
        this.headers = optionArgs.headers;
        this.statusText = optionArgs.statusText;
        this.url = optionArgs.url;
    }
}

export class Headers {
    constructor(private headers?: {[key: string]: any;}) {
    }
    
    get(header: string): any {
        return this.headers[header];
    }
}