import Link from 'next/link';
import type { Topic, CustomTopic } from '@/lib/types';

interface TopicCardProps {
  topic: Topic | CustomTopic;
  progress?: number; // 0-100
  href?: string;
}

function isCustomTopic(t: Topic | CustomTopic): t is CustomTopic {
  return 'createdAt' in t;
}

export default function TopicCard({ topic, progress, href }: TopicCardProps) {
  const isCustom = isCustomTopic(topic) || ('type' in topic && topic.type === 'custom');
  const wordCount = 'wordCount' in topic ? (topic.wordCount ?? 0) : 0;
  const topicHref = href ?? `/topic/${topic.id}`;

  return (
    <Link href={topicHref} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        className="card card-hover"
        style={{ padding: '20px', height: '100%', cursor: 'pointer' }}
      >
        {/* Emoji + badge row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{topic.emoji}</span>
          {isCustom && (
            <span className="badge badge-violet" style={{ fontSize: '0.7rem' }}>Tùy chỉnh</span>
          )}
        </div>

        {/* Name */}
        <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.3 }}>
          {topic.name}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5, minHeight: '2.4em' }}>
          {topic.description}
        </p>

        {/* Word count + progress */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {wordCount} từ
            </span>
            {progress !== undefined && (
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--brand-violet-light)' }}>
                {Math.round(progress)}%
              </span>
            )}
          </div>
          {progress !== undefined && (
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
