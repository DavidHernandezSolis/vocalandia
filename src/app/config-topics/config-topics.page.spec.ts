import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigTopicsPage } from './config-topics.page';

describe('ConfigTopicsPage', () => {
  let component: ConfigTopicsPage;
  let fixture: ComponentFixture<ConfigTopicsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTopicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
