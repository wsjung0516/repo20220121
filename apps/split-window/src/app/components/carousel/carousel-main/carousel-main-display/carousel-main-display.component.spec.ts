import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMainDisplayComponent } from './carousel-main-display.component';

describe('CarouselMainDisplayComponent', () => {
  let component: CarouselMainDisplayComponent;
  let fixture: ComponentFixture<CarouselMainDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselMainDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselMainDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
