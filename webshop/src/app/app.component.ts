import { Component } from '@angular/core';
import { CategoryService } from './service/backend/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webshop';

  constructor(private categorySvc: CategoryService) {
    console.log(this.categorySvc.categories);
  }
}
