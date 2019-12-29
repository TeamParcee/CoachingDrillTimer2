import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PracticePlansPage } from './practice-plans.page';

describe('PracticePlansPage', () => {
  let component: PracticePlansPage;
  let fixture: ComponentFixture<PracticePlansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticePlansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PracticePlansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
