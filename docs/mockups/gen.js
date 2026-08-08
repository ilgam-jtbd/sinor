const P = require('pptxgenjs');
const p = new P();
p.layout = 'LAYOUT_WIDE';               // 13.3 x 7.5
const W=13.3, H=7.5;
const INK='1B1D21', INK2='4A4F57', INK3='7B818B';
const TEAL='0F5F5C', TEALBG='E4F0EF', SURF='F3F4F6', LINE='D8DBE0';
const MOVE='9B2C2C', MOVEBG='F7E8E8', CHK='8A6A15', CHKBG='F7F0DC', WHITE='FFFFFF';
const KO='맑은 고딕', MONO='Consolas';

const foot=(s,n,t)=>{
  s.addText(t,{x:0.6,y:H-0.52,w:8,h:0.3,fontSize:9,color:INK3,fontFace:KO});
  s.addText(String(n).padStart(2,'0'),{x:W-1.1,y:H-0.52,w:0.5,h:0.3,fontSize:10,color:INK3,fontFace:MONO,align:'right'});
};
const head=(s,tag,title,sub)=>{
  s.addText(tag,{x:0.6,y:0.42,w:11,h:0.25,fontSize:10,color:TEAL,fontFace:MONO,charSpacing:1.5});
  s.addText(title,{x:0.6,y:0.68,w:12,h:0.52,fontSize:26,bold:true,color:INK,fontFace:KO});
  if(sub) s.addText(sub,{x:0.6,y:1.22,w:12,h:0.4,fontSize:12,color:INK2,fontFace:KO});
};
// wireframe phone
const phone=(s,x,y,w,h,rows,tabs)=>{
  s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.09,fill:{color:WHITE},line:{color:'C2C7CF',width:1}});
  let cy=y+0.16;
  rows.forEach(r=>{
    const rh=r.h||0.34;
    s.addShape(p.ShapeType.roundRect,{x:x+0.14,y:cy,w:w-0.28,h:rh,rectRadius:0.04,
      fill:{color:r.k==='new'?TEALBG:(r.k==='move'?MOVEBG:(r.k==='chk'?CHKBG:WHITE))},
      line:{color:r.k==='new'?TEAL:(r.k==='move'?MOVE:(r.k==='chk'?CHK:LINE)),width:r.k?1:0.75,dashType:r.k?'solid':'dash'}});
    s.addText(r.t,{x:x+0.24,y:cy+0.03,w:w-0.48,h:rh-0.06,fontSize:8.5,color:INK,fontFace:KO,valign:'middle',margin:0});
    cy+=rh+0.09;
  });
  if(tabs){
    s.addShape(p.ShapeType.rect,{x:x+0.02,y:y+h-0.36,w:w-0.04,h:0.34,fill:{color:SURF},line:{color:LINE,width:0.5}});
    s.addText(tabs,{x:x+0.02,y:y+h-0.36,w:w-0.04,h:0.34,fontSize:7.5,color:INK3,fontFace:KO,align:'center',valign:'middle',margin:0});
  }
};
const notes=(s,x,y,w,items)=>{
  let cy=y;
  items.forEach((it,i)=>{
    s.addShape(p.ShapeType.ellipse,{x,y:cy+0.02,w:0.24,h:0.24,fill:{color:TEAL}});
    s.addText(String(i+1),{x,y:cy+0.02,w:0.24,h:0.24,fontSize:9,bold:true,color:WHITE,fontFace:MONO,align:'center',valign:'middle',margin:0});
    s.addText(it.t,{x:x+0.35,y:cy,w:w-0.35,h:0.26,fontSize:12,bold:true,color:INK,fontFace:KO,margin:0});
    s.addText(it.d,{x:x+0.35,y:cy+0.25,w:w-0.35,h:0.44,fontSize:10,color:INK2,fontFace:KO,margin:0});
    cy+= it.h||0.78;
  });
};
const tbl=(s,x,y,w,headRow,rows,colW)=>{
  const data=[headRow.map(h=>({text:h,options:{bold:true,color:INK,fill:{color:SURF},fontSize:10,fontFace:KO}}))];
  rows.forEach(r=>data.push(r.map(c=>({text:c,options:{color:INK2,fontSize:9.5,fontFace:KO}}))));
  s.addTable(data,{x,y,w,colW,border:{type:'solid',color:LINE,pt:0.5},autoPage:false,valign:'middle'});
};

