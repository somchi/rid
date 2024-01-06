import { useContext, useMemo } from 'react';
import { Event } from '../utils/types';
import { EventCard } from './event-card';
import { EventForm } from './eventForm';
import { Header } from './header';
import { AppContext } from '../context/app.context';
import { EventView } from '../utils/helpers';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime, Settings } from 'luxon';
import 'react-big-calendar/lib/css/react-big-calendar.css';

Settings.defaultZone = 'America/Los_Angeles';
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 });

export const Content = () => {
  const { state } = useContext(AppContext);

  const formats = useMemo(
    () => ({
      dateFormat: 'dd',

      dayFormat: (date: any, localizer: any) => {
        return localizer.toJSDate(date);
      },
    }),
    [],
  );

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

  return (
    <main>
      <Header />
      <EventForm />
      {state.viewType === EventView.LIST ? (
        <div className="events-area">{renderEventList()}</div>
      ) : (
        <div className="eventCalender">
          <Calendar
            localizer={localizer}
            events={eventList}
            startAccessor="startTime"
            endAccessor="endTime"
            formats={formats}
          />
        </div>
      )}
    </main>
  );
};
