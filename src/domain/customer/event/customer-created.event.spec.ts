import CustomerCreatedEvent from "./customer-created.event";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsolelog1WhenCustomerCreatedHandler from "./handler/send-consolelog1-when-customer-created.handler";
import SendConsolelog2WhenCustomerCreatedHandler from "./handler/send-consolelog2-when-customer-created.handler";
import Customer from "../entity/customer";

describe("CustomerCreatedEvent tests", () => {

        it('should console log the expected message when customer is created', () => {
            const handler1 = new SendConsolelog1WhenCustomerCreatedHandler();
            const handler2 = new SendConsolelog2WhenCustomerCreatedHandler();

            const eventDispatcher = new EventDispatcher();
            eventDispatcher.register("CustomerCreatedEvent", handler1);
            eventDispatcher.register("CustomerCreatedEvent", handler2);

            const spyEventHandler1 = jest.spyOn(handler1, "handle");
            const spyEventHandler2 = jest.spyOn(handler2, "handle");
            const consoleSpy = jest.spyOn(console, 'log');

            const customer = new Customer("123", "John Doe");
            const event = new CustomerCreatedEvent(customer);

            eventDispatcher.notify(event);

            expect(spyEventHandler1).toHaveBeenCalledTimes(1);
            expect(spyEventHandler2).toHaveBeenCalledTimes(1);
            expect(spyEventHandler1).toHaveBeenCalledWith(event);
            expect(spyEventHandler2).toHaveBeenCalledWith(event);

            expect(consoleSpy).toHaveBeenCalledTimes(2);
            expect(consoleSpy).toHaveBeenCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
            expect(consoleSpy).toHaveBeenCalledWith("Esse é o segundo console.log do evento: CustomerCreated");
        });

        it('should register an event handler without error', () => {
            const handler = new SendConsolelog1WhenCustomerCreatedHandler();
            const eventDispatcher = new EventDispatcher();

            expect(() => {
                eventDispatcher.register("CustomerCreatedEvent", handler);
            }).not.toThrowError();

            expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent).toBeDefined();
            expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(1);
        });

        it('should handle all events without error', () => {
            const handler1 = new SendConsolelog1WhenCustomerCreatedHandler();
            const handler2 = new SendConsolelog2WhenCustomerCreatedHandler();

            const eventDispatcher = new EventDispatcher();
            eventDispatcher.register("CustomerCreatedEvent", handler1);
            eventDispatcher.register("CustomerCreatedEvent", handler2);

            const customer = new Customer("123", "John Doe");
            const event = new CustomerCreatedEvent(customer);

            expect(() => {
                eventDispatcher.notify(event);
            }).not.toThrowError();
        });
});