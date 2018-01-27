import { environment } from './../../../environments/environment';
import { TagDTO } from './../model/TagDTO';
/**
 * SpongeblogSP API
 * Spongeblog blogging API
 *
 * */
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class TagsApi {

  protected basePath = environment.apiUrl;
  private tagsPath = this.basePath + '/api/v1/tags';
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
   * Returns all Tags.
   * @summary All Tags
   */
  public apiV1TagsGetUsingGET(extraHttpRequestParams?: any): Observable<Array<TagDTO>> {
    return this.http.get<Array<TagDTO>>(this.tagsPath);
  }

  /**
   * Fetches Tag with defined Id.
   * @summary Get Tag
   * @param tagId Unique identifier of a Tag;
   */
  public apiV1TagsTagIdGetUsingGET(tagId: number, extraHttpRequestParams?: any): Observable<TagDTO> {
    const path = this.tagsPath + '/api/v1/tags/' + String(tagId);
    // verify required parameter 'tagId' is not null or undefined
    if (tagId === null || tagId === undefined) {
      throw new Error('Required parameter tagId was null or undefined when calling apiV1TagsTagIdGetUsingGET.');
    }
    return this.http.get<TagDTO>(path);
  }
}
