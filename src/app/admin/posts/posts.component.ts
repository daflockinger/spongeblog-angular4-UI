import { PostPreviewDTO } from './../../service/model/PostPreviewDTO';
import { PostDTO } from './../../service/model/PostDTO';
import { CategoryDTO } from './../../service/model/CategoryDTO';
import { TagsApi } from './../../service/api/TagsApi';
import { CategoriesApi, TagDTO, UserEditDTO, UsersApi } from '../../service';
import { FormUtilsService } from './../../service/utils/form-utils.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostsApi } from './../../service/api/PostsApi';
import { Component, OnInit, Inject } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostsApi, UsersApi, CategoriesApi, TagsApi, FormUtilsService],
})
export class PostsComponent implements OnInit {
  private readonly TAG = 'Tag';
  private readonly NONE = 'None';
  private readonly CATEGORY = 'Category';
  private readonly USER = 'User';
  private readonly STATUS = 'Status';

  postFilterForm: FormGroup;
  filters: string[] = [];
  selectedFilterName: string;
  filterValues: FilterValue[] = [{ id: '1', name: 'Please choose filter' }];
  filterValueMap: Map<string, FilterValue[]> = new Map<string, FilterValue[]>();

  currentPage = 0;
  postsPerPage = 5;

  postApi: PostsApi;
  posts: PostPreviewDTO[];


  constructor( @Inject(FormBuilder) formBuilder: FormBuilder,
    @Inject(PostsApi) postApi: PostsApi,
    @Inject(UsersApi) private userApi: UsersApi,
    @Inject(CategoriesApi) private categoryApi: CategoriesApi,
    @Inject(TagsApi) private tagApi: TagsApi,
    @Inject(FormUtilsService) private formUtils: FormUtilsService) {
    this.postApi = postApi;
    this.filters.push(this.NONE, this.CATEGORY, this.USER, this.TAG, this.STATUS);
    this.initFilterValues(userApi, categoryApi, tagApi);

    this.postFilterForm = formBuilder.group({
      filter: ['None'],
      chosenFilterValue: ['']
    });
    this.initPosts();
    this.postFilterForm.controls.filter.valueChanges
      .subscribe(filter => this.updateFilterValues(filter));
  }

  private initFilterValues(userApi: UsersApi, categoryApi: CategoriesApi, tagApi: TagsApi) {
    this.filterValueMap.set(this.NONE, []);
    userApi.apiV1UsersGetUsingGET()
      .subscribe(users => {
        this.filterValueMap.set(this.USER, _.map(users, this.userToFilterValue));
      });
    categoryApi.apiV1CategoriesGetUsingGET()
      .subscribe(categories => {
        this.filterValueMap.set(this.CATEGORY, _.map(categories, this.categoryToFilterValue));
      });
    tagApi.apiV1TagsGetUsingGET()
      .subscribe(tags => {
        this.filterValueMap.set(this.TAG, _.map(tags, this.tagToFilterValue));
      });
    this.filterValueMap.set(this.STATUS,
      _.map(_.values(PostDTO.StatusEnum), this.statusToFilterValue));
  }

  private userToFilterValue(user: UserEditDTO) {
    return <FilterValue>{ id: user.userId.toString(), name: user.nickName };
  }
  private categoryToFilterValue(category: CategoryDTO) {
    return <FilterValue>{ id: category.categoryId.toString(), name: category.name };
  }
  private tagToFilterValue(tag: TagDTO) {
    return <FilterValue>{ id: tag.tagId.toString(), name: tag.name };
  }
  private statusToFilterValue(status: string) {
    return <FilterValue>{ id: status, name: status };
  }


  updateFilterValues(filter: string) {
    this.selectedFilterName = filter;
    this.filterValues = this.filterValueMap.get(filter);
  }

  private initPosts() {
    this.postApi.apiV1PostsGetUsingGET(this.currentPage, this.postsPerPage).subscribe(postPage => {
      this.posts = postPage.previewPosts;
    });
  }

  updatePosts() {
    const filterValue: string = this.postFilterForm.value.chosenFilterValue;
    console.log('filter value: ' + filterValue);

    if (this.selectedFilterName === this.NONE) {
      this.initPosts();
    } else if (this.selectedFilterName === this.CATEGORY) {
      this.postApi.apiV1PostsCategoryCategoryIdGetUsingGET(Number(filterValue),
        this.currentPage, this.postsPerPage).subscribe(postPage => {
          this.posts = postPage.previewPosts;
        });
    } else if (this.selectedFilterName === this.USER) {
      this.postApi.apiV1PostsAuthorUserIdGetUsingGET(Number(filterValue),
        this.currentPage, this.postsPerPage).subscribe(postPage => {
          this.posts = postPage.previewPosts;
        });
    } else if (this.selectedFilterName === this.TAG) {
      this.postApi.apiV1PostsTagTagIdGetUsingGET(Number(filterValue),
        this.currentPage, this.postsPerPage).subscribe(postPage => {
          this.posts = postPage.previewPosts;
        });
    } else if (this.selectedFilterName === this.STATUS) {
      this.postApi.apiV1PostsStatusStatusGetUsingGET(filterValue,
        this.currentPage, this.postsPerPage).subscribe(postPage => {
          this.posts = postPage.previewPosts;
        });
    }
  }

  ngOnInit() {
  }
}

export interface FilterValue {
  id?: string;
  name?: string;
}
