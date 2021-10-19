import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, Products } from '../interfaces/product.interface';

// Set the URL & KEY to use the api rest
const URL = environment.url;
const KEY =  environment.key;

@Injectable({
  providedIn: 'root'
})
export class PixabayService {

  constructor(private http: HttpClient) { 

  }

  /**
   * Get and return available products (information and images) from the api
   * 
   * @return {*}  {Observable<Product[]>}
   * @memberof PixabayService
   */
  getProducts(): Observable<Product[]>{
    return new Observable(obs=>{
      this.http.get<Products>(`${URL}?key=${KEY}`).subscribe((res: Products)=>{
        if(res && res.hits && res.hits.length){
          obs.next(res.hits)
        }else{
          obs.next([])
        }
      }, err=>{
        obs.error(err);
      })
    })
    
  }

  /**
   * Get products by sending parameter (tags) to the REST API
   *
   * @param {string} parameter
   * @return {*}  {Observable<Product[]>}
   * @memberof PixabayService
   */
  getProductByParameter(parameter: string): Observable<Product[]>{
    return new Observable(obs=>{
      this.http.get<Products>(`${URL}?key=${KEY}&q=${parameter}`).subscribe((res: Products)=>{
        if(res && res.hits && res.hits.length){
          obs.next(res.hits)
        }else{
          obs.next([])
        }
      }, err=>{
        obs.error(err)
      })
    })
  }

  /**
   * Get products by category selected
   *
   * @param {string} parameter
   * @return {*}  {Observable<Product[]>}
   * @memberof PixabayService
   */
  getProductByCategory(parameter: string): Observable<Product[]>{
    return new Observable(obs=>{
      this.http.get<Products>(`${URL}?key=${KEY}&category=${parameter}`).subscribe((res: Products)=>{
        if(res && res.hits && res.hits.length){
          obs.next(res.hits)
        }else{
          obs.next([])
        }
      }, err=>{
        obs.error(err)
      })
    })
  }
}
