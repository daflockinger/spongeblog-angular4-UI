import { Injectable } from '@angular/core';



@Injectable()
export class CleanUrlUtilsService {

  public static readonly TAG = 'tag';
  public static readonly USER = 'user';
  public static readonly CATEGORY = 'category';
  public static readonly POST = 'posts';
  public static readonly PAGE = 'page';

  constructor() { }

  public parseId(idString: string) {
    if (idString == null) {
      return 0;
    }
    if (!idString.includes('_')) {
      return parseInt(idString, 10);
    }
    let id = '0';
    const lastUnderscorePos = idString.lastIndexOf('_');

    if (lastUnderscorePos !== -1 || lastUnderscorePos !== idString.length) {
      id = idString.substr(lastUnderscorePos + 1, idString.length);
    }
    return parseInt(id, 10);
  }

  public cleanLink(type: string, name: string, id: number) {
    return '/' + type + '/' + encodeURI(name.replace(/\s/g, '_')) + '_' + id;
  }
}
