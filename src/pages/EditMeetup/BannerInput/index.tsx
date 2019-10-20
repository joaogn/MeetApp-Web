import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from 'services/api';
import { Container } from './styles';

interface Props {
  name: string;
  imageUrl?: string;
  imageId?: number;
}

export default function BannerInput({ name, imageUrl, imageId }: Props) {
  const { defaultValue, registerField, error } = useField(name);
  const [file, setFile] = useState<number>(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState<string>(
    defaultValue && defaultValue.url
  );
  const ref: any = useRef(null);

  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageId) {
      setFile(imageId);
    }
  }, [imageId]);

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

    try {
      const response = await api.post('files', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      toast.error('Error no upload da imagem tente novamente');
    }
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <div>
            <MdCameraAlt size={56} color="rgba(255,255,255,0.3)" />
            <strong>Selecionar imagem</strong>
          </div>
        )}
        <input
          data-testid="banner-input"
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
