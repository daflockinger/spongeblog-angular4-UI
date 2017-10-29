import { TagDTO } from './../service/model/TagDTO';
import { TagDefinition } from '@angular/compiler';
import { CategoryDTO, UserInfoDTO } from '../service';
import { CleanUrlUtilsService } from './../service/utils/clean-url-utils.service';
import { utf8Encode } from '@angular/compiler/src/util';
import { PostsPage } from './../service/model/PostsPage';
import { PostDTO } from './../service/model/PostDTO';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogDTO } from './../service/model/BlogDTO';
import { BlogApi } from './../service/api/BlogApi';
import { PostPreviewDTO } from './../service/model/PostPreviewDTO';
import { PostsApi } from './../service/api/PostsApi';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [PostsApi, BlogApi, CleanUrlUtilsService]
})
export class PostListComponent implements OnInit {
  page: PostsPage;
  blog: BlogDTO;
  currentPage: number;
  path: string;

  private DEFAULT_PAGE_NUMBER = 1;
  private DEFAULT_POSTS_PER_PAGE = 2;
  private DEFAULT_STATUS = 'PUBLIC';

  constructor(private postApi: PostsApi, private blogApi: BlogApi,
  private router: ActivatedRoute, private utils: CleanUrlUtilsService) { }

  ngOnInit() {
    this.blogApi.apiV1BlogGetUsingGET().subscribe((blog: BlogDTO) => {
      this.blog = blog;
    });
    this.router.paramMap.switchMap((params: ParamMap) =>
      this.getPostsFor(params)
    ).subscribe((page: PostsPage) => {
      this.page = page;
    });
  }

  private getPostsFor(params: ParamMap) {
    const id = this.utils.parseId(params.get('id'));
    const type = params.get('type');
    const page = this.saveToNumber(params.get('page'), this.DEFAULT_PAGE_NUMBER) - 1;
    this.currentPage = page + 1;
    this.createPath(type, params.get('id'));

    switch (type) {
      case CleanUrlUtilsService.CATEGORY:
        return this.postApi.apiV1PostsCategoryCategoryIdStatusGetUsingGET(id,
            this.DEFAULT_STATUS, page, this.DEFAULT_POSTS_PER_PAGE);
      case CleanUrlUtilsService.USER:
        return this.postApi.apiV1PostsAuthorUserIdStatusGetUsingGET(id,
            this.DEFAULT_STATUS, page, this.DEFAULT_POSTS_PER_PAGE);
      case CleanUrlUtilsService.TAG:
        return this.postApi.apiV1PostsTagTagIdStatusGetUsingGET(id,
            this.DEFAULT_STATUS, page, this.DEFAULT_POSTS_PER_PAGE);
      default:
        return this.postApi.apiV1PostsStatusStatusGetUsingGET(
            this.DEFAULT_STATUS, page, this.DEFAULT_POSTS_PER_PAGE);
    }
  }

  private createPath(type: string, id: any) {
    if (type != null) {
      this.path = type + '/' + id;
    }
  }

  private saveToNumber(param: string, defaultValue: number) {
    const number = parseInt(param, 10);
    return (Number.isNaN(number)) ? defaultValue : number;
  }

  createPostLink(post: PostPreviewDTO) {
    return this.utils.cleanLink(CleanUrlUtilsService.POST, post.title, post.postId);
  }
  createUserLink(post: PostPreviewDTO) {
    return this.utils.cleanLink(CleanUrlUtilsService.USER, post.author.nickName, post.author.userId);
  }
  createTagLink(tag: TagDTO) {
    return this.utils.cleanLink(CleanUrlUtilsService.TAG, tag.name, tag.tagId);
  }
}
