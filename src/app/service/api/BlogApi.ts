import { BlogDTO } from './../model/BlogDTO';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { InjectionError } from '@angular/core/src/di/reflective_errors';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

/**
 * SpongeblogSP API
 * Spongeblog blogging API
 *
 */
@Injectable()
export class BlogApi {

  protected basePath = 'http://localhost:8081';
  private blogPath = this.basePath + '/api/v1/blog';
  public defaultHeaders: HttpHeaders = new HttpHeaders();
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
   * Returns the Blog entry.
   * @summary Get Blog
   */
  public apiV1BlogGetUsingGET(extraHttpRequestParams?: any): Observable<BlogDTO> {
    const requestOptions: any = {
      method: 'GET',
      withCredentials: this.configuration.withCredentials
    };
    return this.http.get<BlogDTO>(this.blogPath, requestOptions);
  }
}
