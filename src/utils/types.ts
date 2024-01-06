export type AppStore = {
  isOpen: boolean;
  viewType: string;
  isModalOpen: boolean;
  edit: Event;
};

export type Event = {
  id: string;
  title: string;
  startTime: any;
  endTime: any;
};
