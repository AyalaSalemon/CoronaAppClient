import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPathComponent } from './report-path.component';

describe('ReportPathComponent', () => {
  let component: ReportPathComponent;
  let fixture: ComponentFixture<ReportPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
