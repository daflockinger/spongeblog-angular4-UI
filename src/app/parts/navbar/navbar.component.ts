import { CleanUrlUtilsService } from './../../service/utils/clean-url-utils.service';
import { CategoryDTO } from './../../service/model/CategoryDTO';
import { CategoriesApi } from './../../service/api/CategoriesApi';
import { Component, OnInit } from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [CategoriesApi, CleanUrlUtilsService]
})
export class NavbarComponent implements OnInit {
  categories: CategoryDTO[];

  constructor(private categoryApi: CategoriesApi, private utils: CleanUrlUtilsService) {
    categoryApi.apiV1CategoriesGetUsingGET().subscribe((categories: CategoryDTO[]) => {
      this.categories = categories.filter(cat => cat.parentId == null);
    });
  }

  ngOnInit() {
  }

  createCategoryLink(category: CategoryDTO) {
    return this.utils.cleanLink(CleanUrlUtilsService.CATEGORY, category.name, category.categoryId);
  }
}