/* 1 cover */
let s=p.addSlide();
s.addShape(p.ShapeType.rect,{x:0,y:0,w:W,h:H,fill:{color:INK}});
s.addText('SINOR · SCREEN MOCKUP v2.0 · 대외비',{x:0.9,y:2.1,w:11,h:0.3,fontSize:11,color:'8FBFBB',fontFace:MONO,charSpacing:1.6});
s.addText('시놀 앱 · 웹 화면 목업',{x:0.9,y:2.5,w:11,h:0.9,fontSize:44,bold:true,color:WHITE,fontFace:KO});
s.addText('앱 홈 9섹션 · 채팅 2탭 · 웹 앱전환 동선 — 구조 합의용 와이어프레임',{x:0.9,y:3.45,w:11,h:0.4,fontSize:15,color:'B4B9C2',fontFace:KO});
[['15장','목업 화면'],['9섹션','앱 홈 구조'],['2탭','채팅 분리'],['8종','어드민 컴포넌트']].forEach((v,i)=>{
  s.addText(v[0],{x:0.9+i*2.6,y:4.5,w:2.4,h:0.5,fontSize:26,bold:true,color:'5FBFB8',fontFace:KO});
  s.addText(v[1],{x:0.9+i*2.6,y:5.0,w:2.4,h:0.3,fontSize:11,color:'858B95',fontFace:KO});
});
s.addText('작성 시놀 김연재 · 2026. 08. 08 · 연계 앱 기획서 v2.1 · 웹 기획서 v1.1 · 개발자 요구서 v2.0',{x:0.9,y:6.5,w:11.5,h:0.3,fontSize:10,color:'858B95',fontFace:KO});

/* 2 읽는 법 */
s=p.addSlide(); head(s,'HOW TO READ','이 목업을 읽는 법','색과 카피를 지금 논의하면 구조 논의가 밀립니다. 합의할 것은 무엇이 어디에 왜 있는가입니다.');
[['신규 추가',TEAL,'이번 개편에서 새로 만드는 영역'],['유지','6B7280','현재 구조를 그대로 두는 영역'],
 ['삭제·이동',MOVE,'제거하거나 위치를 바꾸는 영역'],['확인 필요',CHK,'현재 화면 확인 후 확정할 영역']].forEach((v,i)=>{
  const x=0.6+i*3.05;
  s.addShape(p.ShapeType.rect,{x,y:1.85,w:2.85,h:0.95,fill:{color:SURF},line:{color:LINE,width:0.75}});
  s.addShape(p.ShapeType.rect,{x:x+0.18,y:2.06,w:0.14,h:0.14,fill:{color:v[1]}});
  s.addText(v[0],{x:x+0.42,y:1.98,w:2.3,h:0.3,fontSize:12,bold:true,color:INK,fontFace:KO});
  s.addText(v[2],{x:x+0.18,y:2.3,w:2.5,h:0.42,fontSize:10,color:INK2,fontFace:KO});
});
notes(s,0.6,3.15,5.9,[
 {t:'구조만 합의합니다',d:'색·아이콘·카피는 디자인 단계에서 확정합니다.'},
 {t:'화면마다 목표는 하나',d:'모든 화면에 같은 버튼을 넣으면 잘 되던 화면이 망가집니다.'},
 {t:'측정 지점을 함께 표기',d:'이벤트를 나중에 붙이겠다는 항목은 대부분 붙지 않습니다.'}]);
