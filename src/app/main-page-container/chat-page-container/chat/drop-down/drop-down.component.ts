import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, QueryList,
  ViewChildren
} from '@angular/core';
import {User} from "../../../../shared/models/user";
import {ChatService} from "../../../services/chat-service/chat.service";
import {UserService} from "../../../../shared/services/user-service/user.service";
import {UserProfileService} from "../../../../shared/services/user-profile.service";

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() selected: boolean = false;
  @Output() selectedUser = new EventEmitter<string>();
  @Input() searchValue: string = "";
  @Input() displayNoUsersFound: boolean = false;
  opened: boolean = false;
  regexStr = `atd`;

  @ViewChildren("mainContainer")mainContainer: QueryList<any> | undefined;

  constructor(private _chatService: ChatService, private _userService: UserService, private _userProfileService: UserProfileService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  open(): void {
    this.opened = true;
  }

  closed(): void {
    this.opened = false;
  }

  onClick(user: User) {
    this._chatService.addMessageChannel(user, this._userProfileService.getUser().value);
  }

}
