import { useContext, useState } from 'react';
import { AppContext } from '../context/app.context';
import { SET_ISOPEN, SET_VIEW_TYPE } from '../context/app.reducer';
import { Avatar } from '../assets/Avatar';
import { ChevronDown } from '../assets/ChevronDown';
import { EventView } from '../utils/helpers';

export const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const { state, dispatch } = useContext(AppContext);

  const toggleSideBar = () => {
    dispatch({ type: SET_ISOPEN, payload: true });
  };

  const handleOpen = () => {
    setOpenDropdown((openDropdown) => !openDropdown);
  };

  const handleSelect = (selected: string) => {
    dispatch({ type: SET_VIEW_TYPE, payload: selected });
    setOpenDropdown((openDropdown) => !openDropdown);
  };

  return (
    <div className="header">
      <div className="header-left">
        <div id="hamburger" onClick={toggleSideBar}>
          <img src="/hamburger.png" alt="hamburgar" />
        </div>
        <span className="title">Dashboard</span>
      </div>
      <div className="header-right">
        <div className="selector">
          <div
            className="selected-event"
            onClick={handleOpen}
            data-testid="dropdownOpen"
          >
            <span data-testid="selected">{state.viewType}</span>
            <div className="arrow">
              <ChevronDown />
            </div>
          </div>
          {openDropdown ? (
            <div className="dropdown">
              {Object.values(EventView).map((item) => (
                <span
                  key={item}
                  className="event-type"
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="user-icon">
          <Avatar />
        </div>
      </div>
    </div>
  );
};
