import { useEffect, useState } from 'react';
import type { PassDocument, StructuredDataSourceKey } from '../data/passes';

import bmcData from '../data/structured/AaronSulbaran_AppleWallet_BusinessModelCanvas';
import vpcData from '../data/structured/AaronSulbaran_AppleWallet_ValuePropositionCanvas';
import visionData from '../data/structured/AaronSulbaran_AppleWallet_VisionBoard';
import ostData from '../data/structured/AaronSulbaran_AppleWallet_OpportunitySolutionTree';
import kanoData from '../data/structured/AaronSulbaran_AppleWallet_KanoAnalysis';
import scorecardData from '../data/structured/AaronSulbaran_AppleWallet_ProductScorecard';
import roadmapData from '../data/structured/AaronSulbaran_AppleWallet_RoadmapV2';
import type { ArtifactMetadata } from '../data/structured/types';

interface MetadataHeaderStripProps {
  doc: PassDocument;
}

const FIELD_KEYS = ['read_time', 'type', 'status'] as const;

const STRUCTURED_META: Record<StructuredDataSourceKey, ArtifactMetadata> = {
  AaronSulbaran_AppleWallet_BusinessModelCanvas: bmcData.metadata,
  AaronSulbaran_AppleWallet_ValuePropositionCanvas: vpcData.metadata,
  AaronSulbaran_AppleWallet_VisionBoard: visionData.metadata,
  AaronSulbaran_AppleWallet_OpportunitySolutionTree: ostData.metadata,
  AaronSulbaran_AppleWallet_KanoAnalysis: kanoData.metadata,
  AaronSulbaran_AppleWallet_ProductScorecard: scorecardData.metadata,
  AaronSulbaran_AppleWallet_RoadmapV2: roadmapData.metadata,
};

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

function structuredFields(key: StructuredDataSourceKey): string[] {
  const m = STRUCTURED_META[key];
  return [m.readTime, m.type, m.status].filter((v): v is string => Boolean(v));
}

export function MetadataHeaderStrip({ doc }: MetadataHeaderStripProps) {
  const [fields, setFields] = useState<string[]>(() => {
    if (doc.type === 'structured' && doc.dataSource) {
      return structuredFields(doc.dataSource);
    }
    return [];
  });

  useEffect(() => {
    let cancelled = false;
    if (doc.type === 'structured' && doc.dataSource) {
      setFields(structuredFields(doc.dataSource));
      return;
    }
    if (doc.type !== 'markdown' || !doc.src) {
      setFields([]);
      return;
    }
    fetch(doc.src)
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
  }, [doc.type, doc.src, doc.dataSource]);

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
