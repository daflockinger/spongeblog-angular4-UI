import { TagDTO } from './../service/model/TagDTO';
import { CleanUrlUtilsService } from './../service/utils/clean-url-utils.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostDTO } from './../service/model/PostDTO';
import { PostsApi } from './../service/api/PostsApi';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostsApi, CleanUrlUtilsService]
})

export class PostComponent implements OnInit {
  post: PostDTO;

  constructor(private postApi: PostsApi, private route: ActivatedRoute,
    private utils: CleanUrlUtilsService) {}

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>
    this.postApi.apiV1PostsPostIdGetUsingGET(this.utils.parseId(params.get('id'))))
     .subscribe((post: PostDTO) => {
          this.post = post;
        });
  }

  createUserLink(post: PostDTO) {
    return this.utils.cleanLink(CleanUrlUtilsService.USER, post.author.nickName, post.author.userId);
  }
  createTagLink(tag: TagDTO) {
    return this.utils.cleanLink(CleanUrlUtilsService.TAG, tag.name, tag.tagId);
  }
}
