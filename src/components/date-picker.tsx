import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

export default function DatePicker({
  selected,
  setSelected,
}: {
  selected: any;
  setSelected: (date: any) => void;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="date-picker">
      <div className="calander-value" onClick={() => setShow((show) => !show)}>
        <span>{format(selected, 'PP')}</span>
        <span></span>
      </div>
      {show ? (
        <div className="datetime">
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </div>
      ) : null}
    </div>
  );
}
