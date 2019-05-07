import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToSports() {
    this.router.navigate(['/settings/sports']);
  }

  goToUsers() {
    this.router.navigate(['/settings/users']);
  }

  goToStadiums() {
    this.router.navigate(['/settings/stadiums']);
  }
}
