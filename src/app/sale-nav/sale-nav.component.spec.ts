
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SaleNavComponent } from './sale-nav.component';

describe('SaleNavComponent', () => {
  let component: SaleNavComponent;
  let fixture: ComponentFixture<SaleNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [SaleNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
