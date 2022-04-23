import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiResponse } from "../models/apiResponse.model";
import { Cruce } from "../models/cruce.model";

@Injectable({
    providedIn: 'root'
  })
export class CruceService{
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient){

    }

    getCruces(){
        return this.http.get<ApiResponse<Cruce>>(`${this.apiUrl}/TrafficLight`);
    }

    postCruce(cruce: Cruce[]){
        return this.http.post(`${this.apiUrl}/TrafficLight`, cruce);
    }

}
