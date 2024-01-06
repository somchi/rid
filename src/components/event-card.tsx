import { useContext, useState } from 'react';
import { AppContext } from '../context/app.context';
import { SET_EDIT, SET_OPEN_MODAL } from '../context/app.reducer';
import { Event } from '../utils/types';
import { DateTime } from 'luxon';

export const EventCard = ({ data }: { data: Event }) => {
  const { dispatch } = useContext(AppContext);
  const [warn, setWarn] = useState<boolean>(false);

  const handleEdit = () => {
    dispatch({ type: SET_EDIT, payload: data });
    dispatch({ type: SET_OPEN_MODAL, payload: true });
  };

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

  return (
    <div className="event-item">
      <div className="event-card">
        <div>
          <span>{data.title}</span>
        </div>
        <div className="time">
          from: <span>{DateTime.fromISO(data.startTime).toFormat('ff')}</span>
          To: <span>{DateTime.fromISO(data.endTime).toFormat('ff')}</span>
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
  );
};
