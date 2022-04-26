import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBlurbComponent } from './book-blurb.component';

describe('BookBlurbComponent', () => {
  let component: BookBlurbComponent;
  let fixture: ComponentFixture<BookBlurbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookBlurbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookBlurbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