s.addShape(p.ShapeType.rect,{x:6.9,y:3.15,w:5.8,h:1.25,fill:{color:MOVEBG},line:{color:MOVE,width:0.75}});
s.addText('AS-IS 미확보 — 최우선 병목',{x:7.1,y:3.28,w:5.4,h:0.3,fontSize:12,bold:true,color:INK,fontFace:KO});
s.addText('앱 홈·채팅 현재 화면 캡처가 없습니다. TO-BE는 실측 지표에서 역산한 것이며,\nAS-IS 없이 확정하면 개발 중 “원래 있던 기능이 빠졌다”는 문제가 반드시 나옵니다.',{x:7.1,y:3.58,w:5.4,h:0.7,fontSize:10,color:INK2,fontFace:KO});
s.addShape(p.ShapeType.rect,{x:6.9,y:4.6,w:5.8,h:1.25,fill:{color:CHKBG},line:{color:CHK,width:0.75}});
s.addText('외부 실사로 전제 3건이 바뀌었습니다',{x:7.1,y:4.73,w:5.4,h:0.3,fontSize:12,bold:true,color:INK,fontFace:KO});
s.addText('/meeting · /information · /download 가 이미 존재합니다. 웹 개편은 신설이 아니라\n연결·측정 부착 작업입니다. 웹 플랫폼은 아임웹으로 유력(head 삽입·GTM 가능).',{x:7.1,y:5.03,w:5.4,h:0.7,fontSize:10,color:INK2,fontFace:KO});
foot(s,2,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 3 전제 정정 */
s=p.addSlide(); head(s,'FACT UPDATE','전제 정정 — 신설이 아니라 연결','2026-08-08 외부 실사. 개발요구서 v1.0이 “미확인/없음”으로 적은 페이지가 실제로는 존재합니다.');
tbl(s,0.6,1.85,12.1,['v1.0 판정','실제 확인','작업 성격 변화'],[
 ['단체미팅 독립 URL 없음','/meeting 존재 · 색인됨','신설(3주) → 연결·측정·광고 이관(3일)'],
 ['칼럼 경로 미확인','/information (?bmode=view&idx=)','하단 카드 삽입 즉시 착수 가능'],
 ['앱 다운로드 경로 미확인','/download','스마트 링크 교체 대상 확정'],
 ['웹 플랫폼 미확인','아임웹 유력','head 삽입·GTM·페이지별 메타 가능'],
 ['—','/adv 앱 광고상품 페이지 존재','T2 광고 인벤토리가 이미 지면으로 존재'],
 ['—','web.sinor.co.kr 서브도메인','용도 미확인 — 중복 색인이면 SEO 손실']],[3.1,3.6,5.4]);
s.addShape(p.ShapeType.rect,{x:0.6,y:5.35,w:12.1,h:0.85,fill:{color:TEALBG},line:{color:TEAL,width:0.75}});
s.addText('웹 개편은 신규 개발이 아니라 이미 있는 페이지를 잇고 측정을 붙이는 일입니다. 투입 대비 회수가 빠르고, 앱 개편보다 먼저 끝낼 수 있습니다.',{x:0.85,y:5.55,w:11.6,h:0.5,fontSize:12,color:INK,fontFace:KO,valign:'middle'});
foot(s,3,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 4 앱 홈 */
s=p.addSlide(); head(s,'APP · HOME · TO-BE','앱 홈 — 9섹션','회원 107,735명 · 모임 1,561개인데 28일간 4,232명이 검색하는 홈에 검색 진입점이 없습니다.');
phone(s,0.6,1.75,2.6,5.0,[
 {t:'🔍 어떤 모임을 찾으세요?',k:'new'},{t:'기획전 배너 (radius 16px)'},
 {t:'카테고리 아이콘 2줄 × 5',h:0.42},{t:'단체미팅 · 8/17 서울 · 잔여 3석',k:'new'},
 {t:'새로 개설된 모임 →'},{t:'인연 진단 — 내 유형 보기',k:'new'},
 {t:'내 지역 모임 →'},{t:'이번 주 여행 · 시놀트립',k:'new'},
 {t:'광고 슬롯 (4주 후 개시)',k:'chk'}],'모임 · 라운지 · ＋ · 채팅 · 마이');
notes(s,3.6,1.8,4.5,[
 {t:'검색바 최상단 sticky',d:'스크롤해도 따라옵니다. 근거 — 검색 4,232명, 진입점 0'},
 {t:'기획전 배너 모서리 16px',d:'전면 사각 배너는 광고로 인지되어 건너뜁니다. 롤링 5초 이상'},
 {t:'아이콘 + 한글 라벨 병기',d:'아이콘 단독은 인지율이 낮습니다. 6개 이하면 가로 스크롤 1줄'},
 {t:'수익 카드 3종 분산 배치',d:'연속 배치 금지 — 광고 구간으로 인지되어 스크롤 이탈'},
 {t:'가로 스크롤 20% 노출',d:'다음 카드가 살짝 보여야 스크롤을 시도합니다'},
 {t:'정원 대비 현재 인원 표시',d:'빈 모임 입장 후 이탈은 재방문을 크게 훼손합니다'}]);
notes(s,8.5,1.8,4.2,[
 {t:'단체미팅 — 이탈 12.0%',d:'사이트 최고 구매 의도. 잔여 3석 이하만 강조 표기'},
 {t:'인연 진단 — 전화 우선',d:'시니어는 전화 전환이 강합니다. 상담 이탈 7.0%'},
 {t:'이번 주 여행 — 시놀트립',d:'정가 vs 멤버십가 병기. 가격은 실제 상품과 연동'},
 {t:'지역 미설정 시 대체',d:'섹션을 숨기고 지역 설정 유도 카드로 교체'},
 {t:'섹션별 이벤트 필수',d:'4주 후 기여도 하위 2개 섹션은 접습니다'},
 {t:'광고 슬롯은 자리만',d:'개편과 동시 도입 시 지표 해석이 불가능합니다'}]);
foot(s,4,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 5 수익 카드 */
s=p.addSlide(); head(s,'APP · REVENUE CARDS','수익 카드 3종 — 배너가 아니라 카드로','콘텐츠 카드와 동일 컴포넌트를 사용합니다. 테두리·배경색으로 구분하면 광고로 읽힙니다.');
[['단체미팅','8월 17일 · 서울 강남\n잔여 3석\n[ 신청하기 ]','이탈률 12.0% — 사이트 최고 의도\n잔여 3석 이하만 강조 표기'],
 ['인연 진단','3~5문항 간단 진단\n결과 화면에 상담 예약\n[ 내 유형 보기 ]','시니어는 전화 전환이 강합니다\n결과 CTA는 전화 우선'],
 ['이번 주 여행 (시놀트립)','제주 한림 2박\n정가 32만 → 멤버십 24만\n[ 멤버십가로 보기 ]','여행 이탈 72.7%의 원인은\n멤버십 가치 미노출']].forEach((v,i)=>{
  const x=0.6+i*4.1;
  s.addShape(p.ShapeType.roundRect,{x,y:1.9,w:3.8,h:2.5,rectRadius:0.08,fill:{color:WHITE},line:{color:LINE,width:1}});
  s.addText(v[0],{x:x+0.25,y:2.1,w:3.3,h:0.35,fontSize:14,bold:true,color:INK,fontFace:KO});
  s.addText(v[1],{x:x+0.25,y:2.5,w:3.3,h:1.1,fontSize:11,color:INK2,fontFace:KO});
  s.addShape(p.ShapeType.rect,{x:x+0.25,y:3.65,w:3.3,h:0.02,fill:{color:LINE}});
  s.addText(v[2],{x:x+0.25,y:3.75,w:3.3,h:0.55,fontSize:9.5,color:INK3,fontFace:KO});
});
s.addShape(p.ShapeType.rect,{x:0.6,y:4.65,w:12.1,h:0.82,fill:{color:TEALBG},line:{color:TEAL,width:0.75}});
s.addText('여행 정책 (2026-08-08 확정) — 여행에서 파는 것은 시놀트립 멤버십(49,900원/년) 하나입니다. 하나투어 27p는 제휴 수수료가 아니라 광고 지면으로 취급하며, 판매 대상이 아니라 광고 성과 측정 대상입니다.',{x:0.85,y:4.8,w:11.6,h:0.55,fontSize:11,color:INK,fontFace:KO,valign:'middle'});
s.addShape(p.ShapeType.rect,{x:0.6,y:5.62,w:12.1,h:0.82,fill:{color:MOVEBG},line:{color:MOVE,width:0.75}});
s.addText('금지 — 카드에 별도 테두리색·배경색·「광고」 표기를 넣지 않습니다. 3종을 연속 배치하지 않습니다. 콘텐츠와 같은 위계로 보여야 추천으로 읽힙니다. 위반 시 재작업 대상.',{x:0.85,y:5.77,w:11.6,h:0.55,fontSize:11,color:INK,fontFace:KO,valign:'middle'});
foot(s,5,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 6 채팅 */
s=p.addSlide(); head(s,'APP · CHAT · TO-BE','채팅 — 모임 / 1:1 대화 2탭','참고 화면 오이·문토. 명칭은 시놀 용어 체계를 따릅니다.');
phone(s,0.6,1.75,2.6,4.4,[
 {t:'채팅'},{t:'[모임] •      1:1 대화',k:'new'},
 {t:'등산 좋아하는 5060      3'},{t:'한강 산책 모임'},
 {t:'서울 바둑 동호회      1'},{t:'파크골프 함께해요'}],'모임 · 라운지 · ＋ · 채팅 · 마이');
notes(s,3.6,1.85,4.5,[
 {t:'명칭 — 모임 / 1:1 대화',d:'문토의 그룹/개인 대신 오이 방식. 모임은 3년간 써온 자사 용어이고 그룹은 학습 비용이 듭니다'},
 {t:'기본 선택은 모임 탭',d:'앱 대화량 대부분이 모임에서 발생하며 1:1은 시럽 계열에서 주로 발생합니다'},
 {t:'탭은 점, 목록은 숫자',d:'탭에 숫자를 쓰면 미확인이 쌓여 보여 회피를 유발합니다'}],0.95);
notes(s,8.5,1.85,4.2,[
 {t:'점 해제는 대화방 실제 열람 시점',d:'탭 진입만으로 해제하면 알림 신뢰도가 무너집니다'},
 {t:'스크롤 위치 독립 보존 · 라벨 크기 고정',d:'선택 시 크기가 변하면 화면 흔들림으로 인지됩니다'},
 {t:'확인 필요 — 안 읽음 카운트 제공 주체',d:'서버 응답인지 클라이언트 계산인지에 따라 목록 로딩 성능이 달라집니다'}],0.95);
foot(s,6,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 7 빈 상태 */
s=p.addSlide(); head(s,'APP · EMPTY STATE','채팅 빈 상태 — 이탈 지점을 진입 지점으로','현재는 “채팅 내역이 없어요”만 노출되어 다음 행동이 끊깁니다.');
s.addText('AS-IS',{x:0.6,y:1.75,w:2.6,h:0.3,fontSize:11,bold:true,color:INK3,fontFace:MONO});
phone(s,0.6,2.1,2.6,3.2,[{t:'채팅 내역이 없어요',h:0.5}],'모임 · 라운지 · ＋ · 채팅 · 마이');
s.addText('TO-BE',{x:3.7,y:1.75,w:2.6,h:0.3,fontSize:11,bold:true,color:TEAL,fontFace:MONO});
phone(s,3.7,2.1,2.6,3.2,[{t:'아직 참여한 모임이 없어요',h:0.42},{t:'[ 모임 둘러보기 ]',k:'new'},{t:'내 지역 모임 3개 →'}],'모임 · 라운지 · ＋ · 채팅 · 마이');
notes(s,7.0,2.05,5.7,[
 {t:'다음 행동을 반드시 제시',d:'빈 화면에서 나가면 그 세션은 아무것도 남기지 못합니다. 빈 상태는 가장 값싼 전환 지점입니다'},
 {t:'홈 개편과 연결',d:'“모임 둘러보기”는 개편된 홈의 카테고리로 연결합니다'},
 {t:'지역 모임 추천 병기',d:'지역 정보가 있으면 바로 후보를 보여줍니다 — 탐색 단계를 하나 줄입니다'},
 {t:'같은 패턴을 다른 빈 화면에도',d:'모임 목록 · 검색 결과 0건 · 알림 없음. 문구와 목적지는 어드민에서 수정 가능해야 합니다'}],0.85);
foot(s,7,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 8 웹 홈 */
s=p.addSlide(); head(s,'WEB · HOME','웹 홈 — 앱 설치와 전환의 관문','sinor.co.kr — 28일 방문 5,750명 중 앱 다운로드 도달은 79명(1.4%). 목표는 5% 이상.');
phone(s,0.6,1.75,2.6,5.0,[
 {t:'시놀 앱에서 모임 참여하기 [설치]',k:'new'},{t:'히어로 — 5060 모임·만남'},
 {t:'단체미팅 → /meeting'},{t:'시럽인연 상담 예약 (전화)'},
 {t:'시놀트립 — 정가 vs 멤버십가'},{t:'시니어 칼럼 191편 (조회 2,312)'},
 {t:'부모님께 보내기 (자녀 타깃)',k:'new'},{t:'하단 고정 설치 바',k:'new'}]);
notes(s,3.6,1.8,4.5,[
 {t:'스마트 앱 배너 — 1주차',d:'iOS meta 태그 · Android 설치 배너. 구현 난도 최저, 효과 즉시 측정'},
 {t:'단체미팅은 신설이 아니라 연결',d:'/meeting이 이미 존재하고 색인됨. 측정 부착과 광고 랜딩 이관이 실제 작업'},
 {t:'칼럼이 최대 유입원',d:'191편 · 조회 2,312. 앱 설치 유도의 1순위 지면입니다'}],0.95);
notes(s,8.5,1.8,4.2,[
 {t:'자녀는 공유, 부모가 설치',d:'이탈 7.7%로 사이트 최저인데 글이 1편뿐입니다'},
 {t:'배너와 고정 바 동시 노출 금지',d:'4주씩 교차 운영 후 비교. 둘 다 띄우면 판정 불가'},
 {t:'닫기 이력은 기기 단위 7일',d:'세션 단위면 재방문마다 다시 떠 시니어가 오류로 인지합니다'}],0.95);
foot(s,8,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 9 칼럼 */
s=p.addSlide(); head(s,'WEB · COLUMN','칼럼 하단 카드 — 191편 전체에 고정','글 주제에 따라 목적지를 분기합니다. 같은 카드를 191편에 똑같이 붙이지 않습니다.');
tbl(s,0.6,1.9,12.1,['글 주제','하단 카드 목적지','근거'],[
 ['건강·운동 (맨발걷기 등)','앱 설치 — 취미 모임','이탈 9.1% · 최저군'],
 ['모임·취미','앱 설치 — 지역 모임','모객 지면'],
 ['재혼·황혼재혼','시럽인연 상담 예약','상담 이탈 7.0%'],
 ['자녀·부모님','부모님께 보내기 (공유)','이탈 7.7% · 사이트 최저'],
 ['여행','시놀트립 멤버십','이탈 72.7% 개선 대상'],
 ['정책·혜택','앱 설치 — 정보 알림','조회 상위 유입']],[4.2,4.4,3.5]);
s.addShape(p.ShapeType.rect,{x:0.6,y:5.4,w:12.1,h:0.9,fill:{color:SURF},line:{color:LINE,width:0.75}});
s.addText('카드 문구는 주제별 6종으로 관리하고, 운영자가 어드민에서 매핑을 바꿀 수 있어야 합니다. 관련 글은 같은 주제 묶음 안에서만 노출합니다 — 주제가 튀면 이탈합니다.',{x:0.85,y:5.6,w:11.6,h:0.55,fontSize:11,color:INK2,fontFace:KO,valign:'middle'});
foot(s,9,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 10 meeting */
s=p.addSlide(); head(s,'WEB · /MEETING','단체미팅 페이지 — 보강과 이관','사이트 최고 의도 구간(이탈 12.0%). 페이지는 이미 있으나 광고 랜딩으로도 측정 대상으로도 쓰이지 않습니다.');
phone(s,0.6,1.75,2.6,4.7,[
 {t:'5060 단체미팅 — 서울·경기 8월'},{t:'성혼비 없음 · 상담 무료 · 본인인증',k:'new'},
 {t:'8/17 (토) 서울 강남 · 잔여 3석'},{t:'8/24 (토) 경기 분당 · 잔여 8석'},
 {t:'참가 후기 · 사진'},{t:'자주 묻는 질문 (FAQ)',k:'new'},{t:'신청하기'}]);
notes(s,3.6,1.8,4.5,[
 {t:'제목에 검색어를 넣습니다',d:'“[부산·경남] 5060 단체미팅”이 이미 이탈 11~18%로 효과를 증명했습니다'},
 {t:'신뢰 블록을 상단에',d:'광고 직행 75.8% vs 내부 경유 7.0%. 차이는 도착 직후 신뢰 정보의 유무입니다'},
 {t:'성혼비 없음이 첫 줄',d:'시장 관행은 가입비와 별도로 성혼비 100~500만원 추가입니다'}],0.95);
notes(s,8.5,1.8,4.2,[
 {t:'FAQ 스키마 적용',d:'본문은 이미 있고 구조화 표시만 붙이면 AEO 답변 노출 후보가 됩니다'},
 {t:'광고 랜딩 이관',d:'상담 폼 직행(이탈 75.8%) 예산을 이쪽으로 옮깁니다'},
 {t:'가격 등급 확정이 선행',d:'참가비 99,000~300,000원 3배 편차. 구독은 기본 참석권만 커버'}],0.95);
foot(s,10,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 11 family */
s=p.addSlide(); head(s,'WEB · /FAMILY','자녀 타깃 — 설치 버튼이 아니라 공유 버튼','이탈률 7.7%로 사이트 최저인데 글이 1편뿐입니다.');
phone(s,0.6,1.75,2.6,4.4,[
 {t:'60대 이상 부모님, 짝 찾아드리고 싶다면',h:0.42},
 {t:'본문 — 절차 · 비용 · 자녀가 준비할 것',h:0.42},
 {t:'카카오톡으로 부모님께 보내기',k:'new'},{t:'문자로 보내기',k:'new'},
 {t:'자녀가 대신 상담 예약하기',k:'new'},{t:'앱 설치 버튼 — 넣지 않습니다',k:'move'}]);
notes(s,3.6,2.0,9.1,[
 {t:'설치 주체가 다릅니다',d:'읽는 사람은 4050 자녀이고 앱을 쓸 사람은 60대 부모입니다. 자녀에게 설치를 시키면 그 계정은 사용되지 않고, 부모에게는 아무것도 전달되지 않습니다'},
 {t:'자녀가 대신 예약하는 동선',d:'시니어 상품에서 실제로 결제까지 가는 경로 중 하나입니다. 상담 예약 폼에 “부모님 정보로 신청” 항목을 둡니다'},
 {t:'글 1편을 묶음으로 확장',d:'부모님 재혼 · 부모님 앱 추천 · 부모님 혜택 · 부모님 친구 만들기 — 최소 4편. 전환이 가장 좋은 독자층인데 콘텐츠가 없습니다'}],1.15);
foot(s,11,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 12 컴포넌트 */
s=p.addSlide(); head(s,'COMPONENT INVENTORY','운영자가 배포 없이 바꿀 수 있어야 하는 것','개발 배포 없이 바꿀 수 있는 범위가 곧 그로스 실험의 속도입니다.');
tbl(s,0.6,1.85,12.1,['컴포넌트','적용 화면','운영자 조작','측정','세션 규칙'],[
 ['기획전 배너','앱 홈 · 웹 홈','이미지·링크·기간·순서','노출 · 탭','세션당 첫 노출만'],
 ['홈 섹션 순서','앱 홈','드래그 순서 변경 · on/off','섹션별 기여도','서버 사이드 A/B'],
 ['수익 카드 3종','앱 홈','문구·목적지·노출 여부','노출 · 탭 · 전환','세션 노출 상한'],
 ['카테고리 아이콘','앱 홈','라벨·순서·노출 여부','탭','—'],
 ['칼럼 하단 카드','웹 /information 191편','주제별 매핑 6종','노출 · 설치 전환','동일 세션 재노출 제한'],
 ['단체미팅 일정','웹 /meeting · 앱','일정·지역·정원·잔여석','조회 · 신청','잔여석 실시간'],
 ['앱 설치 바','웹 전 페이지','문구·노출 페이지·닫기 주기','노출 · 설치','기기 단위 7일'],
 ['빈 상태 문구','앱 채팅 · 목록','문구·버튼 목적지','노출 · 탭','—']],[2.2,2.5,3.0,2.1,2.3]);
s.addShape(p.ShapeType.rect,{x:0.6,y:6.05,w:12.1,h:0.75,fill:{color:TEALBG},line:{color:TEAL,width:0.75}});
s.addText('이미지 미등록 시 카테고리별 기본 이미지를 자동 적용합니다. 이미지 없는 카드가 섞이면 목록 전체의 신뢰도가 떨어집니다. 가격은 실제 상품과 연동하며 하드코딩하지 않습니다.',{x:0.85,y:6.18,w:11.6,h:0.5,fontSize:10.5,color:INK,fontFace:KO,valign:'middle'});
foot(s,12,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 13 이벤트 */
s=p.addSlide(); head(s,'EVENT SPEC','이벤트 명세 — 화면과 같은 릴리스에 부착','나중에 붙이겠다는 항목은 대부분 붙지 않습니다. 개발 티켓의 완료 조건에 그대로 들어갑니다.');
tbl(s,0.6,1.85,12.1,['이벤트명','파라미터','발생 지점'],[
 ['home_section_impression','section_id, position','섹션 50% 이상 노출 (세션당 1회)'],
 ['home_section_tap','section_id, item_id, position','섹션 내 아이템 탭'],
 ['view_search_results / search_no_result','search_term, result_count','검색 실행 / 결과 0건'],
 ['revenue_card_impression / _tap','card_type, position, cta_label','수익 카드 노출 · CTA'],
 ['meeting_apply_start / _complete','meeting_id, price, seats_left','단체미팅 신청'],
 ['diagnosis_complete · consult_call_tap','result_type, entry_point','인연 진단 · 전화 상담'],
 ['trip_membership_view','product_id, list_price, member_price','시놀트립 멤버십가 노출'],
 ['chat_tab_switch · chat_room_open','tab, room_type, unread_count','탭 전환 · 대화방 열람(점 해제)'],
 ['purchase','value, payment_method, product_id','카드·무통장 모두'],
 ['first_action_latency','ms, action','앱 실행 → 첫 액션 (가드레일)']],[4.6,4.0,3.5]);
foot(s,13,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 14 가드레일 */
s=p.addSlide(); head(s,'GUARDRAIL','가드레일 — 악화되면 성공지표가 좋아져도 실패','발견은 늘었는데 경험이 나빠지면 순손실입니다.');
tbl(s,0.6,1.9,6.0,['성공지표','현재 → 목표 (8주)'],[
 ['DAU / MAU','5.8% → 8% 이상'],
 ['앱 설치 유도 도달률','1.4% → 5% 이상'],
 ['앱 내 검색 이용률','0 → 홈 방문자 15% 이상'],
 ['결제 이벤트 기록률','20건/7개월 → 실제 대비 90%'],
 ['시놀트립 멤버십 판매','미측정 → 기준선 확정']],[3.0,3.0]);
tbl(s,6.9,1.9,5.8,['가드레일','판정'],[
 ['시럽인연 상담 신청 수','감소 시 실패'],
 ['단체미팅 신청 완료율','감소 시 실패'],
 ['모임 참여 후 이탈률','악화 시 실패'],
 ['앱 실행 후 첫 액션 시간','증가 시 실패'],
 ['페이지 로딩 시간','증가 시 경고'],
 ['CS 문의','“못 찾겠다” 별도 태깅']],[3.1,2.7]);
s.addShape(p.ShapeType.rect,{x:0.6,y:5.5,w:12.1,h:0.85,fill:{color:MOVEBG},line:{color:MOVE,width:0.75}});
s.addText('성공지표 5종 중 3종, 가드레일 6종 전부가 현재 미측정입니다. 측정 설정이 배포보다 먼저 끝나야 하며, 이것이 유일한 차단 조건입니다.',{x:0.85,y:5.68,w:11.6,h:0.5,fontSize:12,bold:true,color:INK,fontFace:KO,valign:'middle'});
foot(s,14,'시놀 SINOR · 화면 목업 v2.0 · 2026.08 · 대외비');

/* 15 next */
s=p.addSlide(); head(s,'NEXT STEPS','다음 단계','이 목업은 구조 합의용입니다. 합의된 내용이 기획서와 개발자 요구서에 반영됩니다.');
tbl(s,0.6,1.9,12.1,['시점','작업','주체'],[
 ['즉시','앱 홈·채팅 현재 화면 캡처 확보 — 최우선 병목','운영'],
 ['즉시','개발 회신 D1~D10 · 사업 회신 B1~B5','개발 · 사업'],
 ['1주차','크로스도메인 · 결제 이벤트 · 봇 필터 · 서치콘솔 · 스마트 배너 meta 태그','개발'],
 ['1~2주','목업 구조 확정 회의 · search_term 수집 · 네이버 전환추적 3개 지점','기획 · 개발'],
 ['2~4주','채팅 2탭 선행 개발 (측정 체계 시범 적용)','개발'],
 ['3~6주','앱 홈 9섹션 + 어드민 컴포넌트 8종 · 웹 앱전환 동선','개발 · 디자인'],
 ['3~5주','App Store 한국어 등록 · Play 데이터 안전 재제출 · 스토어 제목 개선','운영'],
 ['6주차','통합 배포 + 스크린샷 교체 + 모임장 1,500명 사전 안내(D-3)','전체'],
 ['7~14주','성공지표 5종 · 가드레일 6종 판정','데이터']],[1.6,7.9,2.6]);
s.addText('수치 기준 — 종합전략 v3(2026.08) · GA4 실측(2026.07.09~08.05) · Dataroom(2026.07) · 스토어 리스팅 실측(2026.08.06) · 외부 실사(2026.08.08). 단일 출처는 정합기준 정본 2026-08.',{x:0.6,y:6.3,w:12.1,h:0.5,fontSize:9.5,color:INK3,fontFace:KO});
foot(s,15,'시놀 SINOR · 2026. 08 · 시놀 김연재 · 대외비');

p.writeFile({fileName:'시놀_화면목업_v2.0.pptx'}).then(()=>console.log('OK'));
