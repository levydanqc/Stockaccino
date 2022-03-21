import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/assets/constants';

@Injectable({
  providedIn: 'root',
})
export class YahooService {
  constructor(private http: HttpClient) {}

  public getAutocomplete(query: string) {
    const params = new HttpParams().set('input', query);

    return this.get(Constants.AUTOCOMPLETE_URL, params);
  }

  public get(url: string, options?: any) {
    return this.http.get(url, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.http.put(url, data, options);
  }
  public delete(url: string, options?: any) {
    return this.http.delete(url, options);
  }
}