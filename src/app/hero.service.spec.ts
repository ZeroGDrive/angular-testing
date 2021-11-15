import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe("HeroService", () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  });

  describe("get hero", () => {
    it("should call get with the correct url", () => {
      heroService.getHero(4).subscribe((hero) => {
        expect(hero).toBeDefined();
        expect(hero.id).toEqual(4);
      });

      const req = httpTestingController.expectOne("api/heroes/4");
      expect(req.request.method).toEqual("GET");
      req.flush({ id: 4, name: "SuperDude", strength: 100 });
      httpTestingController.verify();
    });
  });
});
