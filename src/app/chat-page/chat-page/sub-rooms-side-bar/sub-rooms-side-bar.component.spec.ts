import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubRoomsSideBarComponent } from './sub-rooms-side-bar.component';

describe('SubRoomsSideBarComponent', () => {
  let component: SubRoomsSideBarComponent;
  let fixture: ComponentFixture<SubRoomsSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubRoomsSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubRoomsSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
