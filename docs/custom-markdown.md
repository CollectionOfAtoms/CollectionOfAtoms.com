# Custom Markdown Components

This project supports several custom markdown tags inside blog post content. These are parsed in `src/components/BlogPostContentClient.js` and rendered as React components.

## Usage Format
All custom tags use double brackets:

```
[[tag-name key="value" other="value"]]
```

Some tags also support block wrappers, like `[[gold]]...[[/gold]]` or `[[hero]]...[[/hero]]`.

## Inline Tags

1. `[[subtitle text="..."]]`
   - Renders a centered subtitle below the main H1.

2. `[[image src="/path" alt="Description" framed="true"]]`
   - Renders an image with optional framing.
   - `framed` accepts `true` or `false`.

3. `[[daily-comic caption="..."]]`
   - Inserts the daily comic component with a caption.

4. `[[excerpt text="..." align="left|right|center"]]`
   - Renders a small inset quote box.
   - `align` controls left/right float on wide screens.

5. `[[big-quote text="..." author="Name"]]`
   - Renders a larger blockquote styled like the 404 page.

## Block Tags

1. `[[hero src="/path" alt="Description" focus="50% 50%"]]...[[/hero]]`
   - Renders a hero image block.
   - `focus` maps to CSS `object-position`.

2. `[[gold]]...[[/gold]]`
   - Wraps content in a highlighted gold block.

3. `[[atom_divider]]`
   - Inserts the atom divider line.

## Meaning List Tags (On Environmentalism)
These are parsed by `src/lib/meaningMarkdown.js`:

- `[[meaning:entry ...]]`
- `[[meaning:list ...]]`
- `[[meaning:list-custom ...]]`
- `[[meaning:select_environmental ...]]`
- `[[meaning:list_non_environmental ...]]`
- `[[meaning:add ...]]`
- `[[meaning:submit ...]]`

Each tag supports optional attributes like `title`, `description`, `placeholder`, `comment`, and `entries`.
