import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe("HeroComponent (shallow test)", () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  it("should have the correct hero", () => {
    component.hero = { id: 1, name: "SuperDude", strength: 3 };
    expect(component.hero.name).toEqual("SuperDude");
  });

  it("should render the hero name in a tag", () => {
    component.hero = { id: 1, name: "SuperDude", strength: 3 };
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css("a"));
    expect(de.nativeElement.textContent).toContain("SuperDude");
    // expect(
    //   (fixture.nativeElement as HTMLElement).querySelector("a").textContent
    // ).toContain("SuperDude");
  });
});
