import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { JwtService } from 'src/app/service/jwt.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let jwtServiceStub: Partial<JwtService>;

  beforeEach(() => {
    jwtServiceStub = {
      hello: () => of({ message: 'Hello from the service' })
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: JwtService, useValue: jwtServiceStub }]
    });
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the message correctly', () => {
    component.hello();
    expect(component.message).toBe('Hello from the service');
  });
});
