import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeDetailPage } from './practice-detail.page';

describe('PracticeDetailPage', () => {
  let component: PracticeDetailPage;
  let fixture: ComponentFixture<PracticeDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
