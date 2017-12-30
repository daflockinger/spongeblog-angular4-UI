import { NavbarComponent } from './parts/navbar/navbar.component';
import { CleanUrlUtilsService } from './service/utils/clean-url-utils.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';


const routes: Routes = [
  {
    path: CleanUrlUtilsService.POST + '/:id',
    component: PostComponent,
  },
  {
    path: CleanUrlUtilsService.PAGE + '/:id',
    component: PageComponent,
  },
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: ':page',
    component: PostListComponent,
  },
  {
    path: ':type/:id',
    component: PostListComponent,
  },
  {
    path: ':type/:id/:page',
    component: PostListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})

export class BlogRoutingModule { }
