import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectoComponent } from './prospecto.component';

describe('ProspectoComponent', () => {
  let component: ProspectoComponent;
  let fixture: ComponentFixture<ProspectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProspectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
