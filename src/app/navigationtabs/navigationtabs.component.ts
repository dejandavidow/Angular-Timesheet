import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-navigationtabs',
  templateUrl: './navigationtabs.component.html',
  styleUrls: ['./navigationtabs.component.css']
})
export class NavigationtabsComponent implements OnInit {
  constructor(private authService:AuthService,private router:Router) { }
  logout()
  {
    this.authService.logout()
    this.router.navigate(['login'])
  }
  ngOnInit(): void {
}

}
