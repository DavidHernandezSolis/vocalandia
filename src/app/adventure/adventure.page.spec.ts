import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdventurePage } from './adventure.page';

describe('AdventurePage', () => {
  let component: AdventurePage;
  let fixture: ComponentFixture<AdventurePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
