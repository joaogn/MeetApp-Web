/* eslint-disable no-bitwise */
import React, { useRef, useEffect, useState } from 'react';
import pt from 'date-fns/locale/pt';
import { useField } from '@rocketseat/unform';
import { parseISO } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { Date } from './styles';

interface Props {
  name: string;
  initialDate: string | undefined;
}

export default function DatePicker({ name, initialDate }: Props) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(initialDate ? parseISO(initialDate) : null);
  }, [initialDate]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: (pickerRef: any) => {
        pickerRef.clear();
      },
    });
  }, [ref.current]); // eslint-disable-line

  return (
    <>
      <Date
        name={fieldName}
        selected={selected}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        onChange={date => setSelected(date)}
        dateFormat="dd 'de' MMMM', às' HH'h'mm'm'"
        ref={ref}
        locale={pt}
        placeholderText="Data do meetup"
        popperPlacement="top-start"
      />
      {error && <span>{error}</span>}
    </>
  );
}
