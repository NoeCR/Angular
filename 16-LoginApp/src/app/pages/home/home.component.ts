import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private ls: LoginService,
                private router: Router ) { }

  ngOnInit() {
  }

  logout() {
    this.ls.logout();
    this.router.navigateByUrl('/login');
  }
}
