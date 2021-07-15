import { useState, ChangeEventHandler, Dispatch, SetStateAction, useMemo } from 'react';

export default function useTextInputValue(initialValue: string | (() => string)): [
  string,
  ChangeEventHandler<HTMLInputElement>,
  Dispatch<SetStateAction<string>>
] {
  const [value, setValue] = useState<string>(initialValue);
  const handleChange: ChangeEventHandler<HTMLInputElement> = useMemo(() => (
    (e) => setValue(e.target.value)
  ), [setValue]);
  return [value, handleChange, setValue];
}
