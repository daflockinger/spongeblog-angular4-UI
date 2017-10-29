import { BlogApi } from './../../service/api/BlogApi';
import { BlogDTO } from './../../service/model/BlogDTO';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [BlogApi]
})
export class FooterComponent implements OnInit {
  blog: BlogDTO;

  constructor(private blogApi: BlogApi) {}

  ngOnInit() {
     this.blogApi.apiV1BlogGetUsingGET().subscribe((blog: BlogDTO) => {
      this.blog = blog;
    });
  }

}
