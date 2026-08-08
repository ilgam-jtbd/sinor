# Linear 티켓 템플릿

**제목 규칙**: `[구분] 제목 — 부연 (판정 조건)`
예) `[MEASURE] GA4 search_term 수집 + 결과 0건 로그 — 홈 검색바 개발 선행`

**라벨**: `APP:HOME` `APP:CHAT` `WEB` `MEASURE` `DESIGN` `DECISION` `EXTERNAL`

---

## 배경
One-pager 링크 + 실측 근거 1줄 (수치 + 기간 + 출처)

## 요구사항
- [ ] 유저 행동 기반으로 작성 ("~할 수 있다"). 기능 명세가 아니라 결과로 씁니다

## 완료 조건 (Definition of Done)
- [ ] 기능 동작
- [ ] 이벤트 부착 완료 (노출 · 탭 · 전환) — 이벤트명 명시
- [ ] 가드레일 지표 측정 가능
- [ ] 실기기 확인 (Android · iOS)

## 제외 범위
이번에 하지 않는 것. **비우면 범위가 계속 커집니다.**

## 의존
선행 티켓 · 외부 의존(PG · 스토어 · 하나투어 · 의사결정 Qn)

## 에이전트 프롬프트
CC용은 `docs/templates/cc-prompt.md`, Codex용은 `docs/templates/codex-prompt.md` 골격을 채워 여기 붙입니다.
