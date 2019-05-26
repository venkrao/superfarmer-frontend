export class HttpResponseParser {
  responseText: any;
  constructor(responseText: string) {
    this.responseText = responseText
  }

  isTokenInvalid(response) {
    console.log(response["error"])

  }
}
