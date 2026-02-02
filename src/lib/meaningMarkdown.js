const parseArgs = (text = '') => {
  const parsed = {};
  const regex = /(\w+)\s*=\s*"([^"]*)"|(\w+)\s*=\s*'([^']*)'/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[1]) parsed[match[1]] = match[2];
    if (match[3]) parsed[match[3]] = match[4];
  }
  return parsed;
};

export const parseMeaningContent = (content) => {
  const regex = /\[\[meaning:([^\]]+)\]\]/g;
  let lastIndex = 0;
  let match;
  const parts = [];

  while ((match = regex.exec(content)) !== null) {
    const start = match.index;
    const end = regex.lastIndex;
    if (start > lastIndex) {
      parts.push({ type: 'text', value: content.slice(lastIndex, start) });
    }
    const rawToken = match[1].trim();
    const [mode, ...rest] = rawToken.split(/\s+/);
    parts.push({
      type: 'token',
      mode: mode || '',
      args: parseArgs(rest.join(' ')),
    });
    lastIndex = end;
  }

  if (lastIndex < content.length) {
    parts.push({ type: 'text', value: content.slice(lastIndex) });
  }

  return parts;
};

export const resolveMeaningProps = (mode, base = {}, args = {}) => {
  const props = { ...base };
  if (args.title) props.heading = args.title;
  if (args.description) props.hint = args.description;
  if (args.placeholder) {
    if (mode === 'add') props.entryPlaceholder = args.placeholder;
    else props.placeholder = args.placeholder;
  }
  if (args.comment) props.commentPlaceholder = args.comment;
  if (args.entries) props.entries = args.entries;
  return { ...props, ...args };
};
