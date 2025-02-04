import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl= 'http://localhost:5210/api/Data';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }
  deleteUser(id){
    return this.http.delete(this.apiUrl + '/'+id);
  }
  searchUsers(query:string):Observable<User[]>{
    const params = new HttpParams().set('query',query);
    return this.http.get<User[]>(this.apiUrl +'/search',{params} );
  }
  addUser(user:User):Observable<any>{
    return this.http.post(this.apiUrl + '/user',user)
  }
  editUser(user:User){
    return this.http.put(this.apiUrl+ '/' +user.id,user);
  }
}
