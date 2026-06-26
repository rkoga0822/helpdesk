import {
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

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
export function StatusFilter({
  current,
  onChange,
  counts,
}: StatusFilterProps) {
  return (
    <ToggleButtonGroup
      exclusive
      value={current}
      onChange={(_, value) => {
        if (value !== null) onChange(value);
      }}
    >
      {filters.map((f) => (
        <ToggleButton
          key={f.value}
          value={f.value}
        >
          {f.label}
          {counts[f.value] !== undefined &&
            ` (${counts[f.value]})`}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}