import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorHome } from './instructor-home';

describe('InstructorHome', () => {
  let component: InstructorHome;
  let fixture: ComponentFixture<InstructorHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorHome],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
