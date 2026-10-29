# 커밋 규칙

## 진행 순서

1. 작업 하나를 끝내면 변경 파일과 커밋 메시지 초안을 먼저 보고한다
2. 사용자 컨펌을 받은 뒤에만 커밋한다. 커밋 후 보고하지 않는다
3. push 는 사용자가 따로 요청할 때만 한다

## 커밋 단위

- 작업 하나 = 커밋 하나
- 성격이 다른 변경(예: refactor 와 feat)이 섞이면 커밋을 나눈다. 나누는 방법을 먼저 보고한다

## 메시지 형식

제목은 영어, 본문은 영어 불릿을 먼저 쓰고 빈 줄 아래에 같은 내용을 한국어 불릿으로 쓴다. 불릿 수를 맞춘다.

```
<type>: <영어 제목>

- <English bullet>
- <English bullet>

- <한국어 불릿>
- <한국어 불릿>
```

예시

```
feat: add highlights stats strip to the home page

- Add StatsStrip section with four stat cards from the mockup.
- Add StatItem molecule for icon, value and label.
- Hide decorative icons from screen readers.

- 시안의 실적 카드 4개로 StatsStrip 섹션 추가
- 아이콘 · 숫자 · 라벨용 StatItem molecule 추가
- 장식용 아이콘은 스크린리더에서 숨김
```

- `<type>` 은 Conventional Commits: `feat` `fix` `refactor` `chore` `docs` `test` `style` `perf`
- 제목은 명령형 현재형, 마침표 없음
- 불릿은 작업당 한 문장으로 간결하게. 무엇을 했는지만 적는다
