import { UsersApi } from './../api/UsersApi';
import { Injectable, Inject } from '@angular/core';
import { CategoriesApi, TagsApi, PostDTO, CategoryDTO, TagDTO } from '../index';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ucs2 } from 'punycode';

@Injectable()
export class PostUtilsService {
  public static readonly TAG = 'Tag';
  public static readonly NONE = 'None';
  public static readonly CATEGORY = 'Category';
  public static readonly USER = 'User';
  public static readonly STATUS = 'Status';

  constructor() { }
}

export interface FilterValue {
  id?: string;
  name?: string;
}
