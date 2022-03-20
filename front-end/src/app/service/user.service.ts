import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IUser } from '../user';
import { IUserPost } from '../userPost';
import { Observable, observable, TimeoutError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface Parameters {
  endpoint: string;
  headers: HttpHeaders | null;
  body: HttpParams | null;
  query: Array<Object> | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //TODO: change for remote url
  apiUrl: string = 'https://localhost:7056/api/users/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Retourne tous les utilisateurs.
  getUsers(): Observable<IUser[]> {
    return this.apiCall({
      endpoint: '',
      headers: null,
      body: null,
      query: null
    });
  }

  verifyEmail(email: string) {
    this.apiCall({
      endpoint: email,
      headers: null,
      body: null,
      query: null
    }).subscribe(
      (data) => {
        this.cookieService.set("estUtilise", "true");
      },
      (error) => {
        this.cookieService.set("estUtilise", "false");
      }
    );
  }

  getUserById(id: string) {
    return this.apiCall({
      endpoint: `findById/${id}`,
      headers: null,
      body: null,
      query: null
    });
  }

  updateUser(id: string, email?: string, nom?: string, prenom?: string) {
    console.log("4");
    let user!: IUser;
    this.getUserById(id).subscribe(data => {
      user = data;
      if (email) {
        user.Email = email;
      }
      if (nom) {
        console.log(user);
        user.Nom = nom;
      }
      if (prenom) {
        user.Prenom = prenom;
      }
      console.log("5");
      this.http.put(this.apiUrl + id, user).subscribe(res => {});
    })
  }

  postUser(email: string, password: string, nom: string, prenom: string) {
    let user: IUserPost = {
      Email: email,
      Prenom: prenom,
      Nom: nom,
      Password: password,
      Username: prenom + nom
    }
    this.http.post(this.apiUrl, user).subscribe(res => {});
  }

  apiCall(params: Parameters): Observable<any> {
    let url: string =
      this.apiUrl +
      params.endpoint +
      (params.query ? '?' + params.query?.join('&') : '');
    return this.http.get<any>(url, {
      headers: params.headers!,
      params: params.body!,
    });
  }

  // Verifie si le email et le mot de passe sont corrects pour l'utilisateur
  // qui tente une connexion.
  verifyUser(email: string, password: string): Observable<IUser> {
    //TODO: hash password
    //TODO: payload in body instead
    return this.apiCall({
      endpoint: `verify/${email}`,
      headers: new HttpHeaders({ password: password }),
      body: null,
      query: null,
    });
  }
}
