import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupExpenseDialogComponent } from './add-group-expense-dialog.component';

describe('AddGroupExpenseDialogComponent', () => {
  let component: AddGroupExpenseDialogComponent;
  let fixture: ComponentFixture<AddGroupExpenseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroupExpenseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGroupExpenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
