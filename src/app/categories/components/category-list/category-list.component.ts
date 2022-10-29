import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnChanges {
  categoires: Category[] = [];
  categoryCount: number = 0;
  pageIndex: number = 1;
  pageSize: number = 5;
  filterLetter:string = ''
  loaded:boolean = false;
  @Input() categoryAdded: boolean = false;
  @Input() searchTerm: string = '';
  @Output() searchTermEmit = new EventEmitter<string>();
  // private handlerError(error: HttpErrorResponse){
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }

  handleDeleteAsync(id: string) {
    this.categoryService.DeleteCategoryAsync(id).subscribe(() => {
    this.getCategories()
    this.message.success("Category deleted successfuly")
    }
    )
  }
  handlerFilterAsync(letter:string)
  {
    this.filterLetter = letter;
    this.searchTermEmit.emit('');
   this.getCategories()
  }
  constructor(private categoryService: CategoryService,private message: NzMessageService) {}
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
    this.getCategories()
  }
  pageChange(e: number) {
    this.pageIndex = e;
    this.getCategories()
  }
  getCategories(){
    if(this.searchTerm !== '')
    {
      this.categoryService
      .GetCategoriesAsync(this.pageIndex, this.pageSize, this.searchTerm,'')
      .subscribe((response) => (this.categoires = response,this.loaded = true));
    }
    this.categoryService
    .GetCategoriesAsync(this.pageIndex, this.pageSize, this.searchTerm,this.filterLetter)
    .subscribe((response) => (this.categoires = response,this.loaded = true));
    this.categoryService
      .GetCategoryCountAsync(this.filterLetter)
      .subscribe((response) => (this.categoryCount = response));
  }
}
