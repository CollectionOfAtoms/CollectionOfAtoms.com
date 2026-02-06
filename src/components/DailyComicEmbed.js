"use client";

import { useEffect, useState } from "react";

const DEFAULT_CAPTION = "Daily comic";

export default function DailyComicEmbed({
  caption = DEFAULT_CAPTION,
  onImageClick,
}) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/daily-comic/latest", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to load daily comic");
        }
        const json = await response.json();
        if (active) {
          setState({ status: "ready", data: json?.data ?? null });
        }
      } catch {
        if (active) {
          setState({ status: "error", data: null });
        }
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <figure className="daily-comic daily-comic--loading">
        <div className="daily-comic__placeholder" aria-hidden="true" />
        <figcaption className="daily-comic__caption">{caption}</figcaption>
      </figure>
    );
  }

  if (!state.data?.imageUrl) {
    return null;
  }

  return (
    <figure className="daily-comic">
      <div className="daily-comic__frame">
        {state.data.prompt ? (
          <p className="daily-comic__prompt">Prompt: {state.data.prompt}</p>
        ) : null}
        {onImageClick ? (
          <button
            type="button"
            className="blog-image-button"
            onClick={() =>
              onImageClick({
                src: state.data.imageUrl,
                alt: caption || DEFAULT_CAPTION,
              })
            }
            aria-label={`Open ${caption || DEFAULT_CAPTION}`}
          >
            <img
              src={state.data.imageUrl}
              alt={caption || DEFAULT_CAPTION}
              loading="lazy"
            />
          </button>
        ) : (
          <img
            src={state.data.imageUrl}
            alt={caption || DEFAULT_CAPTION}
            loading="lazy"
          />
        )}
        {caption ? (
          <figcaption className="daily-comic__caption">{caption}</figcaption>
        ) : null}
      </div>
    </figure>
  );
}
