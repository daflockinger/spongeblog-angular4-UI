import { PostsPage } from './../model/PostsPage';
import { PostDTO } from './../model/PostDTO';
/**
 * SpongeblogSP API
 * Spongeblog blogging API
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


import { Inject, Injectable, Optional, } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { AuthenticationService } from '../auth/authentication.service';


@Injectable()
export class PagesApi {

  protected basePath = 'http://localhost:8081';
  public defaultHeaders: Headers = new Headers();
  public configuration: Configuration = new Configuration();

  constructor(protected http: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string,
  @Optional() configuration: Configuration, @Inject(AuthenticationService) private auth: AuthenticationService) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
    }
  }


  /**
   * All pages.
   * Returns all pages having no category assigned.
   * @param withoutCategory Filter pages without a category.
   */
  public apiV1PagesGetUsingGET(withoutCategory?: boolean, extraHttpRequestParams?: any): Observable<PostsPage> {
    const path = this.basePath + '/api/v1/pages';

    let queryParameters = new HttpParams();
    if (withoutCategory !== undefined) {
      queryParameters = queryParameters.set('without-category', <any>withoutCategory);
    }
    const requestOptions: any = {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials
    };
    return this.http.get<PostsPage>(path, requestOptions);
  }

  /**
   * Update Page
   * Updated a Page entry.
   * @param pageEdit pageEdit
   */
  public apiV1PagesPutUsingPUT(pageEdit: models.PostDTO, extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + '/api/v1/pages';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    if (pageEdit === null || pageEdit === undefined) {
      throw new Error('Required parameter pageEdit was null or undefined when calling apiV1PagesPutUsingPUT.');
    }
    headers.set('Content-Type', 'application/json');

    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };

    return this.http.put(path, pageEdit, requestOptions);
  }

  /**
   * Delete Page
   * Deletes a Page with defined Id.
   * @param pageId Unique identifier of a Page;
   */
  public apiV1PostsPageIdDeleteUsingDELETE(pageId: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + '/api/v1/pages/${pageId}'
      .replace('${' + 'pageId' + '}', String(pageId));
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    if (pageId === null || pageId === undefined) {
      throw new Error('Required parameter pageId was null or undefined when calling apiV1PostsPageIdDeleteUsingDELETE.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.delete(path, requestOptions);
  }

  /**
   * Get Page
   * Fetches Page with defined Id.
   * @param pageId Unique identifier of a Page;
   */
  public apiV1PostsPageIdGetUsingGET(pageId: number, extraHttpRequestParams?: any): Observable<PostDTO> {
    const path = this.basePath + '/api/v1/pages/${pageId}'
      .replace('${' + 'pageId' + '}', String(pageId));
    // verify required parameter 'pageId' is not null or undefined
    if (pageId === null || pageId === undefined) {
      throw new Error('Required parameter pageId was null or undefined when calling apiV1PostsPageIdGetUsingGET.');
    }
    const requestOptions: any = {
      withCredentials: this.configuration.withCredentials
    };
    return this.http.get<PostDTO>(path, requestOptions);
  }

  /**
   * Create Page
   * Creates new Page entry.
   * @param pageEdit pageEdit
   */
  public apiV1PostsPageUsingPOST(pageEdit: models.PostDTO, extraHttpRequestParams?: any): Observable<PostDTO> {
    const path = this.basePath + '/api/v1/pages';

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    if (pageEdit === null || pageEdit === undefined) {
      throw new Error('Required parameter pageEdit was null or undefined when calling apiV1PostsPageUsingPOST.');
    }
    headers.set('Content-Type', 'application/json');

    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials
    };

    return this.http.post<PostDTO>(path, pageEdit, requestOptions);
  }

}
