import { MessageService } from "./message.service";
describe("MessageService", () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it("Should have no messages to start", () => {
    expect(service.messages.length).toBe(0);
  });

  it("should add a message when push is called", () => {
    service.add("Message1");
    expect(service.messages.length).toBe(1);
  });

  it("should remove all messages when clear is called", () => {
    service.add("Message1");
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
