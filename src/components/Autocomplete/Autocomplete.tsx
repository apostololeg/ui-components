import { Input, Menu, Popup } from 'uilib/components';
import cn from 'classnames';
import { useEffect, useState, useRef, useMemo } from 'react';
import debounce from 'uilib/tools/debounce';
import { useIsMounted } from 'uilib/hooks/useIsMounted';
import Time from 'timen';

import S from './Autocomplete.styl';
import * as T from './Autocomplete.types';
import Shimmer from 'uilib/components/Shimmer/Shimmer';
import { Size } from 'uilib/types';
import { useListKeyboardControl } from 'uilib/hooks/useListKeyboardControl';

export function Autocomplete(props: T.Props) {
  const {
    className,
    inputWrapperClassName,
    value,
    onChange,
    size = 'm' as Size,
    getOptions,
    onSelect,
    debounceDelay = 300,
    inputProps = {},
    popupProps = {},
  } = props;

  const isMounted = useIsMounted();
  const [searchValue, setSearchValue] = useState(value);
  const [options, setOptions] = useState<T.Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const currentRequest = useRef('');
  const inputRef = useRef<Input>(null);

  const isOpen = isFocused && options.length > 0;
  const classes = cn(S.root, className);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const val = (value || e?.target.value) ?? '';
    setOptions([]);
    setSearchValue(val);
    onChange(e, val);
    fetchOptions(val);
    return true;
  };

  const handleSelect = (value: string) => {
    setSearchValue(value);
    setOptions([]);
    onSelect(value);

    // set input caret to the end
    requestAnimationFrame(() => {
      const input = inputRef.current?.inputRef.current;
      if (!input) return;
      input.focus();
      input.setSelectionRange(value.length, value.length);
    });
  };

  const { focusedIndex, setFocusedIndex } = useListKeyboardControl({
    isActive: isOpen,
    itemsCount: options.length,
    onSelect: index => {
      handleSelect(options[index].label);
    },
  });

  const fetchOptions = debounce(async (inputValue: string) => {
    if (!inputValue) {
      setOptions([]);
      return;
    }

    currentRequest.current = inputValue;
    setIsLoading(true);

    try {
      const newOptions = await getOptions(inputValue);

      if (!isMounted.current) return;
      if (currentRequest.current !== inputValue) return;

      setOptions(newOptions);
    } catch (error) {
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  }, debounceDelay);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const optionsList = useMemo(() => {
    if (!options.length) return null;

    return (
      <Menu className={S.options} size={size}>
        {options.map((option, index) => (
          <Menu.Item
            key={option.id}
            focused={focusedIndex === index}
            className={S.option}
            onClick={() => handleSelect(option.label)}
            onMouseEnter={() => setFocusedIndex(index)}
          >
            {option.label}
          </Menu.Item>
        ))}
      </Menu>
    );
  }, [options, focusedIndex]);

  return (
    <Popup
      className={classes}
      isOpen={isOpen}
      focusControl
      size={size}
      {...popupProps}
      trigger={
        <div className={inputWrapperClassName}>
          <Input
            ref={inputRef}
            // @ts-ignore
            size={size}
            {...inputProps}
            value={searchValue}
            onChange={handleInputChange}
            className={inputProps.className}
            onFocus={() => setIsFocused(true)}
            onBlur={() => Time.after(100, () => setIsFocused(false))}
          />
          {isLoading && <Shimmer className={S.shimmer} size={size} />}
        </div>
      }
      content={optionsList}
      contentProps={{
        className: S.popupContent,
      }}
    />
  );
}
