import { useEffect, useState } from 'react';

interface MetadataHeaderStripProps {
  src: string;
}

const FIELD_KEYS = ['read_time', 'type', 'status'] as const;

function parseMetaOnly(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return {};
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[m[1].toLowerCase()] = value;
  }
  return meta;
}

export function MetadataHeaderStrip({ src }: MetadataHeaderStripProps) {
  const [fields, setFields] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error('Not found'))))
      .then((text) => {
        if (cancelled) return;
        const meta = parseMetaOnly(text);
        const next = FIELD_KEYS.map((k) => meta[k]).filter((v): v is string => Boolean(v));
        setFields(next);
      })
      .catch(() => {
        if (cancelled) return;
        setFields([]);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (fields.length === 0) return null;

  return (
    <p
      className="font-sf font-medium text-[13px] text-text-tertiary mt-3"
      style={{ letterSpacing: '0.2px' }}
    >
      {fields.map((field, i) => (
        <span key={`${field}-${i}`}>
          {i > 0 && <span aria-hidden="true" className="px-2 text-text-quaternary">·</span>}
          {field}
        </span>
      ))}
    </p>
  );
}
