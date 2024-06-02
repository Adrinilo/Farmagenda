import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectoMostrarComponent } from './prospectomostrar.component';

describe('ProspectoMostrarComponent', () => {
  let component: ProspectoMostrarComponent;
  let fixture: ComponentFixture<ProspectoMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectoMostrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProspectoMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
