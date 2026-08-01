import type { Achievement, AchievementIcon } from '../../content/achievements'

interface AchievementBadgeProps {
  achievement: Achievement
}

const iconPaths: Record<AchievementIcon, string> = {
  trophy: 'M12 2l2.4 4.8L20 8l-4 3.9L17 18l-5-2.6L7 18l1-6.1L4 8l5.6-1.2L12 2z',
  users:
    'M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z',
  rocket:
    'M12 2.5c0 0-5 2.5-5 9.5 0 2.5 1.5 4.5 3 6l-1 4 3-2 3 2-1-4c1.5-1.5 3-3.5 3-6 0-7-5-9.5-5-9.5zm0 4a2.5 2.5 0 110 5 2.5 2.5 0 010-5z',
  certificate:
    'M7 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm2 2v2h6V6H9zm0 4v2h6v-2H9zm0 4v2h4v-2H9z',
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const isFeatured = achievement.featured

  return (
    <article
      className={`relative rounded-lg border p-5 sm:p-6 ${
        isFeatured
          ? 'border-accent/40 bg-gradient-to-br from-accent/10 via-ink-soft to-accent-dim/20'
          : 'border-paper/10 bg-ink-soft'
      }`}
    >
      {isFeatured ? (
        <span className="mb-3 inline-block rounded-md border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          Featured
        </span>
      ) : null}

      <div className="flex gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border ${
            isFeatured ? 'border-accent/40 bg-accent/10' : 'border-paper/15 bg-ink'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${isFeatured ? 'fill-accent' : 'fill-accent-bright'}`}
            aria-hidden="true"
          >
            <path d={iconPaths[achievement.icon]} />
          </svg>
        </div>

        <div>
          <h3 className="font-heading text-lg font-semibold text-paper">
            {achievement.title}
          </h3>
          <p className="mt-1 text-sm text-accent">{achievement.organization}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {achievement.date}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-paper-dim">
            {achievement.description.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
