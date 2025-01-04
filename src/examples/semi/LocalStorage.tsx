import { useState, useEffect, useSyncExternalStore } from "react";

interface StorageState {
  name: string;
  lastUpdated: string | null;
}

const nameStorage = {
  subscribe: (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  },
  getSnapshot: () => localStorage.getItem("name") || "",
  getServerSnapshot: () => "",

  setValue: (name: string) => {
    localStorage.setItem("name", name);
    // Create and dispatch a custom storage event for the current tab
    const event = new StorageEvent("storage", {
      key: "name",
      newValue: name,
      oldValue: localStorage.getItem("name"),
      storageArea: localStorage,
    });
    window.dispatchEvent(event);
  },
};

export function LocalStorage() {
  const name = useSyncExternalStore(
    nameStorage.subscribe,
    nameStorage.getSnapshot,
    nameStorage.getServerSnapshot
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    nameStorage.setValue(e.target.value);
  };

  return (
    <section style={{ padding: "20px" }}>
      <h2>5. Local Storage with Storage Event</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label htmlFor="nameInput">Name:</label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter name"
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            padding: "12px",
            backgroundColor: "#f7fee7",
            border: "1px solid #bef264",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: "0 0 8px 0" }}>
            <strong>Current localStorage value:</strong>
          </p>
          <code>{localStorage.getItem("name") || "(empty)"}</code>
        </div>
      </div>
    </section>
  );
}
