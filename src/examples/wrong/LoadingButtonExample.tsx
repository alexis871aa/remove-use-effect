import React, { useState, useEffect, useRef } from "react";
import styles from "./LoadingButtonExample.module.css";
import { flushSync } from "react-dom";

interface LoadingButtonExampleProps {
  title?: string;
}

// Simulated API call
const fetchData = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Data loaded!");
    }, 2000);
  });

const loadFlow = async ({
  setState,
  animationRef,
}: {
  animationRef: React.RefObject<HTMLDivElement | null>;
  setState: React.Dispatch<React.SetStateAction<LoadingButtonExampleState>>;
}) => {
  try {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      buttonDisabled: true,
    }));
    const result = await fetchData();

    flushSync(() => {
      setState((prev) => ({
        ...prev,
        data: result,
        isLoading: false,
      }));
    });

    setState((prev) => ({
      ...prev,
      showAnimation: true,
    }));

    await new Promise((res) => {
      animationRef.current?.addEventListener("transitionend", () => {
        res(undefined);
      });
    });
    console.log("Animation ended");

    setState((prev) => ({
      ...prev,
      showAnimation: false,
      buttonDisabled: false,
    }));

    return result;
  } catch (err) {
    setState((prev) => ({
      ...prev,
      error: "Errors",
      isLoading: false,
    }));
    throw err;
  }
};

type LoadingButtonExampleState = {
  isLoading: boolean;
  data: string | null;
  showAnimation: boolean;
  error: string | null;
  buttonDisabled: boolean;
};

export const LoadingButtonExample: React.FC<LoadingButtonExampleProps> = ({
  title = "Loading Button Example",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ buttonDisabled, data, error, isLoading, showAnimation }, setState] =
    useState<LoadingButtonExampleState>(() => ({
      isLoading: true,
      data: null,
      showAnimation: false,
      error: null,
      buttonDisabled: false,
    }));

  useEffect(() => {
    if (isLoading) {
      loadFlow({ setState, animationRef: ref });
    }
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        <div className={styles.buttonContainer}>
          <button disabled={buttonDisabled} className={styles.button}>
            {isLoading ? (
              <div className={styles.spinner}>
                <div className={styles.spinnerIcon} />
                Loading...
              </div>
            ) : (
              "Click me"
            )}
          </button>

          {data && (
            <div
              ref={ref}
              className={`${styles.greeting} ${
                showAnimation ? styles.greetingVisible : ""
              }`}
            >
              <span>👋 Hello!</span>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};
