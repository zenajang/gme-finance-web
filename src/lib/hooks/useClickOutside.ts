import { useEffect, type RefObject } from 'react';

// ref 요소 바깥을 누르면 onOutsideClick 을 부른다. isEnabled 가 false 면 감지하지 않는다
export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onOutsideClick: () => void,
  isEnabled = true,
) => {
  useEffect(() => {
    if (!isEnabled) return;
    const callIfOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onOutsideClick();
    };
    document.addEventListener('mousedown', callIfOutside);
    return () => document.removeEventListener('mousedown', callIfOutside);
  }, [ref, onOutsideClick, isEnabled]);
};
