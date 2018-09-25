import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSkuComponent } from './show-sku.component';

describe('ShowSkuComponent', () => {
  let component: ShowSkuComponent;
  let fixture: ComponentFixture<ShowSkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSkuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
