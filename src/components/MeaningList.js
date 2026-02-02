"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

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
          setItems(parsed.map((text, index) => ({
            id: `${Date.now()}-${index}`,
            text: String(text),
            selected: false,
            comment: '',
          })));
        } else if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.items)) {
            setItems(
              parsed.items.map((item, index) => ({
                id: item?.id || `${Date.now()}-${index}`,
                text: String(item?.text ?? ''),
                selected: Boolean(item?.selected),
                comment: typeof item?.comment === 'string' ? item.comment : '',
                origin: item?.origin === 'add' ? 'add' : 'entry',
              })),
            );
          }
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
      localStorage.setItem(storageKey, JSON.stringify({ items }));
    } catch (error) {
      // Ignore storage write failures.
    }
  }, [items, hasHydrated, storageKey]);

  const value = useMemo(
    () => ({
      items,
      addItem: (item, options = {}) => {
        const trimmed = item.trim();
        if (!trimmed) return;
        const nextComment = typeof options.comment === 'string' ? options.comment.trim() : '';
        const nextOrigin = options.origin === 'add' ? 'add' : 'entry';
        setItems((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            text: trimmed,
            selected: false,
            comment: nextComment,
            origin: nextOrigin,
          },
        ]);
      },
      toggleSelected: (id) => {
        setItems((prev) =>
          prev.map((entry) =>
            entry.id === id ? { ...entry, selected: !entry.selected } : entry,
          ),
        );
      },
      updateComment: (id, comment) => {
        setItems((prev) =>
          prev.map((entry) =>
            entry.id === id ? { ...entry, comment } : entry,
          ),
        );
      },
      removeItem: (idOrIndex) => {
        setItems((prev) =>
          prev.filter((entry, idx) => entry.id !== idOrIndex && idx !== idOrIndex),
        );
      },
      clearItems: () => {
        setItems([]);
      },
    }),
    [items],
  );

  return (
    <MeaningListContext.Provider value={value}>
      {children}
    </MeaningListContext.Provider>
  );
}

