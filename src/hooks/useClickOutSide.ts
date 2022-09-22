import { useEffect } from "react";
interface ValidRefTarget {
  contains(target: EventTarget | null): any;
}
const useClickOutside = (
  ref: React.RefObject<ValidRefTarget>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      // MouseEvent
      document.addEventListener("mousedown", listener);
      // TouchEvent
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    [ref, handler]
  );
};

export default useClickOutside;
