import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteLoaderComponent } from './website-loader.component';

describe('WebsiteLoaderComponent', () => {
  let component: WebsiteLoaderComponent;
  let fixture: ComponentFixture<WebsiteLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
