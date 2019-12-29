import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrillTimerPage } from './drill-timer.page';

describe('DrillTimerPage', () => {
  let component: DrillTimerPage;
  let fixture: ComponentFixture<DrillTimerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrillTimerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrillTimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
