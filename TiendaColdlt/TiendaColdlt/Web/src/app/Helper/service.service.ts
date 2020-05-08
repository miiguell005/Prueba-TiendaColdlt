import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlServidor = 'http://localhost:62960/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**
   * Por medio del filtro que se realiza, se realiza la cadena de parametros
   * @param filtro 
   */
  private generarParametrosFiltro(filtro: any) {

    if (!filtro)
      return "";

    else {
      let keys = Object.keys(filtro);
      let parametro = "";

      //Genera los parametros que van a ir en la url
      keys.forEach(k => {
        if (filtro[k]) {
          if (parametro == "")
            parametro += `?${k}=${filtro[k]}`;

          else
            parametro += `&${k}=${filtro[k]}`;
        }
      });

      return parametro;
    }
  }

  //Metodo Get 
  get(api: string, filtro?: any): Observable<any> {

    let params = this.generarParametrosFiltro(filtro);

    return this.http.get<any>(this.urlServidor + api + params);
  }

  //Metodo put
  put(api: string, obj: any): Observable<any> {
    return this.http.put(this.urlServidor + api, obj, this.httpOptions);
  }

  //Metodo post
  post(api: string, obj: any): Observable<any> {
    return this.http.post<any>(this.urlServidor + api, obj, this.httpOptions);
  }

  //Metodo Delete
  delete(api: string): Observable<any> {
    return this.http.delete<any>(this.urlServidor + api, this.httpOptions);
  }

  copiarObjeto(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
}
