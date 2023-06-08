import styled from '@emotion/styled';
import { colors } from '../constants';

export default function SearchResult({ searchedList, onClick }) {
  const handleClickButton = (facility) => {
    if (onClick) {
      const latitude = Number(facility['위도']);
      const longitude = Number(facility['경도']);
      onClick({ latitude, longitude });
    }
  };

  if (searchedList.length === 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>검색결과가 없어요.</div>;
  }

  return (
    <List>
      {searchedList.map((facility, index) => (
        <Item key={index}>
          <Text>{facility['시설명']}</Text>
          <Button onClick={() => handleClickButton(facility)}>위치</Button>
        </Item>
      ))}
    </List>
  );
}

const List = styled.ul`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: auto;
`;

const Item = styled.li`
  margin: 0;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid ${colors.gray100};
  border-radius: 4px;
  list-style: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
  flex: 1;
`;

const Button = styled.button`
  all: unset;
  padding: 4px 8px;
  background-color: ${colors.signatureBlue};
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${colors.signatureBlueWeight};
  }
`;
