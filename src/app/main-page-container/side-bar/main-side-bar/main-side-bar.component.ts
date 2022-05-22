import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonService} from "../../../shared/services/button-service/button.service";

@Component({
  selector: 'app-main-side-bar',
  templateUrl: './main-side-bar.component.html',
  styleUrls: ['./main-side-bar.component.css']
})
export class MainSideBarComponent implements OnInit {

  sidebarToggle: boolean = false;
  elements = Array(5);
  constructor(private router: Router, private route: ActivatedRoute, private _buttonService: ButtonService) { }

  ngOnInit(): void {
  }

  home($event: MouseEvent) {
    this.router.navigate(['personal'], { relativeTo: this.route });
  }

  emit($event: MouseEvent) {
    this.sidebarToggle = !this.sidebarToggle;
    this._buttonService.setSubRoomSideBarButtonClick(this.sidebarToggle)
  }
}
