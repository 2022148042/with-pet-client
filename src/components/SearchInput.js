import styled from '@emotion/styled';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { colors } from '../constants';

export default function SearchInput({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (onSubmit && text) {
      onSubmit(text);
    }
  };

  return (
    <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="키워드를 입력해보세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">
        <BsSearch />
      </Button>
    </form>
  );
}

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  outline: none;
  font-size: 16px;
`;

const Button = styled.button`
  all: unset;
  padding: 8px;
  border-radius: 4px;
  background-color: ${colors.signatureBlue};
  cursor: pointer;

  svg {
    font-size: 24px;
    color: white;
    font-weight: 600;
  }

  &:hover {
    background-color: ${colors.signatureBlueWeight};
  }
`;
