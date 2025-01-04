import { useState, RefCallback, useCallback } from "react";

export function ElementObserver() {
  const [isVisible, setIsVisible] = useState(false);

  const targetRef: RefCallback<HTMLDivElement> = useCallback((el) => {
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section>
      <h2>24. Element Observer</h2>
      <div
        style={{ height: "200px", overflow: "auto", border: "1px solid #ccc" }}
      >
        <div
          style={{ height: "300px", display: "flex", alignItems: "flex-end" }}
        >
          <div
            ref={targetRef}
            style={{
              padding: "20px",
              backgroundColor: isVisible ? "#646cff" : "#ccc",
              color: "white",
              transition: "background-color 0.3s",
            }}
          >
            {isVisible ? "Element is visible!" : "Scroll down to see me!"}
          </div>
        </div>
      </div>
    </section>
  );
}
