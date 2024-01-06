import { useState } from 'react';
import { AMPM } from '../utils/helpers';

type Props = {
  hour: string;
  min: string;
  amPM: string;
  setHour: (hour: React.ChangeEvent<HTMLInputElement>) => void;
  setMin: (min: React.ChangeEvent<HTMLInputElement>) => void;
  setAmPm: (amPm: string) => void;
};

export const TimePicker = ({
  hour,
  min,
  amPM,
  setHour,
  setMin,
  setAmPm,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClick = (val: string) => {
    setShow(false);
    setAmPm(val);
  };
  return (
    <div className="time-picker">
      <div className="time-item">
        <label className="">H</label>
        <input
          className="time-box"
          type="number"
          min={1}
          max={12}
          value={hour ?? ''}
          onChange={setHour}
          required
        />
      </div>
      <div className="time-item">
        <label className="">M</label>
        <input
          className="time-box"
          type="number"
          min={0}
          max={59}
          required
          value={min ?? ''}
          onChange={setMin}
        />
      </div>
      <div className="time-item">
        <label className="">P</label>
        <span className="time-box" onClick={() => setShow((show) => !show)}>
          {amPM}
        </span>
        {show ? (
          <div className="dropdown">
            {Object.values(AMPM).map((item) => (
              <span
                key={item}
                className="event-type"
                onClick={() => handleClick(item)}
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
