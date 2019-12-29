import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPlanPage } from './add-plan.page';

describe('AddPlanPage', () => {
  let component: AddPlanPage;
  let fixture: ComponentFixture<AddPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
