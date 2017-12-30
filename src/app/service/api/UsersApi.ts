import { UserInfoDTO } from './../model/UserInfoDTO';
/**
 * SpongeblogSP API
 * Spongeblog blogging API
 *
 *
 **/
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class UsersApi {

  protected basePath = 'http://localhost:8081';
  private userPath = this.basePath + '/api/v1/users';
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
   * Fetches User info with defined Id.
   * @summary Get User info
   * @param userId Unique identifier of a User;
   */
  public apiV1UsersInfoUserIdGetUsingGET(userId: number, extraHttpRequestParams?: any): Observable<UserInfoDTO> {
    const path = this.userPath + '/info/' + String(userId);
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling apiV1UsersInfoUserIdGetUsingGET.');
    }
    return this.http.get<UserInfoDTO>(path);
  }

  /**
   * Fetches User by login name.
   * @summary Get User by login name
   * @param userName Login name of the user.
   */
  public apiV1UsersNameUserNameGet(userName: string, extraHttpRequestParams?: any): Observable<UserInfoDTO> {
    const path = this.userPath + '/name/' + String(userName);
    // verify required parameter 'userName' is not null or undefined
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling apiV1UsersNameUserNameGet.');
    }
    return this.http.get<UserInfoDTO>(path);
  }
}
