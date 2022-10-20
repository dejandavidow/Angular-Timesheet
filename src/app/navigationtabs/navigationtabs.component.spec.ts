import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationtabsComponent } from './navigationtabs.component';

describe('NavigationtabsComponent', () => {
  let component: NavigationtabsComponent;
  let fixture: ComponentFixture<NavigationtabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationtabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
