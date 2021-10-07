import {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './App.scss'
import ListEvents from '../ListEvents/ListEvents';
import CalendarEvents from '../CalendarEvents/CalendarEvents';
import AddEvents from '../AddEvents/AddEvents';

class App extends Component {
  state = {
    day: new Date(),
    eventsList: [],
    addEventsDay: false,
  };

  maxId = 0

  componentDidMount () {
    this.renderListEvents();
  }

  onClickDay = (day) => {
    this.setState({
      day
    });
  };

  onAddEventsDay = () => {
    this.setState(({addEventsDay}) => ({
      addEventsDay: !addEventsDay
    }));
  };

  addNewEventsDay = (events) => {
    this.setState(({eventsList}) => {
      const newArr = [...eventsList, events];
      return {
        eventsList: newArr,
      };
    });
  };

  getDate = (date) => {
    return `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getDate()}`;
  };

  renderCalendar = () => {
    const {day, addEventsDay, eventsList} = this.state;

    if(!addEventsDay) {
      return <CalendarEvents
          addEvents={this.onAddEventsDay}
          onDay={this.onClickDay}
          events={eventsList}
          getDate={this.getDate}
          day={day}/>
    } else {
      return <AddEvents
          close={this.onAddEventsDay}
          addNewEventsDay={this.addNewEventsDay}
          id={this.maxId++}
          day={day}/>
    }
  };

  renderListEvents = () => {
    const {day, eventsList} = this.state;

    const selectDay = this.getDate(day);

    const event = eventsList.map(item => {
      const objDay = this.getDate(item.day);

      if (objDay === selectDay) {
        return <ListEvents
            key={this.maxId++}
            event={item.event}
        />;
      } else {
        return ''
      }
    });
    return event;
  };

  render () {
    return (
        <div className="app">
          <Container>
            <h1 className="mb-5">Тестовое задание</h1>
            <Row>
              <Col lg={4} md={5}>
                {this.renderCalendar()}
              </Col>
              <Col lg={8} md={7}>
                {this.renderListEvents()}
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
};

export default App;
