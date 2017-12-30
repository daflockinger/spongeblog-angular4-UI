import { CategoryDTO } from './../model/CategoryDTO';
/**
 * SpongeblogSP API
 * Spongeblog blogging API
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CategoriesApi {

  protected basePath = 'http://localhost:8081';
  private categoryPath = this.basePath + '/api/v1/categories';
  public defaultHeaders: Headers = new Headers();
  public configuration: Configuration = new Configuration();

  constructor(protected http: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string,
  @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
    }
  }

   /**
   * Fetches Category with defined Id.
   * @summary Get Category
   * @param categoryId Unique identifier of a Category;
   */
  public apiV1CategoriesCategoryIdGetUsingGET(categoryId: number, extraHttpRequestParams?: any): Observable<CategoryDTO> {
    const path = this.categoryPath + '/' +  String(categoryId);
    if (categoryId === null || categoryId === undefined) {
      throw new Error('Required parameter categoryId was null or undefined when calling apiV1CategoriesCategoryIdGetUsingGET.');
    }
    return this.http.get<CategoryDTO>(path);
  }

  /**
   * Returns all Categorys of defined parent Category.
   * @summary Categorys of Parent.
   * @param parentCategoryId Unique identifier of the parent Category;
   */
  public apiV1CategoriesChildrenParentCategoryIdGetUsingGET(
    parentCategoryId: number, extraHttpRequestParams?: any): Observable<Array<CategoryDTO>> {
    const path = this.categoryPath + '/children/' + String(parentCategoryId);
    if (parentCategoryId === null || parentCategoryId === undefined) {
      throw new Error('Required parameter parentCategoryId was null or' +
      'undefined when calling apiV1CategoriesChildrenParentCategoryIdGetUsingGET.');
    }
    return this.http.get<Array<CategoryDTO>>(path);
  }

  /**
   * Returns all Categorys.
   * @summary All Categorys
   */
  public apiV1CategoriesGetUsingGET(extraHttpRequestParams?: any): Observable<Array<CategoryDTO>> {
    return this.http.get<Array<CategoryDTO>>(this.categoryPath);
  }
}
