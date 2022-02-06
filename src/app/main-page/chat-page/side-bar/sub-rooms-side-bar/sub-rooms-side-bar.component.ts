import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-rooms-side-bar',
  templateUrl: './sub-rooms-side-bar.component.html',
  styleUrls: ['./sub-rooms-side-bar.component.css']
})
export class SubRoomsSideBarComponent implements OnInit {

  elements = Array(15);
  constructor() { }

  ngOnInit(): void {
  }

}
