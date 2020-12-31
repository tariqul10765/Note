import { Injectable } from '@angular/core';
import {Note} from '../interfaces/note';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private REST_API_SERVER = 'http://localhost:3000/posts';
  // tslint:disable-next-line:variable-name
  private _refreshNeeded$ = new Subject<void>();

  constructor(private httpclient: HttpClient) {  }

  // tslint:disable-next-line:typedef
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  public data: Note[] = [];

  // tslint:disable-next-line:typedef
  setRefreshNeeded$() {
    this.refreshNeeded$.next();
  }

  // public ELEMENT_DATA: Note[] = [
  //   { position: 1, title: 'First note', description: 'hello my name is tariqul' },
  //   { position: 2, title: 'First note', description: 'hello my name is tariqul' },
  //   { position: 3, title: 'First note', description: 'hello my name is tariqul' },
  //   { position: 4, title: 'First note', description: 'hello my name is tariqul' },
  //   { position: 5, title: 'First note', description: 'hello my name is tariqul' },
  // ];

  // tslint:disable-next-line:typedef
  public sendGetRequest(){
    return this.httpclient.get(this.REST_API_SERVER);
  }

  public sendPostRequest(data: any): Observable<any> {
    return this.httpclient.post<any>(this.REST_API_SERVER, data);
  }

  // tslint:disable-next-line:typedef
  public sendDeleteRequest(id: any){
    return this.httpclient.delete(this.REST_API_SERVER + '/' + id);
  }

  // tslint:disable-next-line:typedef
  public sendPatchRequest(id, name: any){
    return this.httpclient.patch((this.REST_API_SERVER + '/' + id ), { title: name });
    // return this.httpclient.patch(this.REST_API_SERVER + '/' + id, name);
  }
}
