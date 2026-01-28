"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const MeaningListContext = createContext(null);

export function MeaningListProvider({ storageKey = 'meaning-list', children }) {
  const [items, setItems] = useState([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      // Ignore malformed storage.
    } finally {
      setHasHydrated(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (error) {
      // Ignore storage write failures.
    }
  }, [items, hasHydrated, storageKey]);

  const value = useMemo(
    () => ({
      items,
      addItem: (item) => {
        const trimmed = item.trim();
        if (!trimmed) return;
        setItems((prev) => [...prev, trimmed]);
      },
      removeItem: (index) => {
        setItems((prev) => prev.filter((_, idx) => idx !== index));
      },
      clearItems: () => setItems([]),
    }),
    [items],
  );

  return (
    <MeaningListContext.Provider value={value}>
      {children}
    </MeaningListContext.Provider>
  );
}

export function MeaningListPrompt({ heading = 'Your list', hint = 'Keep it short. Three to five items is plenty.' }) {
  const { items, addItem, removeItem, clearItems } = useContext(MeaningListContext);
  const [input, setInput] = useState('');

  if (!items) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem(input);
    setInput('');
  };

  return (
    <section className="meaning-list">
      <h3 className="meaning-list__title">{heading}</h3>
      <p className="meaning-list__hint">{hint}</p>
      <form className="meaning-list__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. my partner, the forest, making art"
          aria-label="Add something that gives your life meaning"
        />
        <button type="submit">Add</button>
      </form>
      {items.length > 0 ? (
        <>
          <ul className="meaning-list__items">
            {items.map((item, index) => (
              <li key={`${item}-${index}`}>
                <span>{item}</span>
                <button type="button" onClick={() => removeItem(index)} aria-label={`Remove ${item}`}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="meaning-list__clear" onClick={clearItems}>
            Clear list
          </button>
        </>
      ) : null}
    </section>
  );
}

export function MeaningListEcho({ heading = 'What you named' }) {
  const { items } = useContext(MeaningListContext);

  if (!items) return null;

  return (
    <aside className="meaning-list meaning-list--echo">
      <h3 className="meaning-list__title">{heading}</h3>
      {items.length ? (
        <ul className="meaning-list__items">
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="meaning-list__hint">Your list will appear here after you add a few items.</p>
      )}
    </aside>
  );
}
