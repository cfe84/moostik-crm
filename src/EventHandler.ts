import { MoostikEvent } from "./MoostikEvent";

function sendQueryAsync<T>(relativePath: string, method: string = "GET", body: any = undefined, headers: {[key: string]: string} = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        try {
          if (this.status >= 400) {
            throw Error(this.responseText);
          }
          if (this.responseText) {
            const response = JSON.parse(this.responseText);
            resolve(response as T);  
          } else {
            resolve(undefined as T);
          }
        } catch (err) {
          reject(Error(this.responseText))
        }
      }
    }
    request.open(method, `${relativePath}/api/events.php`, true)
    Object.keys(headers).forEach(header => {
      request.setRequestHeader(header, headers[header])
    })
    if (body) {
      request.setRequestHeader("content-type", "application/json")
    }
    request.send(body ? JSON.stringify(body) : undefined)
  })
}

export class EventHandler {
  static async logEventAsync(event: MoostikEvent, pathToApi: string = ".") {
    await sendQueryAsync(pathToApi, "POST", event);
  }
}