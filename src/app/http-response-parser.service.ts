import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpResponseParserService {

  constructor() { }

  public isForbiddenResponse(response: any) {
    if( response["status"] == 403 ) {
      return response["status"]
    } else
    return 200
  }
}
