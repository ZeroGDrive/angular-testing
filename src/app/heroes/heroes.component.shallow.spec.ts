import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";
describe("HeroesComponent (shallow)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [],
    });
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 24 },
      { id: 3, name: "SuperDude", strength: 55 },
    ];
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it("should set heroes correctly from service", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(component.heroes.length).toBe(3);
  });

  it("should create one li for eeach hero", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    let de = fixture.debugElement.queryAll(By.css("li"));
    expect(de.length).toBe(3);
  });
});
