import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmedComponent } from './formmed.component';

describe('FormmedComponent', () => {
  let component: FormmedComponent;
  let fixture: ComponentFixture<FormmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormmedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
