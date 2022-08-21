import { Injectable } from '@angular/core';
import { ILocation } from '../models/ILocation.model';
import { IUser } from '../models/IUser.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CoronaAppService {
    user: IUser
    locations: ILocation[] = []
    constructor(private _http: HttpClient) { }
    login(name: string, password: string): Observable<IUser> {
        return this._http.post<any>('https://localhost:44381/api/User/login', { name: name, password: password })
    }
    getAllLocations(token: string): Observable<ILocation[]> {
        return this._http.get<ILocation[]>("https://localhost:44381/api/Location", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }
    addReport(newLocation: ILocation, token: string, patientId: string): Observable<any> {
        return this._http.post<any>('https://localhost:44381/api/Location', newLocation, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

    }
    removeReport(reportId: number, patientId: string, token: string): Observable<any> {
        return this._http.delete<any>(`https://localhost:44381/api/Location/${patientId}/${reportId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }

}