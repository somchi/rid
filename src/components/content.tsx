import { useContext, useMemo, useState } from 'react';
import { Event } from '../utils/types';
import { EventCard } from './event-card';
import { EventForm } from './eventForm';
import { Header } from './header';
import { AppContext } from '../context/app.context';
import { EventView } from '../utils/helpers';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime, Settings } from 'luxon';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { SET_EDIT, SET_OPEN_MODAL } from '../context/app.reducer';

Settings.defaultZone = 'America/Los_Angeles';
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 });

export const Content = () => {
  const { state, dispatch } = useContext(AppContext);
  const [warn, setWarn] = useState<boolean>(false);
  const [data, setData] = useState<any>({} as any);

  const renderEventList = () => {
    const data = localStorage.getItem('events');
    let events: JSX.Element[] = [];
    if (data) {
      const parseData = JSON.parse(data);
      events = parseData.map((item: Event) => (
        <EventCard data={item} key={item.id} />
      ));
    }
    return events;
  };

  const eventList = useMemo(() => {
    const events = localStorage.getItem('events');
    let data = [];
    if (events) {
      const parseData = JSON.parse(events);
      data = parseData.map((item: Event) => {
        const startTime = DateTime.fromISO(item.startTime).toJSDate();
        const endTime = DateTime.fromISO(item.endTime).toJSDate();
        return { ...item, startTime, endTime };
      });
    }
    return data;
  }, []);

  const handleDelete = () => {
    setWarn(false);
    const events = localStorage.getItem('events');
    if (!events) return;

    const parseData = JSON.parse(events);
    const newEvents = parseData.filter(
      (item: Event) => parseInt(item.id) !== parseInt(data.id),
    );

    localStorage.setItem('events', JSON.stringify(newEvents));
    window.location.reload();
  };

  const handleWarn = () => {
    setWarn(true);
  };

  const handleEdit = () => {
    dispatch({
      type: SET_EDIT,
      payload: {
        ...data,
        startTime: DateTime.fromJSDate(data.startTime).toISO(),
        endTime: DateTime.fromJSDate(data.endTime).toISO(),
      },
    });
    dispatch({ type: SET_OPEN_MODAL, payload: true });
  };

  return (
    <main>
      <Header />
      <EventForm />
      {state.viewType === EventView.LIST ? (
        <div className="events-area">{renderEventList()}</div>
      ) : (
        <div className="events-calender">
          {Object.keys(data).length !== 0 ? (
            <div className="event-card" style={{ top: 0 }}>
              <div className="wrapper">
                <span>{data.title}</span>
                <span onClick={() => setData({})}>X</span>
              </div>
              <div className="time">
                from:{' '}
                <span>
                  {DateTime.fromJSDate(data.startTime).toFormat('ff')}
                </span>
                To:{' '}
                <span>{DateTime.fromJSDate(data.endTime).toFormat('ff')}</span>
              </div>
              <div className="action">
                <button className="delete" onClick={handleWarn}>
                  Delete
                </button>
                <button className="edit" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            </div>
          ) : null}
          <div className="eventCalender">
            <Calendar
              localizer={localizer}
              events={eventList}
              startAccessor="startTime"
              endAccessor="endTime"
              onSelectEvent={(e) => setData(e)}
            />
          </div>

          {warn ? (
            <div className="delete-warn">
              <span>Are you sure you what to delete {data.title}</span>
              <div className="action">
                <button className="delete" onClick={handleDelete}>
                  Delete
                </button>
                <button className="edit" onClick={() => setWarn(false)}>
                  cancel
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </main>
  );
};
