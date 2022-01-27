import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectThumbnailComponent } from './select-thumbnail.component';

describe('SelectThumbnailComponent', () => {
  let component: SelectThumbnailComponent;
  let fixture: ComponentFixture<SelectThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
