import React from "react";
import { useTransition, animated } from "@react-spring/web";

const Overlay = ({
  isOpen,
  toggleBottomSheet,
  ref,
}: {
  isOpen: boolean;
  toggleBottomSheet: () => void | Promise<void>;
  ref: any;
}) => {
  const transitions = useTransition(isOpen, () => ({
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  }));

  return (
    <>
      {transitions.map(
        (item: any) =>
          item && (
            <animated.div
              key={item}
              className="fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-50"
              onClick={toggleBottomSheet}
            ></animated.div>
          )
      )}
    </>
  );
};

export default Overlay;
