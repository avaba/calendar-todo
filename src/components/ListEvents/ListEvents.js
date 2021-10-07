import {Fragment} from 'react';
import './ListEvent.scss';

const ListEvents = (props) => {
  const eventElem = () => {
    const {event} = props

    switch (event.type) {
      case 'holiday':
        return (
            <>
              <span className="event-item__name">Праздник</span>
              <h3>{event.name}</h3>
              <p><strong>Бюджет:</strong> {event.money}$</p>
            </>
        );
      case 'event':
        return (
            <>
              <span className="event-item__name">Мероприятие</span>
              <h3>{event.name}</h3>
              <p><strong>Адрес:</strong> {event.address}</p>
              <p><strong>Время:</strong> {event.time}</p>
            </>
        );
      case 'notes':
        return (
            <>
              <span className="event-item__name">Заметка</span>
              <h3>{event.name}</h3>
              <p>{event.value}</p>
            </>
        );
      default:
        return ''
    }
  }

  return (
      <div className="event-item">
        {eventElem()}
      </div>
  );
};

export default ListEvents;
