import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ChangedCustomerAddressEvent from "../changed-customer-address.event";

export default class SendConsolelogWhenChangedCustomerAdressHandler implements EventHandlerInterface<ChangedCustomerAddressEvent> {
    handle(event: ChangedCustomerAddressEvent) {
        const mensagem = `Endereço do cliente ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.Address.street}, ${event.eventData.Address.number}, ${event.eventData.Address.zip}, ${event.eventData.Address.city}`;
        console.log(mensagem);
    }
}