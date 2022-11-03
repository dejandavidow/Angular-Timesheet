import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  user=''
  constructor(private authService:AuthService,private router:Router) { }
  logout()
  {
    this.authService.logout()
    this.router.navigate(['login'])
  }
  ngOnInit(): void {
    let x = JSON.parse(localStorage.getItem('user') || "")
    this.user = x.name;
  }

}
