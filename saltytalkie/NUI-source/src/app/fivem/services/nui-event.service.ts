import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// @ts-ignore
if (!window.GetParentResourceName) {
  // @ts-ignore
  window[`GetParentResourceName`] = () => {
    return 'filePath';
  };
}


@Injectable({
  providedIn: 'root'
})
export class NuiEventService {
  private readonly _messages$: Observable<any>;


  constructor(private httpClient: HttpClient) {
    this._messages$ = fromEvent<any>(window, 'message')
      .pipe(
        map(
          eventMessage => eventMessage.data
        )
      );
  }


  get parentResourceName(): string {
    // @ts-ignore
    return window.GetParentResourceName() ?? 'unknown';
  }

  postRequest(eventName: string, body?: any): Observable<any> {
    return this.httpClient.post(`http://${this.parentResourceName}/` + eventName, body);
  }

  messages$(): Observable<any> {
    return this._messages$;
  }
}
