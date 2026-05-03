import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ViewerShell } from './ViewerShell';

interface DocumentViewerProps {
  src: string;
  onClose: () => void;
}

interface ParsedDoc {
  meta: Record<string, string>;
  body: string;
}

const MEMO_FIELDS: Array<{ key: string; label: string; emphasized?: boolean }> = [
  { key: 'to', label: 'To' },
  { key: 'cc', label: 'Cc' },
  { key: 'from', label: 'From' },
  { key: 'date', label: 'Date' },
  { key: 're', label: 'Re', emphasized: true },
];

function parseFrontmatter(raw: string): ParsedDoc {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return { meta: {}, body: raw };
  }
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
  return { meta, body: raw.slice(match[0].length).trimStart() };
}

export function DocumentViewer({ src, onClose }: DocumentViewerProps) {
  const [state, setState] = useState<
    | { status: 'loading' }
    | { status: 'ready'; parsed: ParsedDoc }
    | { status: 'error'; message: string }
  >({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    fetch(src)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load document (${res.status})`);
        const text = await res.text();
        if (cancelled) return;
        setState({ status: 'ready', parsed: parseFrontmatter(text) });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          status: 'error',
          message: err instanceof Error ? err.message : 'Failed to load document.',
        });
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  const memoFields = useMemo(() => {
    if (state.status !== 'ready') return [];
    return MEMO_FIELDS.filter(({ key }) => state.parsed.meta[key]).map((f) => ({
      ...f,
      value: state.parsed.meta[f.key],
    }));
  }, [state]);

  return (
    <ViewerShell onClose={onClose} titleId="document-viewer-title">
      {state.status === 'loading' && (
        <div className="flex-1 flex items-center justify-center">
          <p className="font-sf text-[15px] text-text-tertiary">Loading…</p>
        </div>
      )}
      {state.status === 'error' && (
        <div className="flex-1 flex items-center justify-center px-5 text-center">
          <p className="font-sf text-[15px] text-text-tertiary">{state.message}</p>
        </div>
      )}
      {state.status === 'ready' && (
        <div className="sheet-scroll flex-1 overflow-y-auto w-full">
          <div className="w-full max-w-[720px] mx-auto px-5 sm:px-8 pb-16">
          {memoFields.length > 0 && (
            <section
              aria-label="Memo header"
              className="mt-2 rounded-card-content bg-bg-card-white shadow-card p-5"
            >
              <dl className="grid grid-cols-[80px_1fr]">
                {memoFields.map((f, i) => (
                  <div key={f.key} className="contents">
                    <dt
                      className={`font-sf font-medium text-[13px] uppercase tracking-[0.05em] text-text-tertiary py-3 ${
                        i > 0 ? 'border-t border-divider' : ''
                      }`}
                    >
                      {f.label}
                    </dt>
                    <dd
                      id={f.key === 're' ? 'document-viewer-title' : undefined}
                      className={`font-sf text-[15px] text-text-primary py-3 ${
                        i > 0 ? 'border-t border-divider' : ''
                      } ${f.emphasized ? 'font-semibold' : 'font-normal'}`}
                    >
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <article className="memo-prose mt-8 w-full">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ children, ...rest }) => (
                  <div className="memo-table-scroll sheet-scroll">
                    <table {...rest}>{children}</table>
                  </div>
                ),
                h1: ({ children, ...rest }) => {
                  if (memoFields.length > 0) return null;
                  return (
                    <h1 id="document-viewer-title" {...rest}>
                      {children}
                    </h1>
                  );
                },
              }}
            >
              {state.parsed.body}
            </ReactMarkdown>
          </article>
          </div>
        </div>
      )}
    </ViewerShell>
  );
}
