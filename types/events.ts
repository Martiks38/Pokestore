export type eventFocus =
  | React.FocusEvent<HTMLInputElement>
  | React.FocusEvent<HTMLSelectElement>

export type eventChange =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>

export type eventSubmit = React.FormEvent<HTMLFormElement>
