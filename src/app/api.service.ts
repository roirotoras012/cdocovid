import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
const httpGet = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  'responseType': 'text'
};

const apiUrl = "https://cdocovidtracker.000webhostapp.com/case_city/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  getRemoteData(): Observable<any> {
    
    return this.http.get("https://covid19trackercdo.000webhostapp.com/case_city/api" 
   
   
    
    
    );
    
   
    
  }
  getRemoteData1(): Observable<any> {
    
    return this.http.get("https://covid19trackercdo.000webhostapp.com/status/api" 
   
   
    
    
    );
    
   
    
  }
 
  getRemoteData3(): Observable<any> {
    
    return this.http.get("https://covid19trackercdo.000webhostapp.com/ayuda/api" 
   
   
    
    
    );
    
   
    
  }






}