function MeaningListCommentEditor({
  item,
  placeholder = 'Optional note',
  onSave,
  inline = false,
  showEditButton = true,
  extraActions = null,
}) {
  const [isEditing, setIsEditing] = useState(!item.comment);
  const [draft, setDraft] = useState(item.comment);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(item.comment);
    setIsEditing(!item.comment);
  }, [item.comment]);

  useEffect(() => {
    if (!isEditing || !inputRef.current) return;
    const target = inputRef.current;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  }, [isEditing, draft]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    const trimmed = draft.trim();
    onSave(item.id, trimmed);
    setIsEditing(false);
  };

  return (
    <>
      <div
        className={`meaning-list__comment-content${inline ? ' meaning-list__comment-content--inline' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        {isEditing ? (
          <textarea
            className="meaning-list__comment-input"
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={placeholder}
            aria-label="Add a comment"
            rows={1}
            onInput={(event) => {
              const target = event.currentTarget;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
        ) : (
          <span className="meaning-list__comment-text">{item.comment}</span>
        )}
      </div>
      <div
        className="meaning-list__comment-actions"
        onClick={(event) => event.stopPropagation()}
      >
        {isEditing ? (
          <button
            type="button"
            className="meaning-list__comment-button"
            onClick={handleSubmit}
          >
            Add
          </button>
        ) : showEditButton ? (
          <button
            type="button"
            className="meaning-list__comment-button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : null}
        {extraActions}
      </div>
    </>
  );
}

export function MeaningListEntry({
  heading = 'Entry',
  hint = 'Keep it short. Three to five items is plenty.',
  placeholder = 'e.g. my partner, the forest, making art',
}) {
  const { items, addItem, removeItem, clearItems } = useContext(MeaningListContext);
  const [input, setInput] = useState('');

  if (!items) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem(input, { origin: 'entry' });
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
          placeholder={placeholder}
          aria-label="Add something that gives your life meaning"
        />
        <button type="submit">Add</button>
      </form>
      {items.filter((entry) => entry.origin !== 'add').length > 0 ? (
        <>
          <ul className="meaning-list__items">
            {items.filter((entry) => entry.origin !== 'add').map((item) => (
              <li key={item.id}>
                <span>{item.text}</span>
                <button
                  type="button"
                  className="meaning-list__remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.text}`}
                >
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

export function MeaningListList({ heading = 'List' }) {
  const { items } = useContext(MeaningListContext);

  if (!items) return null;

  return (
    <aside className="meaning-list meaning-list--echo">
      <h3 className="meaning-list__title">{heading}</h3>
      {items.length ? (
        <ul className="meaning-list__items">
          {items.map((item, index) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      ) : (
        <p className="meaning-list__hint">Your list will appear here after you add a few items.</p>
      )}
    </aside>
  );
}

export function MeaningListListCustom({
  heading = 'List',
  hint,
  entries = [],
}) {
  const list = Array.isArray(entries) ? entries : [];

  return (
    <aside className="meaning-list meaning-list--echo meaning-list--custom">
      <h3 className="meaning-list__title">{heading}</h3>
      {hint ? <p className="meaning-list__hint">{hint}</p> : null}
      {list.length ? (
        <ul className="meaning-list__items">
          {list.map((entry, index) => (
            <li key={`${entry}-${index}`}>{entry}</li>
          ))}
        </ul>
      ) : (
        <p className="meaning-list__hint">No entries yet.</p>
      )}
    </aside>
  );
}

export function MeaningListSelectEnvironmental({
  heading = 'select_environmental',
  hint = 'Tap the items that depend on the environment.',
  commentPlaceholder = 'What about this depends on the environment?',
}) {
  const { items, toggleSelected, updateComment } = useContext(MeaningListContext);

  if (!items) return null;

  return (
    <section className="meaning-list meaning-list--select">
      <h3 className="meaning-list__title">{heading}</h3>
      <p className="meaning-list__hint">{hint}</p>
      {items.filter((entry) => entry.origin !== 'add').length ? (
        <ul className="meaning-list__items">
          {items.filter((entry) => entry.origin !== 'add').map((item) => {
            const isSelected = item.selected;
            return (
              <li
                key={item.id}
                className={`meaning-list__item${isSelected ? ' is-selected' : ''}`}
                onClick={() => toggleSelected(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleSelected(item.id);
                  }
                }}
              >
                <button
                  type="button"
                  className="meaning-list__item-button meaning-list__entry"
                  aria-label={`Toggle ${item.text}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  {item.text}
                </button>
                {isSelected ? (
                  <MeaningListCommentEditor
                    item={item}
                    placeholder={commentPlaceholder}
                    onSave={updateComment}
                    inline
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="meaning-list__hint">Add a few items above to continue.</p>
      )}
    </section>
  );
}

export function MeaningListNonEnvironmental({
  heading = 'list_non_environmental',
  hint = 'These were not marked as environmentally dependent. Add a note if you want.',
  commentPlaceholder = 'Optional note',
}) {
  const { items, updateComment } = useContext(MeaningListContext);
  const unselected = items.filter((item) => !item.selected && item.origin !== 'add');

  return (
    <section className="meaning-list meaning-list--non-environmental">
      <h3 className="meaning-list__title">{heading}</h3>
      <p className="meaning-list__hint">{hint}</p>
      {unselected.length ? (
        <ul className="meaning-list__items">
          {unselected.map((item) => (
            <li key={item.id}>
              <div className="meaning-list__item-label meaning-list__entry">{item.text}</div>
              <MeaningListCommentEditor
                item={item}
                placeholder={commentPlaceholder}
                onSave={updateComment}
                inline
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="meaning-list__hint">No items left in this section.</p>
      )}
    </section>
  );
}

export function MeaningListAdd({
  heading = 'add',
  hint = 'Add more items and optional notes.',
  entryPlaceholder = 'A new entry',
  commentPlaceholder = 'Optional note',
  addLabel = 'Add',
}) {
  const { items, addItem, updateComment, removeItem } = useContext(MeaningListContext);
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem(input, { origin: 'add' });
    setInput('');
  };

  return (
    <section className="meaning-list meaning-list--add">
      <h3 className="meaning-list__title">{heading}</h3>
      <p className="meaning-list__hint">{hint}</p>
      {items.length ? (
        <ul className="meaning-list__items">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`meaning-list__item${item.selected ? ' is-selected' : ''}`}
            >
              <span className="meaning-list__entry">{item.text}</span>
              <MeaningListCommentEditor
                item={item}
                placeholder={commentPlaceholder}
                onSave={updateComment}
                inline
                extraActions={item.origin === 'add' ? (
                  <button
                    type="button"
                    className="meaning-list__remove"
                    onClick={() => removeItem(index)}
                    aria-label={`Remove ${item.text}`}
                  >
                    Remove
                  </button>
                ) : null}
              />
            </li>
          ))}
        </ul>
      ) : null}
      <form className="meaning-list__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={entryPlaceholder}
          aria-label="Add another entry"
        />
        <button type="submit">{addLabel}</button>
      </form>
    </section>
  );
}

export function MeaningListSubmit({
  heading = 'Submit',
  hint = 'If you want, leave a short note about what shifted for you.',
  placeholder = 'A sentence or two is plenty.',
  submitLabel = 'Submit anonymously',
  successMessage = 'Thank you — your reflection has been received.',
  errorMessage = 'Something went wrong. Please try again later.',
}) {
  const { items } = useContext(MeaningListContext);
  const [reflection, setReflection] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/meaning-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          reflection,
          source: 'on-environmentalism',
        }),
      });
      if (!response.ok) throw new Error('Failed to submit');
      setStatus('success');
      setReflection('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="meaning-list meaning-list--reflection">
      <h3 className="meaning-list__title">{heading}</h3>
      <p className="meaning-list__hint">{hint}</p>
      <form className="meaning-list__form meaning-list__form--reflection" onSubmit={handleSubmit}>
        <textarea
          value={reflection}
          onChange={(event) => setReflection(event.target.value)}
          placeholder={placeholder}
          rows={4}
        />
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : submitLabel}
        </button>
      </form>
      {status === 'success' ? (
        <p className="meaning-list__hint meaning-list__hint--success">{successMessage}</p>
      ) : null}
      {status === 'error' ? (
        <p className="meaning-list__hint meaning-list__hint--error">{errorMessage}</p>
      ) : null}
    </section>
  );
}
