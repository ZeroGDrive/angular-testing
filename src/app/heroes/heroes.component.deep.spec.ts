import { Location } from "@angular/common";
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe("HeroComponent (deep)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService = jasmine.createSpyObj([
    "getHeroes",
    "addHero",
    "deleteHero",
  ]);
  let location: Location;
  const HEROES = [
    { id: 1, name: "SpiderDude", strength: 8 },
    { id: 2, name: "Wonderful Woman", strength: 24 },
    { id: 3, name: "SuperDude", strength: 55 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: "detail/:id", component: HeroComponent },
        ]),
      ],
      declarations: [HeroComponent, HeroesComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);
    location = TestBed.inject(Location);
  });

  it("should render each hero", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(de.length).toBe(3);
  });

  it(`
  should call heroService.deleteHero
  when the hero component delete button is clicked`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponentDE = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponentDE[0]
      .query(By.css(".delete"))
      .triggerEventHandler("click", { stopPropagation: () => {} });
    // heroComponentDE[0].triggerEventHandler("delete", null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should add a new hero
  to the heroList when the add button is clicked`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = "Mr. Ice";
    mockHeroService.addHero.and.returnValue(
      of({ id: 5, name: name, strength: 4 })
    );
    const inputElement = fixture.debugElement.query(
      By.css("input")
    ).nativeElement;
    const addButton = fixture.debugElement.query(By.css("#addButton"));

    inputElement.value = name;
    addButton.triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(mockHeroService.addHero).toHaveBeenCalled();
    expect(
      fixture.debugElement.queryAll(By.directive(HeroComponent)).length
    ).toBe(4);
  });

  fit("should have the correct route for the first hero", fakeAsync(() => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    heroComponents[0].query(By.css("a")).nativeElement.click();
    flush();
    expect(location.path()).toEqual("/detail/1");
  }));
});
