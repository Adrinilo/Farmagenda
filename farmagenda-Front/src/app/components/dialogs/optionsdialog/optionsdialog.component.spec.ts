import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsDialogComponent } from './optionsdialog.component';

describe('OptionsdialogComponent', () => {
  let component: OptionsDialogComponent;
  let fixture: ComponentFixture<OptionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
