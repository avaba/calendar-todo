import {Component, Fragment} from 'react';
import {Button, Col, FloatingLabel, Form, Row} from 'react-bootstrap';
import './AddEvent.scss';

class AddEvents extends Component {
  state = {
    id: this.props.id,
    day: this.props.day,
    typeEvents: null,
    nameEvent: '',
    holiday: {
      type: 'holiday',
      money: ''
    },
    eventsDay: {
      type: 'event',
      address: '',
      time: ''
    },
    notes: {
      type: 'notes',
      value: ''
    },
    validated: false
  };

  eventGenerate = () => {
    const {id, typeEvents, holiday, day, notes, eventsDay, nameEvent} = this.state;

    switch (typeEvents) {
      case holiday.type:
        return {
          id,
          day,
          event: {type: holiday.type, name: nameEvent, money: holiday.money},
        };
      case eventsDay.type:
        return {
          id,
          day,
          event: {type: eventsDay.type, name: nameEvent, address: eventsDay.address, time: eventsDay.time},
        };
      case notes.type:
        return {
          id,
          day,
          event: {type: notes.type, name: nameEvent, value: notes.value}
        };
      default:
        return '';
    }
  };

  onSubmitEvent = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const newEvent = this.eventGenerate();
      this.props.addNewEventsDay(newEvent);
      this.props.close();
    }

    this.setState(({validated}) => ({
      validated: true
    }));
  };

  onChangeMoney = (e) => {
    this.setState(({holiday}) => ({
      holiday: {...holiday, money: e.target.value}
    }));
  };

  onChangeEventsDayAddress = (e) => {
    this.setState(({eventsDay}) => ({
      eventsDay: {...eventsDay, address: e.target.value}
    }));
  };

  onChangeEventsDayTime = (e) => {
    this.setState(({eventsDay}) => ({
      eventsDay: {...eventsDay, time: e.target.value}
    }));
  };

  onChangeNotes = (e) => {
    this.setState(({notes}) => ({
      notes: {...notes, value: e.target.value}
    }));
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render () {
    const {typeEvents, nameEvent, holiday, eventsDay, notes, validated} = this.state;

    const renderEventsInput = () => {
      switch (typeEvents) {
        case holiday.type:
          return (
              <FloatingLabel className="mb-3" controlId="money" label="Бюджет в $">
                <Form.Control
                    value={holiday.money}
                    onChange={this.onChangeMoney}
                    name="money"
                    type="number"
                    placeholder="Бюджет в $"
                    min="0"
                    autoComplete="off"
                    required
                />
                <Form.Control.Feedback>Какой ты богатый!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Введите бюджет
                </Form.Control.Feedback>
              </FloatingLabel>
          );
        case eventsDay.type:
          return (
              <Fragment>
                <FloatingLabel className="mb-3" controlId="address" label="Куда идти?">
                  <Form.Control
                      value={eventsDay.address}
                      name="address"
                      type="text"
                      placeholder="Куда идти?"
                      onChange={this.onChangeEventsDayAddress}
                      autoComplete="off"
                      required
                  />
                  <Form.Control.Feedback>В путь!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Куда топать то?
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="time" label="Во сколько?">
                  <Form.Control
                      value={eventsDay.time}
                      name="time"
                      type="time"
                      placeholder="Во сколько?"
                      onChange={this.onChangeEventsDayTime}
                      autoComplete="off"
                      required
                  />
                  <Form.Control.Feedback>Пунктуальный!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Так во сколько?
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Fragment>
          );
        case notes.type:
          return (
              <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Заметочка">
                <Form.Control
                    as="textarea"
                    placeholder="Заметочка"
                    style={{height: '100px'}}
                    value={notes.value}
                    name="notes"
                    onChange={this.onChangeNotes}
                    autoComplete="off"
                    required
                />
                <Form.Control.Feedback>Молодец!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Введите текст
                </Form.Control.Feedback>
              </FloatingLabel>
          );
        default:
          return '';
      }
    };

    return (
        <Form className="event-form" noValidate validated={validated} onSubmit={this.onSubmitEvent}>
          <FloatingLabel className="mb-3" controlId="name" label="Название события">
            <Form.Control
                type="text"
                placeholder="Введите название"
                name="nameEvent"
                onChange={this.onChangeInput}
                value={nameEvent}
                autoComplete="off"
                required
            />
            <Form.Control.Feedback>Хорошо!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Введите название
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className="mb-3" controlId="typeEvents" label="Тип события">
            <Form.Select
                aria-label="Выберите тип события"
                name="typeEvents"
                onChange={this.onChangeInput}
                required
            >
              <option value="">Выберите тип события</option>
              <option value="holiday">Праздничные дни</option>
              <option value="event">Мероприятия</option>
              <option value="notes">Заметка</option>
            </Form.Select>
            <Form.Control.Feedback>Умница!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Выберите тип
            </Form.Control.Feedback>
          </FloatingLabel>

          {renderEventsInput()}

          <Row className="justify-content-md-between">
            <Col md="auto">
              <Button
                  variant="light"
                  onClick={this.props.close}>Отмена</Button>
            </Col>
            <Col md="auto">
              <Button
                  type="submit"
                  variant="success">Сохранить</Button>
            </Col>
          </Row>
        </Form>
    );
  }
}

export default AddEvents;
