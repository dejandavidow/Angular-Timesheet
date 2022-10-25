import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnChanges {
  @Input() categoires: Category[] = [];
  categoryCount: number = 0;
  pageIndex: number = 1;
  pageSize: number = 5;
  filterLetter:string = ''
  @Input() categoryAdded: boolean = false;
  @Input() searchTerm: string = '';
  handleDeleteAsync(id: string) {
    this.categoryService.DeleteCategoryAsync(id).subscribe(() => {
      this.categoryService
        .GetCategoriesAsync(this.pageIndex, this.pageSize, this.searchTerm,this.filterLetter)
        .subscribe((response) => (this.categoires = response));
      this.categoryService
        .GetCategoryCountAsync(this.filterLetter)
        .subscribe((response) => (this.categoryCount = response));
    });
  }
  handlerFilterAsync(letter:string)
  {
    this.filterLetter = letter;
    this.categoryService
    .GetCategoriesAsync(this.pageIndex, this.pageSize, this.searchTerm,this.filterLetter)
    .subscribe((response) => (this.categoires = response));
  this.categoryService
    .GetCategoryCountAsync(this.filterLetter)
    .subscribe((response) => (this.categoryCount = response));
  }
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    //Duplira http call zbog ngOnChanges


    // this.categoryService
    //   .GetCategoriesAsync(this.pageIndex, this.pageSize, this.searchTerm)
    //   .subscribe((response) => (this.categoires = response));
    // this.categoryService
    //   .GetCategoryCountAsync()
    //   .subscribe((response) => (this.categoryCount = response));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.categoryService
      .GetCategoriesAsync(this.pageIndex, this.pageSize, this.searchTerm,this.filterLetter)
      .subscribe((response) => (this.categoires = response));
    this.categoryService
      .GetCategoryCountAsync(this.filterLetter)
      .subscribe((response) => (this.categoryCount = response));
  }
  pageChange(e: number) {
    this.pageIndex = e;
    this.categoryService
      .GetCategoriesAsync(this.pageIndex, this.pageSize, this.searchTerm,this.filterLetter)
      .subscribe((response) => (this.categoires = response));
    this.categoryService
      .GetCategoryCountAsync(this.filterLetter)
      .subscribe((response) => (this.categoryCount = response));
  }
}
