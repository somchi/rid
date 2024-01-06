export enum EventView {
  LIST = 'List View',
  CALENDER = 'Calender View',
}

export enum AMPM {
  AM = 'AM',
  PM = 'PM',
}

export const convertTo24 = (hour: number, amPm: string) => {
  let result = 0;

  if (amPm === AMPM.AM) {
    result = hour === 12 ? 0 : hour;
  } else {
    result = hour === 12 ? hour : hour + 12;
  }
  return result;
};

export const convertTo12 = (hour: number) => {
  let result = { hour: 0, amPm: '' };

  if (hour === 0 || hour === 12) {
    result = { hour: 12, amPm: hour === 0 ? AMPM.AM : AMPM.PM };
  } else if (hour > 12) {
    result = { hour: hour - 12, amPm: AMPM.PM };
  } else {
    result = { hour: hour, amPm: AMPM.AM };
  }

  return result;
};
