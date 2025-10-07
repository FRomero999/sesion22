import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContacto } from './contacto';

describe('AppContacto', () => {
  let component: AppContacto;
  let fixture: ComponentFixture<AppContacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppContacto]
    })
    .compileComponents();

    fixture = TestBed.createComponent( AppContacto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display company name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Mi Empresa Angular');
  });

  it('should display contact information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('+34 123 456 789');
    expect(compiled.textContent).toContain('contacto@miempresa.com');
    expect(compiled.textContent).toContain('Calle Ejemplo, 123');
  });
});
