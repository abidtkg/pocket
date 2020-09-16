import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageerorComponent } from './pageeror.component';

describe('PageerorComponent', () => {
  let component: PageerorComponent;
  let fixture: ComponentFixture<PageerorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageerorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageerorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
