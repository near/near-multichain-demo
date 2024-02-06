import {
  ChangeEvent,
  createRef,
  useState,
  useMemo,
  RefObject,
  ClipboardEvent,
} from 'react';

interface UseVerificationCodeReturnType {
  code: string[];
  onInputChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  inputRefs: RefObject<HTMLInputElement>[];
}

const useVerificationCode = (length = 6): UseVerificationCodeReturnType => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputRefs = useMemo(
    () => Array.from({ length }, () => createRef<HTMLInputElement>()),
    [length]
  );

  const onPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text/plain') || '';
    const pastedChars = pasted
      .split('')
      .filter(char => !isNaN(parseInt(char, 10)));
    const newCode = code.slice(); // Make a copy of the code array
    let currentIndex = 0;

    for (const char of pastedChars) {
      if (currentIndex < length) {
        newCode[currentIndex] = char;
        currentIndex++;
      }
    }

    setCode(newCode);
  };

  const onInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const newCode = code.slice(); // Make a copy of the code array
    newCode[index] = value.slice(-1); // Only take the last character
    setCode(newCode);

    if (value === '' && index > 0) {
      inputRefs[index].current?.focus();
    } else if (!isNaN(parseInt(value, 10)) && index < length - 1) {
      let nextEmptyIndex = index + 1;
      while (nextEmptyIndex < length && code[nextEmptyIndex] !== '') {
        nextEmptyIndex++;
      }
      inputRefs[nextEmptyIndex].current?.focus();
    }
  };

  return {
    code,
    onInputChange,
    onPaste,
    inputRefs,
  };
};

export default useVerificationCode;
