import SendConsolelogWhenChangedCustomerAdressHandler
    from "./handler/send-consolelog-when-changed-customer-adress.handler";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import ChangedCustomerAddressEvent from "./changed-customer-address.event";
import Address from "../value-object/address";

describe("ChangedCustomerAddressEvent tests", () => {

    it('should register an event handler without error', () => {
        const handler = new SendConsolelogWhenChangedCustomerAdressHandler();
        const eventDispatcher = new EventDispatcher();

        expect(() => {
            eventDispatcher.register("ChangedCustomerAddressEvent", handler);
        }).not.toThrowError();

        expect(eventDispatcher.getEventHandlers.ChangedCustomerAddressEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.ChangedCustomerAddressEvent.length).toBe(1);
    });

    it('should handle all events without error', () => {
        const handler = new SendConsolelogWhenChangedCustomerAdressHandler();
        const eventDispatcher = new EventDispatcher();
        eventDispatcher.register("ChangedCustomerAddressEvent", handler);

        const customer : Customer = new Customer("123", "John Doe");
        customer.Address = new Address("Rua 1", 123, "12345-123", "São Paulo");
        const event = new ChangedCustomerAddressEvent(customer);

        expect(() => {
            eventDispatcher.notify(event);
        }).not.toThrowError();
    });

    it('should console log the expected message when customer address is changed', () => {
        const handler = new SendConsolelogWhenChangedCustomerAdressHandler();
        const eventDispatcher = new EventDispatcher();
        eventDispatcher.register("ChangedCustomerAddressEvent", handler);

        const customer : Customer = new Customer("123", "John Doe");
        customer.Address = new Address("Rua 1", 123, "12345-123", "São Paulo");
        const event = new ChangedCustomerAddressEvent(customer);

        const spyEventHandler = jest.spyOn(handler, "handle");
        const consoleSpy = jest.spyOn(console, 'log');

        eventDispatcher.notify(event);

        expect(spyEventHandler).toHaveBeenCalledTimes(1);
        expect(spyEventHandler).toHaveBeenCalledWith(event);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith("Endereço do cliente 123, John Doe alterado para: Rua 1, 123, 12345-123, São Paulo");
    });
});