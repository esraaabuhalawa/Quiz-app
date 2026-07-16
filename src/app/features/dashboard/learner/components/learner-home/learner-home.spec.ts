import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerHome } from './learner-home';

describe('LearnerHome', () => {
  let component: LearnerHome;
  let fixture: ComponentFixture<LearnerHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerHome],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
