import { useState } from 'react';
import styled from '@emotion/styled';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { colors } from '../constants';

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Inner isOpen={isOpen}>
        <SidebarToggleButton onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <AiOutlineDoubleRight size="30px" /> : <BsSearch size="30px" />}
        </SidebarToggleButton>
        <Contents>{children}</Contents>
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 10px;
`;

const Inner = styled.div`
  border-left: 1px solid ${colors.gray100};
  position: relative;
  background-color: #fafafa;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  height: 100%;
  z-index: 99;

  width: ${(props) => (props.isOpen ? '350px' : '0px')};
`;

const SidebarToggleButton = styled.button`
  all: unset;
  position: absolute;
  left: -60px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Contents = styled.div`
  padding-top: 15px;
  padding-left: 10px;
  box-sizing: border-box;
  width: 95%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;
