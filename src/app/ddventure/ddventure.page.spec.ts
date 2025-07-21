import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DdventurePage } from './ddventure.page';

describe('DdventurePage', () => {
  let component: DdventurePage;
  let fixture: ComponentFixture<DdventurePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DdventurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
