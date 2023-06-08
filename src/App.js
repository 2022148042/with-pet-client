import styled from '@emotion/styled';
import useSearch from './hooks/useSearch';
import useKakaoMap from './hooks/useKakaoMap';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';

export default function App() {
  const { handleSearch, searchStatus, searchedList } = useSearch();
  const { initLoading, panTo } = useKakaoMap();

  return (
    <div style={{ display: 'flex' }}>
      <Main>
        <Title>🐾 반려동물과 함께 이용할 수 있는 시설 찾기</Title>
        {initLoading && (
          <LoadingContainer>
            <Loading />
            <LoadingText>지도를 불러오는 중입니다...</LoadingText>
          </LoadingContainer>
        )}
        <div id="map"></div>
      </Main>
      {!initLoading && (
        <Sidebar>
          <SearchInput onSubmit={handleSearch} />
          {searchStatus === 'loading' && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
              <Loading />
            </div>
          )}
          {searchStatus === 'complete' && (
            <SearchResult searchedList={searchedList} onClick={(coords) => panTo(coords)} />
          )}
        </Sidebar>
      )}
    </div>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #map {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h1`
  padding: 10px;
  text-align: center;
`;

const LoadingContainer = styled.div`
  position: absolute;
  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: darkslategrey;
`;
