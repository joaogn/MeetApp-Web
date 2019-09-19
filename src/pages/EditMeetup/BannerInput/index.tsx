import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import bg from 'assets/imagebg.png';

import api from 'services/api';
import { Container } from './styles';

interface Props {
  name: string;
  imageUrl: string;
}

export default function BannerInput({ name, imageUrl }: Props) {
  const { defaultValue, registerField, error } = useField(name);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef(null);

  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl);
    }
  }, [imageUrl]);
  useEffect(() => {
    registerField({
      name: 'banner_id',
      ref: ref.current,
      path: 'dataset.file',
    });
  }, [ref]);// eslint-disable-line

  async function handleChange(e: any) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        <img src={preview || bg} alt="" />
        <input
          placeholder="Selecionar Imagem"
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
      {error && <span>{error}</span>}
    </Container>
  );
}
