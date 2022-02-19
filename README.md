# elice-programming-assignment

## 1. 코딩 컨벤션

- 커밋  [https://overcome-the-limits.tistory.com/entry/협업-협업을-위한-기본적인-git-커밋컨벤션-설정하기](https://overcome-the-limits.tistory.com/entry/%ED%98%91%EC%97%85-%ED%98%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-%EA%B8%B0%EB%B3%B8%EC%A0%81%EC%9D%B8-git-%EC%BB%A4%EB%B0%8B%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
- 코딩 스타일 prettier

## 2. 프로젝트 구조
- 컴포넌트의 대략적인 성격만 알면 쉽게 찾을 수 있는 구조를 목표로, 비슷한 성격을 가진 모듈들을 모아 프로젝트 구조 설계
```
/api
/components 
  /common   - 재사용 되는 컴포넌트
  /pages   - 페이지를 구성하는 최상위 컴포넌트
  /course   - common에는 속하지 않고, 특정한 페이지에서만 사용되는 컴포넌트
/hooks   - 사용자 정의 hook
```


## 3. 기능 구현

### 🔎  키워드 검색, 필터링, 페이징 시 데이터 업데이트

컴포넌트 로직과 강좌 데이터를 처리하는 로직을 각각 분리하면서도,

각 이벤트 핸들러들이 로직을 공유할 수 있도록 하기위해 사용자 훅을 정의하였음. (./src/hooks/useGetCourse.ts)


### 🔎 예외처리

에러가 발생한 지점부터 페이지 컴포넌트에 도달할 때 까지 에러를 던지고

페이지 컴포넌트 단에서 예외를 확인한 후, 에러 페이지를 렌더링.

**코드**

```jsx
export default function CoursePage() {
  ...
	const onClickFilterHandler = (filters: Array<string>) => {
    try {
      const newOption = { ...option, offset: 0, price: filters };
      setPage(1);
      updateCourses(newOption);
      setOption(newOption);
    } catch (error) {
      setError(error);
    }
  };
  ...
  
	if (error) return <ErrorPage error={error} />;

  ...
}
```

**에러 발생 예시**

![image](https://user-images.githubusercontent.com/55647436/154788652-e202b451-2457-4d12-9ea4-2d1667c15d80.png)

### 🔎 발생한 이슈와 해결방안
1. 이슈

검색어 변경 또는 필터를 변경 시, 강좌들이 렌더링 되지 않는 버그 발견.

기존에 선택된 page번호를 유지하는 상태는 PageNumberArea 내부에 존재하고, 이 값은 방향버튼과 페이지 넘버 버튼 클릭 이벤트 발생 시 변경되는 값이었음.

때문에 외부에서 이벤트 발생 시, page 번호가 1로 초기화 되지 않는다는게 문제.

2. 해결방안

다른 이벤트 핸들러에서도  page값을 다룰 수 있게 해야했음.

PageNumberArea로부터 page 상태를 부모 컴포넌트인 CoursePage 로 끌어올려,

검색어 변경 및 필터 변경 이벤트 핸들러에서도 page 번호를 1로 초기화 할 수 있도록 해서 해결했음.

```jsx

// ./src/components/CoursePage.tsx
// 해결방안을 적용한 코드
export default function CoursePage() {
  const [page, setPage] = useState(1);
	...
	const onClickFilterHandler = (filters: Array<string>) => {
	    try {
	      const newOption = { ...option, offset: 0, price: filters };
	      setPage(1);
	      updateCourses(newOption);
	      setOption(newOption);
	    } catch (error) {
	      setError(error);
	    }
	};
  ...
}
```

## 4. UI
- styled-components를 이용해 컴포넌트 스타일링
- flex를 활용해 컴포넌트를 정렬하고 grid로 자식 컴포넌트의 비율을 설정
- icon + text 컴포넌트 재사용을 위한 IconText 컴포넌트 생성. Icon 컴포넌트와 text 문구를 속성으로 받음.
``` jsx
const IconText = ({ Icon, text }: IconTextProps) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <Icon />
    <span style={{ fontSize: 12, color: '#7d7e80' }}>{text}</span>
  </div>
);
```
- Chip에 selected 속성을 두어 toggle를 구현
