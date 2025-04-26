import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook to dispatch an action after a specified delay, but only once within a given time period.
 * @param {Function} actionCreator - The Redux action creator to dispatch
 * @param {number} delay - Delay in ms before dispatching
 * @param {number} timeBetween - Minimum time in ms between dispatches
 */
const useDelayedDispatch = (actionCreator, delay, timeBetween) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef(null);
  const lastDispatchedRef = useRef(null);

  useEffect(() => {
    const dispatchAction = () => {
      dispatch(actionCreator())
        .then(() => {
          const now = Date.now();
          lastDispatchedRef.current = now;
          localStorage.setItem(actionCreator.type, now.toString());
        })
        .catch((error) => {
          console.error(`Failed to dispatch ${actionCreator.type}:`, error);
        });
    };

    const storedTime = localStorage.getItem(actionCreator.type);
    const now = Date.now();

    if (!storedTime || now - Number(storedTime) > timeBetween) {
      timeoutRef.current = setTimeout(dispatchAction, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [actionCreator, delay, timeBetween, dispatch]);
};

export default useDelayedDispatch;
