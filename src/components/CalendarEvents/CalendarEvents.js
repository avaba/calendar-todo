import {Component, Fragment} from 'react';
import Calendar from 'react-calendar';
import {Button} from 'react-bootstrap';
import './Calendar.scss'

class CalendarEvents extends Component {
  dateArray = () => {
    const newDate = this.props.events.map(x => {
      return (
          {date: this.props.getDate(x.day)}
      )
    })

    return newDate
  }

  setClass = (date) => {
    const dateObj =
        this.dateArray().find((x) => {
          return (
              date.getDay() === new Date(x.date).getDay() &&
              date.getMonth() === new Date(x.date).getMonth() &&
              date.getDate() === new Date(x.date).getDate()
          );
        });
    return dateObj ? 'active-date' : '';
  };

  render () {
    const {day, onDay} = this.props;

    return (
        <Fragment>
          <Calendar
              className="calendar-event w-100"
              onClickDay={onDay}
              activeStartDate={day}
              tileClassName={({activeStartDate, date, view}) => this.setClass(date)}
              value={day}
          />
          <Button
              className="d-block w-100 mt-3 mb-3"
              day={day}
              onClick={this.props.addEvents}
          >
            Добавить
          </Button>
        </Fragment>
    );
  }
}

export default CalendarEvents;
