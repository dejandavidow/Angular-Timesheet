import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  user = ''
  logout()
  {
    this.authService.logout()
    this.router.navigate(['login'])
  }
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    let x = JSON.parse(localStorage.getItem('user') || "")
    this.user = x.name;
  }

}
