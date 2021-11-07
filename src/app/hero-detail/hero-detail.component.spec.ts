import { Location } from "@angular/common";
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";

describe("HeroDetailComponent", () => {
  let mockActivatedRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return "3";
          },
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
  });

  it("should render hero name in a h2 tag", () => {
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "SuperDude", strength: 100 })
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "SUPERDUDE"
    );
  });

  it("should call update hero when save is called", fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.componentInstance.save();
    tick(250); // if you know the time
    // flush() // if you don't know the time
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  it(
    "should call update hero when save is called",
    waitForAsync(() => {
      mockHeroService.updateHero.and.returnValue(of({}));

      fixture.componentInstance.save();

      fixture.whenStable().then(() => {
        expect(mockHeroService.updateHero).toHaveBeenCalled();
      });
    })
  );
});
