import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/app.context';
import Modal from './modal';
import DatePicker from './date-picker';
import { TimePicker } from './time-picker';
import { Event } from '../utils/types';
import { DateTime } from 'luxon';
import { convertTo12, convertTo24 } from '../utils/helpers';
import { SET_OPEN_MODAL } from '../context/app.reducer';

export const EventForm = () => {
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState<Event>({
    startTime: new Date(),
    endTime: new Date(),
    id: '',
    title: '',
  });
  const [msg, setMsg] = useState<string>('');
  const [time, setTime] = useState<any>({} as any);

  useEffect(() => {
    if (Object.keys(state.edit).length !== 0) {
      const startDate = DateTime.fromISO(state.edit.startTime);
      const endDate = DateTime.fromISO(state.edit.endTime);
      console.log(startDate.toJSDate());
      setData({
        ...state.edit,
        startTime: startDate.toJSDate(),
        endTime: endDate.toJSDate(),
      });
      setTime({
        start: {
          hour: convertTo12(startDate.hour).hour,
          min: startDate.minute,
          amPm: convertTo12(startDate.hour).amPm,
        },
        end: {
          hour: convertTo12(endDate.hour).hour,
          min: endDate.minute,
          amPm: convertTo12(endDate.hour).amPm,
        },
      });
    }
  }, [state.edit]);

  const handleSave = (e: any) => {
    e.preventDefault();
    const start = data.startTime;
    const end = data.endTime;
    if (!start || !end) {
      setMsg("Date can't be empty");
    } else {
      const startTime = DateTime.fromObject({
        year: start.getFullYear(),
        month: start.getMonth() + 1,
        day: start.getDay(),
        hour: convertTo24(parseInt(time.start.hour), time.start.amPm),
        minute: parseInt(time.start.min),
        second: 0,
        millisecond: 0,
      }).toISO();

      const endTime = DateTime.fromObject({
        year: end.getFullYear(),
        month: end.getMonth() + 1,
        day: end.getDay(),
        hour: convertTo24(parseInt(time.end.hour), time.end.amPm),
        minute: parseInt(time.end.min),
        second: 0,
        millisecond: 0,
      }).toISO();

      const events = localStorage.getItem('events');
      let newEvents: any[] = [];
      if (Object.keys(state.edit).length === 0) {
        let payload = {
          startTime,
          endTime,
          id: DateTime.now().toUnixInteger(),
          title: data.title,
        };
        if (events) {
          const parseData = JSON.parse(events);
          newEvents = [...parseData, payload];
        } else {
          newEvents = [payload];
        }
      } else {
        const payload = {
          startTime,
          endTime,
          id: data.id,
          title: data.title,
        };
        if (events) {
          const parseData = JSON.parse(events);
          newEvents = parseData.map((item: any) => {
            if (item.id === payload.id) {
              return payload;
            }
            return item;
          });
        }
      }

      localStorage.setItem('events', JSON.stringify(newEvents));
      setMsg('Saved');
      window.location.reload();
      dispatch({ type: SET_OPEN_MODAL, payload: false });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const field = e.target.name;
    setData({ ...data, [field]: value });
  };

  console.log(data);

  return (
    <>
      {state.isModalOpen ? (
        <Modal
          title={'Add Event'}
          description={'Fill the form to create event'}
        >
          <h3 className="text-theme-danger font-medium">{msg}</h3>
          <form onSubmit={handleSave}>
            <div className="form-control">
              <label className="form-label">Event Title</label>
              <input
                className="form-input"
                required
                name="title"
                onChange={handleChange}
                value={data.title ?? ''}
              />
            </div>
            <div className="picker">
              <div className="calender">
                <label className="form-label">Start</label>
                <DatePicker
                  selected={data.startTime ?? new Date()}
                  setSelected={(date: any) =>
                    setData({ ...data, startTime: date })
                  }
                />
              </div>
              <TimePicker
                hour={time.start?.hour ?? ''}
                min={time.start?.min ?? ''}
                amPM={time.start?.amPm ?? ''}
                setHour={(e) =>
                  setTime({
                    ...time,
                    start: { ...time.start, hour: e.target.value },
                  })
                }
                setMin={(e) =>
                  setTime({
                    ...time,
                    start: { ...time.start, min: e.target.value },
                  })
                }
                setAmPm={(amPm) =>
                  setTime({ ...time, start: { ...time.start, amPm } })
                }
              />
            </div>
            <div className="picker">
              <div className="calender">
                <label className="form-label">End</label>
                <DatePicker
                  selected={data.endTime ?? new Date()}
                  setSelected={(date: any) =>
                    setData({ ...data, endTime: date })
                  }
                />
              </div>
              <TimePicker
                hour={time.end?.hour ?? ''}
                min={time.end?.min ?? ''}
                amPM={time.end?.amPm ?? ''}
                setHour={(e) =>
                  setTime({
                    ...time,
                    end: { ...time.end, hour: e.target.value },
                  })
                }
                setMin={(e) =>
                  setTime({
                    ...time,
                    end: { ...time.end, min: e.target.value },
                  })
                }
                setAmPm={(amPm) =>
                  setTime({ ...time, end: { ...time.end, amPm } })
                }
              />
            </div>
            <div className="form-control">
              <button>Save</button>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
};
