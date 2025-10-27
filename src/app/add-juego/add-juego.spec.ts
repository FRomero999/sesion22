import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJuego } from './add-juego';

describe('AddJuego', () => {
  let component: AddJuego;
  let fixture: ComponentFixture<AddJuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
