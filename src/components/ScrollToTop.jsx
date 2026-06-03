import { useEffect, useRef } from "react";

const ScrollToTop = () => {
  const buttonRef = useRef(null);
  const visibleRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const setVisible = (visible) => {
      if (visibleRef.current === visible) return;

      visibleRef.current = visible;
      button.classList.toggle("is-visible", visible);
    };

    const checkScroll = () => {
      tickingRef.current = false;
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };

    const onScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      requestAnimationFrame(checkScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    checkScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  return (
    <button
      ref={buttonRef}
      className="scroll-top-button"
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;