import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  templateUrl: './add-mob.component.html',
  styleUrls: ['./add-mob.component.css']
})
export class AddMobComponent implements OnInit {
  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
  }
}