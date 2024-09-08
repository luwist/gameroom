import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthenticateComponent } from './not-authenticate.component';

describe('NotAuthenticateComponent', () => {
  let component: NotAuthenticateComponent;
  let fixture: ComponentFixture<NotAuthenticateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAuthenticateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
