import { useEffect, useState } from 'react';
import { getFacility } from '../remotes';
import markerImg from '../assets/marker.png';

const { kakao } = window;

let map;
let clusterer;

const markedSpot = new Set();

const 연세대학교_위도 = 37.56432362684542;
const 연세대학교_경도 = 126.93900364430955;

export default function useKakaoMap() {
  const [initLoading, setInitLoading] = useState(true); // 일단 로딩중으로 시작

  // 위도와 경도를 받아 지도를 이동시키는 함수
  async function panTo({ latitude, longitude }) {
    if (!map) {
      return;
    }
    const newData = await fetchData({ latitude, longitude });
    markData(newData);
    const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
    map.panTo(moveLatLon);
    map.setLevel(3);
  }

  // 데이터(facility의 배열)을 인자로 받아 지도에 마킹하는 함수 + 클러스터링
  async function markData(data) {
    if (!map || !clusterer) {
      return;
    }
    const markers = [];
    for (const facility of data) {
      const latitude = facility['위도'];
      const longitude = facility['경도'];
      const position = new kakao.maps.LatLng(latitude, longitude);
      const content = `
        <div class="customoverlay">
          <div>
            <span class="title">${facility['시설명']}</span>
            <img class="marker" src="${markerImg}" />
          </div>
        </div>
      `;
      const marker = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1,
      });
      markers.push(marker);
    }
    clusterer.addMarkers(markers);
  }

  // 데이터(facility의 배열)를 패칭하고, 중복된 데이터를 제거하여 데이터 배열을 반환
  const fetchData = async ({ latitude, longitude }) => {
    const { data } = await getFacility({ latitude, longitude });
    const facilities = [];
    for (const facility of data) {
      const addedIdFacility = { id: facility['위도'] + facility['경도'], ...facility };
      facilities.push(addedIdFacility);
    }

    const newData = [];
    for (const facility of facilities) {
      if (!markedSpot.has(facility.id)) {
        markedSpot.add(facility.id);
        newData.push(facility);
      }
    }
    return newData;
  };

  // 첫 렌더링 시, 사용자의 위치좌표를 세팅하고 지도를 생성한 뒤 지도를 그리는 로직
  useEffect(() => {
    async function dragendHandler() {
      if (!map) {
        return;
      }
      const latlng = map.getCenter();
      const newData = await fetchData({ latitude: latlng.getLat(), longitude: latlng.getLng() });
      markData(newData);
    }

    async function configMap({ latitude, longitude }) {
      map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 5,
      });
      clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 7, // 클러스터 할 최소 지도 레벨
      });
      kakao.maps.event.addListener(map, 'dragend', dragendHandler);
      const newData = await fetchData({ latitude, longitude });
      markData(newData);
      setInitLoading(false);
    }

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        configMap({ latitude, longitude });
      });
    } else {
      configMap({ latitude: 연세대학교_위도, longitude: 연세대학교_경도 });
    }
  }, []);

  return {
    initLoading,
    panTo,
  };
}
