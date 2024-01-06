import {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
  useContext,
} from 'react';
import { AppContext } from '../context/app.context';
import { SET_EDIT, SET_OPEN_MODAL } from '../context/app.reducer';

export default function Modal({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const { dispatch } = useContext(AppContext);
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const close = useRef(null);

  const onDismiss = useCallback(() => {
    dispatch({ type: SET_OPEN_MODAL, payload: false });
    dispatch({ type: SET_EDIT, payload: {} });
  }, [dispatch]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (
        e.target === overlay.current ||
        e.target === wrapper.current ||
        e.target === close.current
      ) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper, close],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div ref={overlay} className="modal">
      <div className="modal-box">
        <div className="header">
          <div className="label">
            <span className="title">{title}</span>
            <span className="description">{description}</span>
          </div>

          <div ref={wrapper} className="close" onClick={onClick}>
            <span ref={close} className="close-icon">
              X
            </span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
