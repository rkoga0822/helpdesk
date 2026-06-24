const filters = [
  { value: 'all', label: 'すべて' },
  { value: 'pending', label: '未対応' },
  { value: 'in_progress', label: '対応中' },
  { value: 'completed', label: '完了' },
]

type StatusFilterProps = {
  current: string
  onChange: (status: string) => void
  counts: Record<string, number>
}

// ステータス絞り込みボタン
export function StatusFilter({ current, onChange, counts }: StatusFilterProps) {
  return (
    <div>
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          style={{ fontWeight: current === f.value ? 'bold' : 'normal' }}
        >
          {f.label}
          {counts[f.value] !== undefined && ` (${counts[f.value]})`}
        </button>
      ))}
    </div>
  )
}
