import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display application title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo h1')?.textContent).toContain('Mi Aplicación Angular');
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav-link');
    expect(navLinks.length).toBe(2);
    expect(navLinks[0].textContent).toContain('Principal');
    expect(navLinks[1].textContent).toContain('Contacto');
  });

  it('should have correct router links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const principalLink = compiled.querySelector('a[routerLink="/"]');
    const contactoLink = compiled.querySelector('a[routerLink="/contacto"]');
    
    expect(principalLink).toBeTruthy();
    expect(contactoLink).toBeTruthy();
  });
});
