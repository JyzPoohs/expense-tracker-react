export interface SelectComponentProps {
  label?: string;
  items: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export interface SelectGroupOption {
  label: string;
  items: {
    value: string;
    label: string;
  }[];
}

export interface SelectGroupComponentProps {
  groups: SelectGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}
