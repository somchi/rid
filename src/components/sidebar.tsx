import { useContext } from 'react';
import { AppContext } from '../context/app.context';
import { SET_ISOPEN, SET_OPEN_MODAL } from '../context/app.reducer';
import { Menu } from '../assets/Menu';

export const Sidebar = () => {
  const { state, dispatch } = useContext(AppContext);

  const toggleSideBar = () => {
    dispatch({ type: SET_ISOPEN, payload: !state.isOpen });
  };

  const handleAddEvent = () => {
    if (!state.isOpen) {
      toggleSideBar();
    }
    dispatch({ type: SET_OPEN_MODAL, payload: true });
  };

  return (
    <aside data-open={state.isOpen}>
      <div className="sidebar-header">
        <div id="hamburger" onClick={toggleSideBar}>
          <Menu />
        </div>
        <span className="logo" data-open={state.isOpen}>
          RID
        </span>
      </div>
      <div className="separator"></div>
      <div className="sidebar-content">
        <div className="sidebar-item" onClick={handleAddEvent}>
          <span className="icon">+</span>
          <span className="label">Add Event</span>
        </div>
      </div>
    </aside>
  );
};
