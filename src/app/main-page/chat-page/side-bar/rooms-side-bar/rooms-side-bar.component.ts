import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms-side-bar',
  templateUrl: './rooms-side-bar.component.html',
  styleUrls: ['./rooms-side-bar.component.css']
})
export class RoomsSideBarComponent implements OnInit {

  elements = Array(25);

  constructor() { }

  ngOnInit(): void {
  }

}