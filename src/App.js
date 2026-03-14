/* eslint-disable */
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, runTransaction, get } from "firebase/database";

/* ═══════════ Firebase 설정 ═══════════ */
const firebaseConfig = {
  apiKey: "AIzaSyA9G6mBUk0sW4d4-vtig07tbqASySqAznY",
  authDomain: "votestar2026.firebaseapp.com",
  databaseURL: "https://votestar2026-default-rtdb.firebaseio.com",
  projectId: "votestar2026",
  storageBucket: "votestar2026.firebasestorage.app",
  messagingSenderId: "235013740627",
  appId: "1:235013740627:web:71639574152091b6b0ea6",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

/* ═══════════════════ 데이터 ═══════════════════ */
const CANDS = [
  { id:"ronaldo",       name:"Cristiano Ronaldo",  group:"Al Nassr",           nat:"🇵🇹 Portugal",    cat:"Sports",    color:"#dc2626", v:0 },
  { id:"messi",         name:"Lionel Messi",       group:"Inter Miami",        nat:"🇦🇷 Argentina",   cat:"Sports",    color:"#2563eb", v:0 },
  { id:"mrbeast",       name:"MrBeast",            group:"YouTube",            nat:"🇺🇸 USA",         cat:"Creator",   color:"#16a34a", v:0 },
  { id:"taylor",        name:"Taylor Swift",       group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#a855f7", v:0 },
  { id:"lisa_bp",       name:"LISA",               group:"BLACKPINK",          nat:"🇹🇭 Thailand",    cat:"K-Pop",     color:"#f472b6", v:0 },
  { id:"jungkook",      name:"Jungkook",           group:"BTS",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#6366f1", v:0  },
  { id:"ishowspeed",    name:"IShowSpeed",         group:"YouTube",            nat:"🇺🇸 USA",         cat:"Creator",   color:"#ef4444", v:0  },
  { id:"v_bts",         name:"V (Taehyung)",       group:"BTS",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#8b5cf6", v:0  },
  { id:"jimin_bts",     name:"Jimin",              group:"BTS",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#a78bfa", v:0  },
  { id:"im_youngwoong", name:"Im Young-woong",     group:"Solo",               nat:"🇰🇷 Korea",       cat:"Trot",      color:"#3b82f6", v:0  },
  { id:"jennie_bp",     name:"Jennie",             group:"BLACKPINK",          nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#ec4899", v:0  },
  { id:"kylian",        name:"Kylian Mbappé",      group:"Real Madrid",        nat:"🇫🇷 France",      cat:"Sports",    color:"#1d4ed8", v:0  },
  { id:"beyonce",       name:"Beyoncé",            group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#fbbf24", v:0  },
  { id:"billie",        name:"Billie Eilish",      group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#4ade80", v:0  },
  { id:"elon_musk",     name:"Elon Musk",          group:"X / Tesla / SpaceX", nat:"🇺🇸 USA",         cat:"CEO",       color:"#64748b", v:0  },
  { id:"virat",         name:"Virat Kohli",        group:"India Cricket",      nat:"🇮🇳 India",       cat:"Sports",    color:"#166534", v:0  },
  { id:"rose_bp",       name:"Rosé",               group:"BLACKPINK",          nat:"🇦🇺 Australia",   cat:"K-Pop",     color:"#fb7185", v:0  },
  { id:"jisoo_bp",      name:"Jisoo",              group:"BLACKPINK",          nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#e11d48", v:0  },
  { id:"ariana",        name:"Ariana Grande",      group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#c084fc", v:0  },
  { id:"neymar",        name:"Neymar Jr.",         group:"Al Hilal",           nat:"🇧🇷 Brazil",      cat:"Sports",    color:"#16a34a", v:0  },
  { id:"shahrukh",      name:"Shah Rukh Khan",     group:"Bollywood",          nat:"🇮🇳 India",       cat:"Actor",     color:"#dc2626", v:0  },
  { id:"son_heungmin",  name:"Son Heung-min",      group:"Tottenham",          nat:"🇰🇷 Korea",       cat:"Sports",    color:"#60a5fa", v:0  },
  { id:"suga_bts",      name:"Suga / Agust D",     group:"BTS",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#7c3aed", v:0  },
  { id:"bad_bunny",     name:"Bad Bunny",          group:"Solo",               nat:"🇵🇷 Puerto Rico", cat:"Reggaeton", color:"#65a30d", v:0  },
  { id:"selena",        name:"Selena Gomez",       group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#f9a8d4", v:0  },
  { id:"kylie",         name:"Kylie Jenner",       group:"Influencer",         nat:"🇺🇸 USA",         cat:"Influencer",color:"#be185d", v:0  },
  { id:"jhope_bts",     name:"J-Hope",             group:"BTS",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#f59e0b", v:0  },
  { id:"zendaya",       name:"Zendaya",            group:"Actor",              nat:"🇺🇸 USA",         cat:"Actor",     color:"#f59e0b", v:0  },
  { id:"haaland",       name:"Erling Haaland",     group:"Man City",           nat:"🇳🇴 Norway",      cat:"Sports",    color:"#15803d", v:0  },
  { id:"harry_styles",  name:"Harry Styles",       group:"Solo",               nat:"🇬🇧 UK",          cat:"Pop",       color:"#22d3ee", v:0  },
  { id:"pewdiepie",     name:"PewDiePie",          group:"YouTube",            nat:"🇸🇪 Sweden",      cat:"Creator",   color:"#7c3aed", v:0  },
  { id:"wonyoung_ive",  name:"Wonyoung",           group:"IVE",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#f43f5e", v:0  },
  { id:"iu_solo",       name:"IU",                 group:"Solo",               nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#38bdf8", v:0  },
  { id:"rm_bts",        name:"RM",                 group:"BTS",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#10b981", v:0  },
  { id:"ksi",           name:"KSI",                group:"YouTube",            nat:"🇬🇧 UK",          cat:"Creator",   color:"#92400e", v:0  },
  { id:"felix_skz",     name:"Felix",              group:"Stray Kids",         nat:"🇦🇺 Australia",   cat:"K-Pop",     color:"#f59e0b", v:0  },
  { id:"weeknd",        name:"The Weeknd",         group:"Solo",               nat:"🇨🇦 Canada",      cat:"Pop",       color:"#9f1239", v:0  },
  { id:"dwayne",        name:"Dwayne Johnson",     group:"Actor",              nat:"🇺🇸 USA",         cat:"Actor",     color:"#78716c", v:0  },
  { id:"dhoni",         name:"MS Dhoni",           group:"India Cricket",      nat:"🇮🇳 India",       cat:"Sports",    color:"#fbbf24", v:0  },
  { id:"gdragon",       name:"G-Dragon",           group:"BIGBANG",            nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#eab308", v:0  },
  { id:"jin_bts",       name:"Jin",                group:"BTS",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#06b6d4", v:0  },
  { id:"ed_sheeran",    name:"Ed Sheeran",         group:"Solo",               nat:"🇬🇧 UK",          cat:"Pop",       color:"#f97316", v:0  },
  { id:"khaby",         name:"Khaby Lame",         group:"TikTok #1",          nat:"🇮🇹 Italy",       cat:"Influencer",color:"#78716c", v:0  },
  { id:"hyunjin_skz",   name:"Hyunjin",            group:"Stray Kids",         nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#fbbf24", v:0  },
  { id:"sabrina",       name:"Sabrina Carpenter",  group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#fde047", v:0  },
  { id:"justin_bieber", name:"Justin Bieber",      group:"Solo",               nat:"🇨🇦 Canada",      cat:"Pop",       color:"#2563eb", v:0  },
  { id:"conor",         name:"Conor McGregor",     group:"UFC",                nat:"🇮🇪 Ireland",     cat:"Sports",    color:"#b45309", v:0  },
  { id:"jay_chou",      name:"Jay Chou",           group:"Solo",               nat:"🇹🇼 Taiwan",      cat:"C-Pop",     color:"#1e40af", v:0  },
  { id:"dua_lipa",      name:"Dua Lipa",           group:"Solo",               nat:"🇬🇧 UK",          cat:"Pop",       color:"#60a5fa", v:0  },
  { id:"kendall",       name:"Kendall Jenner",     group:"Model",              nat:"🇺🇸 USA",         cat:"Influencer",color:"#a8a29e", v:0  },
  { id:"timothee",      name:"Timothée Chalamet",  group:"Actor",              nat:"🇫🇷 France",      cat:"Actor",     color:"#1d4ed8", v:0  },
  { id:"drake",         name:"Drake",              group:"Solo",               nat:"🇨🇦 Canada",      cat:"Hip-Hop",   color:"#1d4ed8", v:0  },
  { id:"karina_aespa",  name:"Karina",             group:"aespa",              nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#14b8a6", v:0  },
  { id:"stephen_curry", name:"Stephen Curry",      group:"Golden State",       nat:"🇺🇸 USA",         cat:"Sports",    color:"#fbbf24", v:0  },
  { id:"priyanka",      name:"Priyanka Chopra",    group:"Actor",              nat:"🇮🇳 India",       cat:"Actor",     color:"#be185d", v:0  },
  { id:"olivia",        name:"Olivia Rodrigo",     group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#c026d3", v:0  },
  { id:"mo_salah",      name:"Mohamed Salah",      group:"Liverpool",          nat:"🇪🇬 Egypt",       cat:"Sports",    color:"#dc2626", v:0  },
  { id:"adele",         name:"Adele",              group:"Solo",               nat:"🇬🇧 UK",          cat:"Pop",       color:"#1e3a5f", v:0  },
  { id:"lady_gaga",     name:"Lady Gaga",          group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#818cf8", v:0  },
  { id:"kai_cenat",     name:"Kai Cenat",          group:"Twitch",             nat:"🇺🇸 USA",         cat:"Creator",   color:"#a855f7", v:0  },
  { id:"kendrick",      name:"Kendrick Lamar",     group:"Solo",               nat:"🇺🇸 USA",         cat:"Hip-Hop",   color:"#b45309", v:0  },
  { id:"travis_scott",  name:"Travis Scott",       group:"Solo",               nat:"🇺🇸 USA",         cat:"Hip-Hop",   color:"#44403c", v:0  },
  { id:"charli",        name:"Charli D'Amelio",    group:"TikTok",             nat:"🇺🇸 USA",         cat:"Influencer",color:"#f9a8d4", v:0  },
  { id:"shakira",       name:"Shakira",            group:"Solo",               nat:"🇨🇴 Colombia",    cat:"Pop",       color:"#fbbf24", v:0  },
  { id:"kai_exo",       name:"Kai",                group:"EXO",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#f97316", v:0  },
  { id:"sza",           name:"SZA",                group:"Solo",               nat:"🇺🇸 USA",         cat:"R&B",       color:"#7c3aed", v:0  },
  { id:"lana",          name:"Lana Del Rey",       group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#4338ca", v:0  },
  { id:"doja_cat",      name:"Doja Cat",           group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#be185d", v:0  },
  { id:"winter_aespa",  name:"Winter",             group:"aespa",              nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#06b6d4", v:0  },
  { id:"bangchan_skz",  name:"Bang Chan",          group:"Stray Kids",         nat:"🇦🇺 Australia",   cat:"K-Pop",     color:"#d97706", v:0  },
  { id:"roger_federer", name:"Roger Federer",      group:"Tennis",             nat:"🇨🇭 Switzerland", cat:"Sports",    color:"#b91c1c", v:0  },
  { id:"baekhyun_exo",  name:"Baekhyun",           group:"EXO",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#ea580c", v:0  },
  { id:"tzuyu_twice",   name:"Tzuyu",              group:"TWICE",              nat:"🇹🇼 Taiwan",      cat:"K-Pop",     color:"#fbcfe8", v:0  },
  { id:"yujin_ive",     name:"Yujin",              group:"IVE",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#fb923c", v:0  },
  { id:"minji_nj",      name:"Minji",              group:"NewJeans",           nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#84cc16", v:0  },
  { id:"hanni_nj",      name:"Hanni",              group:"NewJeans",           nat:"🇦🇺 Australia",   cat:"K-Pop",     color:"#4ade80", v:0  },
  { id:"yeonjun_txt",   name:"Yeonjun",            group:"TXT",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#c084fc", v:0  },
  { id:"taeyong_nct",   name:"Taeyong",            group:"NCT",                nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#0ea5e9", v:0  },
  { id:"wonwoo_svt",    name:"Wonwoo",             group:"SEVENTEEN",          nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#10b981", v:0  },
  { id:"nayeon_twice",  name:"Nayeon",             group:"TWICE",              nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#f9a8d4", v:0  },
  { id:"kenshi_yonezu", name:"Kenshi Yonezu",      group:"Solo",               nat:"🇯🇵 Japan",       cat:"J-Pop",     color:"#1d4ed8", v:0  },
  { id:"hongjoong",     name:"Hongjoong",          group:"ATEEZ",              nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#dc2626", v:0  },
  { id:"markiplier",    name:"Markiplier",         group:"YouTube",            nat:"🇺🇸 USA",         cat:"Creator",   color:"#ef4444", v:0  },
  { id:"miley",         name:"Miley Cyrus",        group:"Solo",               nat:"🇺🇸 USA",         cat:"Pop",       color:"#f59e0b", v:0  },
  { id:"bella_poarch",  name:"Bella Poarch",       group:"TikTok",             nat:"🇵🇭 Philippines", cat:"Influencer",color:"#818cf8", v:0  },
  { id:"taemin",        name:"Taemin",             group:"SHINee",             nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#818cf8", v:0  },
  { id:"yoasobi",       name:"YOASOBI",            group:"Duo",                nat:"🇯🇵 Japan",       cat:"J-Pop",     color:"#818cf8", v:0  },
  { id:"ado_jp",        name:"Ado",                group:"Solo",               nat:"🇯🇵 Japan",       cat:"J-Pop",     color:"#4f46e5", v:0  },
  { id:"soyeon_gidle",  name:"Soyeon",             group:"(G)I-DLE",           nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#d946ef", v:0  },
  { id:"ryujin_itzy",   name:"Ryujin",             group:"ITZY",               nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#eab308", v:0  },
  { id:"heeseung_enhy", name:"Heeseung",           group:"ENHYPEN",            nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#8b5cf6", v:0  },
  { id:"wonbin_riize",  name:"Wonbin",             group:"RIIZE",              nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#818cf8", v:0  },
  { id:"kazuha_lsrfm",  name:"Kazuha",             group:"LE SSERAFIM",        nat:"🇯🇵 Japan",       cat:"K-Pop",     color:"#fde68a", v:0  },
  { id:"irene_rv",      name:"Irene",              group:"Red Velvet",         nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#dc2626", v:0  },
  { id:"youngtak",      name:"Youngtak",           group:"Solo",               nat:"🇰🇷 Korea",       cat:"Trot",      color:"#0891b2", v:0  },
  { id:"lee_chanwon",   name:"Lee Chan-won",       group:"Solo",               nat:"🇰🇷 Korea",       cat:"Trot",      color:"#0369a1", v:0  },
  { id:"hanbin_zb1",    name:"Kim Hanbin",         group:"ZEROBASEONE",        nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#60a5fa", v:0  },
  { id:"minju_illit",   name:"Minju",              group:"ILLIT",              nat:"🇰🇷 Korea",       cat:"K-Pop",     color:"#fbcfe8", v:0  },
  { id:"gem_deng",      name:"G.E.M.",             group:"Solo",               nat:"🇨🇳 China",       cat:"C-Pop",     color:"#7c3aed", v:0  },
];
const CATS = ["All","Trot","K-Pop","J-Pop","C-Pop","Pop","R&B","Hip-Hop","Reggaeton","Sports","Creator","Influencer","Actor","CEO"];

/* ═══════════ 유틸 ═══════════ */
function getTodayVote(){
  try{const r=localStorage.getItem("vs5");if(!r)return null;const p=JSON.parse(r);return p.date===new Date().toISOString().slice(0,10)?p.id:null;}catch{return null;}
}
function saveVote(id){localStorage.setItem("vs5",JSON.stringify({id,date:new Date().toISOString().slice(0,10)}));}

function useCountdown(){
  const [s,setS]=useState("");
  useEffect(()=>{
    const f=()=>{const n=new Date(),m=new Date();m.setHours(24,0,0,0);const d=m-n;setS(`${String(Math.floor(d/3600000)).padStart(2,"0")}:${String(Math.floor((d%3600000)/60000)).padStart(2,"0")}:${String(Math.floor((d%60000)/1000)).padStart(2,"0")}`);};
    f();const id=setInterval(f,1000);return()=>clearInterval(id);
  },[]);
  return s;
}

/* ═══════════ 캔버스 티커 (React 완전 분리) ═══════════ */
const CanvasTicker = memo(function CanvasTicker({getItems}){
  const cvRef=useRef(null);
  const xRef=useRef(0);
  const rafRef=useRef(null);
  const cacheRef=useRef([]);
  const totalWRef=useRef(0);

  useEffect(()=>{
    const cv=cvRef.current; if(!cv) return;
    const ctx=cv.getContext("2d");
    const H=26;
    const setSize=()=>{cv.width=cv.offsetWidth||window.innerWidth;cv.height=H;};
    setSize();
    window.addEventListener("resize",setSize);

    // 텍스트 캐시 빌드 (3초마다)
    const buildCache=()=>{
      const items=getItems().slice(0,50);
      if(!items.length)return;
      ctx.font="bold 10px 'Segoe UI',Arial,sans-serif";
      const seg=items.map(it=>{
        const nw=ctx.measureText(it.name+" ").width;
        const extra="  "+it.nat+"  +1 ❤️   ✦   ";
        const ew=ctx.measureText(extra).width;
        return{...it,nw,extra,ew,tw:nw+ew};
      });
      // 충분히 길게 반복
      let arr=[...seg];
      while(arr.reduce((a,x)=>a+x.tw,0)<(cv.width||800)*3) arr=[...arr,...seg];
      cacheRef.current=arr;
      totalWRef.current=arr.reduce((a,x)=>a+x.tw,0)/2; // 절반이 반복 단위
    };
    buildCache();
    const rebuildId=setInterval(buildCache,2500);

    const draw=()=>{
      const W=cv.width;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="#080812";
      ctx.fillRect(0,0,W,H);
      if(!cacheRef.current.length){rafRef.current=requestAnimationFrame(draw);return;}

      xRef.current-=0.5;
      const half=totalWRef.current;
      if(xRef.current<=-half) xRef.current=0;

      let cx=xRef.current;
      for(const seg of cacheRef.current){
        if(cx>W+60){cx+=seg.tw;continue;}
        if(cx+seg.tw<-20){cx+=seg.tw;continue;}
        ctx.font="bold 10px 'Segoe UI',Arial,sans-serif";
        ctx.fillStyle=seg.color;
        ctx.fillText(seg.name+" ",cx,17);
        cx+=seg.nw;
        ctx.font="10px 'Segoe UI',Arial,sans-serif";
        ctx.fillStyle="#4b5563";
        ctx.fillText(seg.extra,cx,17);
        cx+=seg.ew;
      }
      rafRef.current=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(rafRef.current);clearInterval(rebuildId);window.removeEventListener("resize",setSize);};
  },[]);

  return <canvas ref={cvRef} style={{width:"100%",height:26,display:"block"}}/>;
});

/* ═══════════ 도넛 ═══════════ */
const Donut=memo(function Donut({pct,color,size}){
  const r=size*0.37, cx=size/2, cy=size/2, circ=2*Math.PI*r;
  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:"block",flexShrink:0}}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0d0d1e" strokeWidth={size*0.12}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={size*0.12}
        strokeDasharray={`${pct*circ} ${circ}`} strokeLinecap="round"
        style={{transform:"rotate(-90deg)",transformOrigin:"center",transition:"stroke-dasharray 0.7s ease"}}/>
      <text x={cx} y={cy+size*0.07} textAnchor="middle" fill="#f1f5f9" fontSize={size*0.155} fontWeight="800" fontFamily="Syne,Arial">{(pct*100).toFixed(1)}%</text>
    </svg>
  );
});

/* ═══════════ 포디엄 설정 ═══════════ */
const PDM=[
  {i:0,medal:"🥇",crown:"👑",label:"1ST",sub:"CHAMPION",ph:170,pc1:"#92400e",pc2:"#78350f",ac:"#fbbf24"},
  {i:1,medal:"🥈",crown:"🥈",label:"2ND",sub:"",       ph:130,pc1:"#1e293b",pc2:"#0f172a",ac:"#94a3b8"},
  {i:2,medal:"🥉",crown:"🥉",label:"3RD",sub:"",       ph:100,pc1:"#431407",pc2:"#2c0a02",ac:"#cd7f32"},
];

/* ─── 포디엄 카드 (모바일 30% 추가 축소 + 디자인 개선) ─── */
const PodiumCard=memo(function PodiumCard({c,pdIdx,voteCount,pct,canVote,isMe,onVote,isMobile}){
  const p=PDM[pdIdx];
  const isFirst=pdIdx===0;
  const sz=isFirst?(isMobile?0:68):(isMobile?0:52);
  const [sparks,setSparks]=useState([]);
  const prevRef=useRef(voteCount);

  useEffect(()=>{
    if(!isFirst)return;
    if(voteCount-prevRef.current>30){
      prevRef.current=voteCount;
      setSparks(Array.from({length:5},(_,i)=>({id:Date.now()+i,x:15+Math.random()*70,e:["✨","⭐","💫","🌟","🎊"][i]})));
      setTimeout(()=>setSparks([]),1300);
    }
  },[voteCount,isFirst]);

  if(isMobile){
    // ── 모바일 전용 초슬림 카드 ──
    return(
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",flex:isFirst?1.3:1,minWidth:0}}>
        <div
          onClick={()=>onVote(c)}
          style={{
            width:"100%",position:"relative",
            background:isFirst?`linear-gradient(160deg,${c.color}28,${c.color}08)`:`${c.color}0a`,
            border:`${isFirst?"2px":"1px"} solid ${c.color}${isFirst?"60":"25"}`,
            borderRadius:isFirst?10:7,
            padding:isFirst?"5px 3px":"3px 2px",
            textAlign:"center",cursor:canVote?"pointer":"default",
            boxShadow:isFirst?`0 0 20px ${c.color}35,inset 0 1px 0 ${c.color}20`:"none",
          }}
        >
          {isFirst&&<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 0%,${c.color}20,transparent 70%)`,pointerEvents:"none",borderRadius:10,zIndex:0}}/>}
          {isMe&&<div style={{position:"absolute",top:2,right:2,fontSize:5,background:"#1e1b4b",color:"#a5b4fc",borderRadius:3,padding:"1px 3px",fontWeight:700,zIndex:3}}>MY</div>}
          {sparks.map(s=>(
            <div key={s.id} style={{position:"absolute",left:`${s.x}%`,top:"5%",fontSize:10,pointerEvents:"none",zIndex:5,animation:"floatUp 1.3s ease forwards"}}>{s.e}</div>
          ))}
          <div style={{position:"relative",zIndex:1}}>
            {/* 메달만 표시 */}
            <div style={{fontSize:isFirst?15:11,lineHeight:1,filter:isFirst?"drop-shadow(0 0 6px gold)":""}}>{p.medal}</div>
            {/* 이름 */}
            <div style={{fontSize:isFirst?6:5,fontWeight:800,color:"#f1f5f9",marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"0 1px",lineHeight:1.2}}>{c.name}</div>
            {/* 투표 버튼 */}
            {canVote?(
              <button
                onClick={e=>{e.stopPropagation();onVote(c);}}
                style={{
                  marginTop:3,width:"100%",border:"none",borderRadius:5,
                  padding:isFirst?"4px 1px":"2px 1px",
                  color:"#fff",fontWeight:800,cursor:"pointer",
                  fontSize:isFirst?7:6,
                  background:isFirst?`linear-gradient(135deg,${c.color},${c.color}cc)`:`linear-gradient(135deg,${c.color}99,${c.color}55)`,
                  boxShadow:isFirst?`0 2px 10px ${c.color}44`:"none",
                }}>
                {isFirst?"⭐ VOTE":"Vote"}
              </button>
            ):isMe?(
              <div style={{marginTop:2,fontSize:6,color:"#a5b4fc",fontWeight:700}}>✅ Voted</div>
            ):null}
          </div>
        </div>
        {/* 받침대 — 아주 얇게 */}
        <div style={{
          width:"75%",height:Math.round(p.ph*0.055),
          background:`linear-gradient(175deg,${p.pc1},${p.pc2})`,
          borderRadius:"2px 2px 0 0",
          display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:`inset 0 2px 6px rgba(0,0,0,0.5)`,
          position:"relative",overflow:"hidden",
        }}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${p.ac}50,transparent)`}}/>
          <span style={{fontSize:7,fontWeight:900,color:p.ac,letterSpacing:"0.05em"}}>{p.label}</span>
        </div>
      </div>
    );
  }

  // ── 웹 버전 (기존 유지) ──
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",flex:isFirst?1.2:1,minWidth:0}}>
      <div
        onClick={()=>onVote(c)}
        style={{
          width:"100%",position:"relative",overflow:"visible",
          background:isFirst?`linear-gradient(160deg,${c.color}22,${c.color}06)`:`${c.color}08`,
          border:`${isFirst?"2px":"1.5px"} solid ${c.color}${isFirst?"55":"28"}`,
          borderRadius:isFirst?18:12,
          padding:isFirst?"15px 11px":"11px 7px",
          textAlign:"center",cursor:canVote?"pointer":"default",
          boxShadow:isFirst?`0 0 60px ${c.color}45,0 10px 40px rgba(0,0,0,0.65),inset 0 1px 0 ${c.color}25`
            :isMe?`0 0 14px ${c.color}22`:`0 2px 10px rgba(0,0,0,0.35)`,
          transition:"transform 0.18s ease,box-shadow 0.18s ease",
          willChange:"transform",
        }}
        onMouseEnter={e=>{if(!canVote&&!isFirst)return;e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow=isFirst?`0 0 90px ${c.color}65,0 22px 55px rgba(0,0,0,0.75)`:`0 0 28px ${c.color}40`;}}
        onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=isFirst?`0 0 60px ${c.color}45,0 10px 40px rgba(0,0,0,0.65),inset 0 1px 0 ${c.color}25`:isMe?`0 0 14px ${c.color}22`:`0 2px 10px rgba(0,0,0,0.35)`;}}
      >
        {isFirst&&<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% -10%,${c.color}30,transparent 60%)`,pointerEvents:"none",borderRadius:18,zIndex:0}}/>}
        {isMe&&<div style={{position:"absolute",top:5,right:5,fontSize:7,background:"#1e1b4b",color:"#a5b4fc",borderRadius:4,padding:"1px 4px",fontWeight:700,border:"1px solid #312e81",zIndex:3}}>MY VOTE</div>}
        {sparks.map(s=>(
          <div key={s.id} style={{position:"absolute",left:`${s.x}%`,top:"5%",fontSize:13,pointerEvents:"none",zIndex:5,animation:"floatUp 1.3s ease forwards"}}>{s.e}</div>
        ))}
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:isFirst?20:14,lineHeight:1.1,marginBottom:1}}>{isFirst?"👑":pdIdx===1?"🥈":"🥉"}</div>
          <div style={{fontSize:isFirst?36:24,lineHeight:1,marginBottom:3,filter:isFirst?"drop-shadow(0 0 12px gold) drop-shadow(0 0 6px gold)":""}}>{p.medal}</div>
          <div style={{display:"flex",justifyContent:"center"}}><Donut pct={pct} color={c.color} size={sz}/></div>
          <div style={{fontSize:isFirst?13:10,fontWeight:800,color:"#f1f5f9",marginTop:5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"0 2px"}}>{c.name}</div>
          <div style={{fontSize:8,color:c.color,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:1}}>{c.group}</div>
          <div style={{fontSize:7,color:"#4b5563",marginTop:1}}>{c.nat}</div>
          <div style={{margin:"5px auto 0",display:"inline-block",fontSize:isFirst?12:9,fontWeight:800,fontFamily:"monospace",color:isFirst?"#fbbf24":"#d1d5db",background:isFirst?"rgba(251,191,36,0.13)":"rgba(255,255,255,0.05)",border:`1px solid ${isFirst?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.07)"}`,borderRadius:7,padding:"2px 7px"}}>{voteCount.toLocaleString()}</div>
          {canVote?(
            <button onClick={e=>{e.stopPropagation();onVote(c);}} onMouseEnter={e=>{e.currentTarget.style.opacity="0.82";e.currentTarget.style.transform="scale(1.04)";}} onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="scale(1)";}}
              style={{marginTop:7,width:"100%",border:"none",borderRadius:9,padding:isFirst?"10px 2px":"7px 2px",color:"#fff",fontWeight:800,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontSize:isFirst?11:9,background:isFirst?`linear-gradient(135deg,${c.color},${c.color}bb)`:`linear-gradient(135deg,${c.color}88,${c.color}44)`,boxShadow:isFirst?`0 4px 20px ${c.color}55`:"none",transition:"opacity 0.15s,transform 0.15s"}}>
              {isFirst?"⭐ VOTE NOW ⭐":"Vote 🗳️"}
            </button>
          ):isMe?(<div style={{marginTop:5,fontSize:9,color:"#a5b4fc",fontWeight:700}}>✅ Your Vote</div>):null}
        </div>
      </div>
      <div style={{width:"80%",height:p.ph,background:`linear-gradient(175deg,${p.pc1},${p.pc2})`,borderTop:`2px solid ${p.ac}35`,border:`1px solid ${p.ac}20`,borderRadius:"3px 3px 0 0",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:9,gap:1,boxShadow:`inset 0 3px 10px rgba(0,0,0,0.5),0 0 22px ${p.ac}0d`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${p.ac}40,transparent)`}}/>
        <span style={{fontSize:17,fontWeight:900,color:p.ac,letterSpacing:"0.06em",fontFamily:"Syne,Arial"}}>{p.label}</span>
        {p.sub&&<span style={{fontSize:7,color:p.ac,opacity:0.45,letterSpacing:"0.1em"}}>{p.sub}</span>}
      </div>
    </div>
  );
},(prev,next)=>
  prev.voteCount===next.voteCount&&
  Math.abs(prev.pct-next.pct)<0.00001&&
  prev.canVote===next.canVote&&
  prev.isMe===next.isMe&&
  prev.isMobile===next.isMobile
);

/* ═══════════ 메인 ═══════════ */
export default function App(){
  // ── votes는 Ref로 관리 (변경해도 리렌더 없음) ──
  const votesRef=useRef({});
  const totalRef=useRef(0);
  CANDS.forEach(c=>{if(!votesRef.current[c.id]){votesRef.current[c.id]=c.v;}});
  totalRef.current=CANDS.reduce((a,c)=>a+(votesRef.current[c.id]||0),0);

  // UI 업데이트용 snapshot (2초마다만 갱신)
  const [snap,setSnap]=useState(()=>{const v={};CANDS.forEach(c=>{v[c.id]=c.v;});return v;});
  const [snapTotal,setSnapTotal]=useState(()=>CANDS.reduce((a,c)=>a+c.v,0));
  const [snapVisitors,setSnapVisitors]=useState(1289432);
  const visitorsRef=useRef(1289432);

  // 실시간 피드 (사이드바용)
  const [recent,setRecent]=useState([]);

  // 내 투표
  const [myVoteId,setMyVoteId]=useState(()=>getTodayVote());
  const myVote=myVoteId?CANDS.find(c=>c.id===myVoteId)||null:null;

  // 티커용 ref (캔버스에 전달)
  const tickerItemsRef=useRef(CANDS.slice(0,30).map(c=>({name:c.name,nat:c.nat,color:c.color})));

  // UI
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("All");
  const [view,setView]=useState("rank");
  const [celebrate,setCelebrate]=useState(false);
  const [confetti,setConfetti]=useState([]);
  const [showAlready,setShowAlready]=useState(false);
  const [isMobile,setIsMobile]=useState(()=>window.innerWidth<768);
  const [showSidebar,setShowSidebar]=useState(false);
  const [showPopupAd,setShowPopupAd]=useState(false);
  const countdown=useCountdown();

  // 모바일 팝업 광고: 10초 후 자동 표시
  useEffect(()=>{
    if(!isMobile)return;
    const t=setTimeout(()=>setShowPopupAd(true),10000);
    return()=>clearTimeout(t);
  },[isMobile]);
  const celebRef=useRef(null);

  useEffect(()=>{
    const fn=()=>setIsMobile(window.innerWidth<768);
    window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);
  },[]);

  // Firebase 실시간 투표 수신
  useEffect(()=>{
    const votesDbRef=ref(db,"votes");
    const unsub=onValue(votesDbRef,(snapshot)=>{
      const data=snapshot.val()||{};
      // Firebase 데이터로 로컬 ref 업데이트
      Object.keys(data).forEach(id=>{
        if(data[id]>=(votesRef.current[id]||0)){
          votesRef.current[id]=data[id];
        }
      });
      totalRef.current=Object.values(votesRef.current).reduce((a,b)=>a+b,0);
      setSnap({...votesRef.current});
      setSnapTotal(totalRef.current);
    });
    return()=>unsub();
  },[]);

  // ── 시뮬레이션: 티커/피드/방문자만 업데이트 (votes는 Firebase에서만) ──
  useEffect(()=>{
    const pool=CANDS; // 모든 후보 동등하게
    const simId=setInterval(()=>{
      const r=pool[Math.floor(Math.random()*pool.length)];
      // 방문자 카운트만 로컬 증가
      visitorsRef.current+=Math.floor(Math.random()*3)+1;
      // 티커 피드만 업데이트 (투표수는 건드리지 않음)
      tickerItemsRef.current=[{name:r.name,nat:r.nat,color:r.color},...tickerItemsRef.current].slice(0,60);
      setRecent(prev=>[{cid:r.id,t:"just now"},...prev].slice(0,14));
    },700);

    // ── 방문자 카운트 UI 업데이트 ──
    const uiId=setInterval(()=>{
      setSnapVisitors(visitorsRef.current);
    },2000);

    return()=>{clearInterval(simId);clearInterval(uiId);};
  },[]);

  const handleVote=useCallback((c)=>{
    if(myVoteId){setShowAlready(true);setTimeout(()=>setShowAlready(false),2500);return;}
    setMyVoteId(c.id);
    votesRef.current[c.id]=(votesRef.current[c.id]||0)+1;
    totalRef.current+=1;
    saveVote(c.id);
    const voteRef=ref(db,`votes/${c.id}`);
    runTransaction(voteRef,(current)=>(current||0)+1);
    tickerItemsRef.current=[{name:c.name,nat:c.nat,color:c.color},...tickerItemsRef.current].slice(0,60);
    setRecent(prev=>[{cid:c.id,t:"just now"},...prev].slice(0,14));
    setSnap({...votesRef.current});
    setSnapTotal(totalRef.current);
    setConfetti(Array.from({length:22},(_,i)=>({id:i,e:["🎉","⭐","✨","🌟","💫","🏆","🎊","🔥","❤️","🥳","👑","💜"][i%12],x:2+Math.random()*96,d:Math.random()*0.9})));
    setCelebrate(true);
    if(isMobile)setShowSidebar(false);
    clearTimeout(celebRef.current);
    celebRef.current=setTimeout(()=>{setCelebrate(false);setConfetti([]);},3600);
  },[myVoteId,isMobile]);

  // 정렬
  const sorted=[...CANDS]
    .filter(c=>(cat==="All"||c.cat===cat)&&(c.name.toLowerCase().includes(search.toLowerCase())||c.group.toLowerCase().includes(search.toLowerCase())||c.nat.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b)=>(snap[b.id]||0)-(snap[a.id]||0));
  const maxV=Math.max(...CANDS.map(c=>snap[c.id]||0),1);
  const canVote=!myVoteId;
  const myRank=myVote?[...CANDS].sort((a,b)=>(snap[b.id]||0)-(snap[a.id]||0)).findIndex(c=>c.id===myVote.id)+1:null;
  const top3=sorted.slice(0,3);

  /* ── 사이드바 (내부 컴포넌트, recent/countdown/myVote만 리렌더) ── */
  function Sidebar(){
    return(
      <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
        {/* 투표 상태 */}
        <div style={{padding:12,borderBottom:"1px solid #111120",flexShrink:0}}>
          {myVote?(
            <div>
              <div style={{background:`${myVote.color}0e`,border:`1px solid ${myVote.color}28`,borderRadius:12,padding:12,marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:`${myVote.color}20`,border:`2px solid ${myVote.color}45`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>⭐</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:11,fontWeight:800,color:"#f1f5f9",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{myVote.name}</div>
                    <div style={{fontSize:9,color:myVote.color,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{myVote.group}</div>
                  </div>
                  <div style={{textAlign:"center",flexShrink:0}}>
                    <div style={{fontSize:18,fontWeight:800,color:"#fbbf24",lineHeight:1}}>#{myRank}</div>
                    <div style={{fontSize:7,color:"#374151"}}>RANK</div>
                  </div>
                </div>
                <div style={{fontSize:10,color:myVote.color,fontWeight:700,textAlign:"center",marginBottom:6}}>🗳️ {(snap[myVote.id]||0).toLocaleString()} votes</div>
                <div style={{height:3,background:"#1a1a2e",borderRadius:999,overflow:"hidden",marginBottom:8}}>
                  <div style={{width:`${Math.min(((snap[myVote.id]||0)/maxV)*100,100)}%`,height:"100%",background:myVote.color,borderRadius:999,transition:"width 0.8s"}}/>
                </div>
                {/* 카운트다운 */}
                <div style={{background:"#08080f",borderRadius:8,padding:"7px 8px",textAlign:"center",border:"1px solid #111120"}}>
                  <div style={{fontSize:7,color:"#374151",marginBottom:2,letterSpacing:"0.05em"}}>⏰ NEXT VOTE IN</div>
                  <div style={{fontSize:17,fontWeight:800,color:"#fbbf24",fontFamily:"monospace",letterSpacing:"0.04em"}}>{countdown}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:5}}>
                {[{lbl:"Share",c:"#1da1f2",i:"🐦",url:`https://twitter.com/intent/tweet?text=I+voted+for+${encodeURIComponent(myVote.name)}+in+VoteStar+2025!+🏆`},{lbl:"Copy",c:"#a78bfa",i:"🔗"}].map(b=>(
                  <button key={b.lbl} onClick={()=>b.url?window.open(b.url):navigator.clipboard?.writeText(window.location.href)}
                    style={{flex:1,background:`${b.c}10`,border:`1px solid ${b.c}25`,borderRadius:7,padding:"6px",color:b.c,fontSize:9,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                    {b.i} {b.lbl}
                  </button>
                ))}
              </div>
            </div>
          ):(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:22,display:"inline-block",animation:"bounce 2s infinite",marginBottom:4}}>🏆</div>
              <div style={{fontSize:12,fontWeight:800,color:"#f1f5f9",marginBottom:3}}>Vote for Person of the Year!</div>
              <div style={{fontSize:9,color:"#4b5563",marginBottom:8}}>{CANDS.length} candidates · 1 vote/day</div>
              <div style={{background:"#08080f",borderRadius:8,padding:"7px 8px",border:"1px solid #111120"}}>
                <div style={{fontSize:7,color:"#374151",marginBottom:2,letterSpacing:"0.05em"}}>⏰ VOTING CLOSES IN</div>
                <div style={{fontSize:17,fontWeight:800,color:"#22c55e",fontFamily:"monospace",letterSpacing:"0.04em"}}>{countdown}</div>
              </div>
            </div>
          )}
        </div>

        {/* LIVE VOTES — 스크롤 가능 */}
        <div style={{flex:1,overflowY:"auto",minHeight:0}}>
          <div style={{padding:"7px 11px 3px",fontSize:9,color:"#374151",fontWeight:700,display:"flex",alignItems:"center",gap:4,letterSpacing:"0.06em"}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:"#22c55e",display:"inline-block",animation:"livePulse 1.5s infinite"}}/>LIVE VOTES
          </div>
          {recent.map((v,i)=>{
            const c2=CANDS.find(x=>x.id===v.cid);
            if(!c2)return null;
            return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 11px",borderBottom:"1px solid #0d0d1a"}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:`${c2.color}15`,border:`1px solid ${c2.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,flexShrink:0}}>⭐</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:9,color:"#e2e8f0",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c2.name}</div>
                  <div style={{fontSize:7,color:"#374151"}}>{c2.nat}</div>
                </div>
                <span style={{fontSize:8,color:c2.color,fontWeight:700,flexShrink:0}}>+1</span>
              </div>
            );
          })}
        </div>

        {/* 광고 — Live Votes 바로 아래, 하단 고정 */}
        <div style={{flexShrink:0,padding:"9px 10px",borderTop:"1px solid #111120",background:"#06060e"}}>
          <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:6}}>
            <span style={{fontSize:9}}>📢</span>
            <span style={{fontSize:8,color:"#1e1e38",fontWeight:600,letterSpacing:"0.06em"}}>ADVERTISEMENT</span>
          </div>
          {/* ★ 여기에 Google AdSense 300×250 코드 붙여넣기 ★ */}
          <div id="sidebar-ad-300x250" style={{
            width:"100%",height:180,
            background:"#080812",
            border:"1px solid #111120",
            borderRadius:8,
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,
          }}>
            <span style={{fontSize:22,opacity:0.1}}>📢</span>
            <span style={{fontSize:9,color:"#12122a",fontWeight:600}}>Google AdSense</span>
            <span style={{fontSize:8,color:"#0d0d1e"}}>300 × 250</span>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{height:"100vh",background:"#06060e",color:"#e2e8f0",fontFamily:"'Syne',Arial,sans-serif",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes livePulse{0%,100%{opacity:1}50%{opacity:0.15}}
        @keyframes popIn{0%{opacity:0;transform:translate(-50%,-50%) scale(0.8)}65%{transform:translate(-50%,-50%) scale(1.05)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
        @keyframes confettiFall{0%{opacity:1;transform:translateY(0) rotate(0) scale(1)}100%{opacity:0;transform:translateY(180px) rotate(810deg) scale(0.3)}}
        @keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-50px) scale(0.4)}}
        @keyframes shakeX{0%,100%{transform:translate(-50%,-50%)}30%{transform:translate(calc(-50% - 5px),-50%)}70%{transform:translate(calc(-50% + 5px),-50%)}}
        @keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        input::placeholder{color:#252540}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#151530;border-radius:2px}
        .rc{transition:background 0.1s,border-color 0.1s;}
        .rc:hover{background:#0e0e1c!important;border-color:#252540!important;}
        .tb:hover{background:#111120!important;}
        .cb:hover{background:#111120!important;}
        .vsm{transition:opacity 0.1s,transform 0.1s;}
        .vsm:hover{opacity:0.82;transform:scale(1.04);}
      `}</style>

      {/* 모바일 하단 팝업 광고 */}
      {isMobile&&showPopupAd&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"#07070d",borderTop:"1px solid #1e1e38",padding:"10px 14px 16px",boxShadow:"0 -4px 30px rgba(0,0,0,0.7)",animation:"slideUp 0.35s ease"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:9,color:"#2d2d50",fontWeight:700,letterSpacing:"0.1em"}}>📢 ADVERTISEMENT</span>
            <button onClick={()=>setShowPopupAd(false)} style={{background:"#111120",border:"1px solid #252540",borderRadius:6,color:"#6b7280",fontSize:12,width:22,height:22,cursor:"pointer",fontWeight:700,lineHeight:"22px",textAlign:"center",padding:0}}>✕</button>
          </div>
                    {/* ★ AdSense 승인 후 여기에 320×100 광고 코드 붙여넣기 ★ */}
          <div id="popup-ad-mobile" style={{width:"100%",minHeight:60,background:"#0a0a18",border:"1px dashed #1e1e38",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:9,color:"#2d2d50"}}>[ AdSense 승인 후 광고 코드 삽입 ]</span>
          </div>
        </div>
      )}

      {/* 상단 광고 */}
      <div style={{background:"#07070d",borderBottom:"1px solid #111120",padding:"6px 14px",display:"flex",alignItems:"center",justifyContent:"center",gap:8,flexShrink:0}}>
        <span style={{fontSize:9,color:"#1e1e38",flexShrink:0}}>📢 AD</span>
        {/* ★ 728×90 AdSense 코드 붙여넣기 ★ */}
        <div id="top-ad-728x90" style={{flex:1,maxWidth:728,height:36,background:"#080812",border:"1px dashed #111120",borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{color:"#111120",fontSize:9}}>728×90 — Paste AdSense code here</span>
        </div>
      </div>

      {/* 네비 */}
      <div style={{background:"#07070d",borderBottom:"1px solid #111120",padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          {isMobile&&<button onClick={()=>setShowSidebar(s=>!s)} style={{background:"#111120",border:"1px solid #1e1e38",borderRadius:7,padding:"4px 8px",color:"#e2e8f0",fontSize:15,cursor:"pointer"}}>☰</button>}
          <span style={{fontSize:20,animation:"bounce 2s infinite",display:"inline-block",lineHeight:1}}>🏆</span>
          <div>
            <div style={{fontSize:isMobile?12:15,fontWeight:800,background:"linear-gradient(90deg,#fbbf24,#f472b6,#a78bfa,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"-0.5px",whiteSpace:"nowrap"}}>VoteStar 2026</div>
            {!isMobile&&<div style={{fontSize:7,color:"#374151",letterSpacing:"0.08em"}}>PERSON OF THE YEAR · {CANDS.length} CANDIDATES · GLOBAL FANDOM BATTLE</div>}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:isMobile?7:12}}>
          {!isMobile&&[["🗳️",snapTotal,"VOTES"],["👥",snapVisitors,"VISITORS"]].map(([ic,vl,lb])=>(
            <div key={lb} style={{textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:800,color:"#f1f5f9",fontFamily:"monospace"}}>{ic} {vl.toLocaleString()}</div>
              <div style={{fontSize:7,color:"#374151"}}>{lb}</div>
            </div>
          ))}
          {isMobile&&<div style={{fontSize:9,fontWeight:800,color:"#f1f5f9",fontFamily:"monospace"}}>🗳️{snapTotal.toLocaleString()}</div>}
          <div style={{display:"flex",alignItems:"center",gap:4,background:"#091409",border:"1px solid #22c55e22",borderRadius:20,padding:"3px 8px"}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:"#22c55e",display:"inline-block",animation:"livePulse 1.5s infinite"}}/>
            <span style={{fontSize:9,color:"#22c55e",fontWeight:700}}>LIVE</span>
          </div>
        </div>
      </div>

      {/* 캔버스 티커 (React 리렌더와 완전 분리) */}
      <CanvasTicker getItems={()=>tickerItemsRef.current}/>

      {/* 알림 */}
      {showAlready&&(
        <div style={{position:"fixed",top:"12%",left:"50%",background:"#120800",border:"1px solid #f59e0b",borderRadius:10,padding:"9px 16px",zIndex:3000,animation:"shakeX 0.4s ease",whiteSpace:"nowrap",boxShadow:"0 0 20px rgba(245,158,11,0.4)"}}>
          <span style={{fontSize:11,fontWeight:700,color:"#fbbf24"}}>⏰ Already voted! Next vote in {countdown}</span>
        </div>
      )}

      {/* 레이아웃 */}
      <div style={{flex:1,display:"flex",overflow:"hidden",position:"relative",minHeight:0}}>
        {isMobile&&showSidebar&&<div onClick={()=>setShowSidebar(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:99}}/>}

        {/* 사이드바 */}
        {(!isMobile||showSidebar)&&(
          <div style={{width:244,background:"#07070d",borderRight:"1px solid #111120",display:"flex",flexDirection:"column",flexShrink:0,overflow:"hidden",...(isMobile?{position:"fixed",top:0,left:0,height:"100%",zIndex:100,animation:"slideIn 0.22s ease",paddingTop:38}:{})}}>
            <Sidebar/>
          </div>
        )}

        {/* 메인 */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>

          {/* 포디엄 */}
          <div style={{padding:isMobile?"2px 4px 0":"9px 12px 0",background:"linear-gradient(180deg,#0c0916,#06060e)",flexShrink:0,borderBottom:"1px solid #111120"}}>
            <div style={{textAlign:"center",marginBottom:isMobile?3:6}}>
              <span style={{fontSize:isMobile?0:10,fontWeight:700,color:"#2d2d50",letterSpacing:"0.12em"}}>🏆 TOP 3 LEADERBOARD</span>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:isMobile?3:5}}>
              {top3[1]&&<PodiumCard c={top3[1]} pdIdx={1} voteCount={snap[top3[1].id]||0} pct={snapTotal>0?(snap[top3[1].id]||0)/snapTotal:0} canVote={canVote} isMe={myVoteId===top3[1].id} onVote={handleVote} isMobile={isMobile}/>}
              {top3[0]&&<PodiumCard c={top3[0]} pdIdx={0} voteCount={snap[top3[0].id]||0} pct={snapTotal>0?(snap[top3[0].id]||0)/snapTotal:0} canVote={canVote} isMe={myVoteId===top3[0].id} onVote={handleVote} isMobile={isMobile}/>}
              {top3[2]&&<PodiumCard c={top3[2]} pdIdx={2} voteCount={snap[top3[2].id]||0} pct={snapTotal>0?(snap[top3[2].id]||0)/snapTotal:0} canVote={canVote} isMe={myVoteId===top3[2].id} onVote={handleVote} isMobile={isMobile}/>}
            </div>
          </div>

          {/* 탭 + 검색 + 카테고리 */}
          <div style={{padding:isMobile?"5px 7px":"6px 11px",borderBottom:"1px solid #111120",background:"#07070d",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:5,flexWrap:"wrap"}}>
              {[["rank","📊","Ranking"],["chart","📈","Category"],["live","📡","Live"]].map(([v,ic,lb])=>(
                <button key={v} className="tb" onClick={()=>setView(v)}
                  style={{background:view===v?"#111120":"transparent",border:`1px solid ${view===v?"#252540":"transparent"}`,borderRadius:8,padding:"4px 9px",color:view===v?"#f1f5f9":"#4b5563",fontSize:9,cursor:"pointer",fontFamily:"'Syne',Arial",fontWeight:700,transition:"background 0.1s"}}>
                  {ic} {lb}
                </button>
              ))}
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search..."
                style={{marginLeft:"auto",background:"#0b0b18",border:"1px solid #151530",borderRadius:8,padding:"4px 10px",fontSize:9,color:"#e2e8f0",outline:"none",fontFamily:"'Syne',Arial",width:isMobile?92:132}}/>
            </div>
            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
              {CATS.map(c=>(
                <button key={c} className="cb" onClick={()=>setCat(c)}
                  style={{background:cat===c?"#1e1b4b":"transparent",border:`1px solid ${cat===c?"#3730a338":"#111120"}`,borderRadius:20,padding:"1px 7px",color:cat===c?"#a78bfa":"#374151",fontSize:8,cursor:"pointer",fontFamily:"'Syne',Arial",fontWeight:cat===c?700:400,transition:"background 0.1s",whiteSpace:"nowrap"}}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 리스트 */}
          <div style={{flex:1,overflowY:"auto",padding:isMobile?5:8}}>
            {view==="rank"&&sorted.map((c,i)=>{
              const isMe=myVoteId===c.id,rank=i+1;
              return(
                <div key={c.id} className="rc"
                  style={{background:isMe?`${c.color}08`:"#0a0a16",border:`1px solid ${isMe?c.color+"25":"#111120"}`,borderRadius:9,padding:isMobile?"5px 7px":"6px 10px",display:"flex",alignItems:"center",gap:isMobile?4:6,cursor:canVote?"pointer":"default",marginBottom:3}}
                  onClick={()=>handleVote(c)}>
                  <div style={{fontSize:rank<=3?12:8,fontWeight:800,minWidth:isMobile?15:19,textAlign:"center",color:rank===1?"#fbbf24":rank===2?"#9ca3af":rank===3?"#cd7f32":"#1e1e38",flexShrink:0}}>
                    {rank<=3?["🥇","🥈","🥉"][rank-1]:`#${rank}`}
                  </div>
                  <div style={{width:26,height:26,borderRadius:"50%",background:`${c.color}15`,border:`1px solid ${c.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0}}>⭐</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:1}}>
                      <span style={{fontSize:isMobile?9:10,fontWeight:800,color:isMe?c.color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</span>
                      {!isMobile&&<span style={{fontSize:7,background:`${c.color}12`,color:c.color,borderRadius:3,padding:"0 4px",fontWeight:700,flexShrink:0,whiteSpace:"nowrap"}}>{c.cat}</span>}
                      {isMe&&<span style={{fontSize:7,background:"#1e1b4b",color:"#a5b4fc",borderRadius:3,padding:"0 4px",fontWeight:700,flexShrink:0}}>MY</span>}
                    </div>
                    <div style={{fontSize:7,color:"#374151",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{isMobile?c.nat:`${c.group} · ${c.nat}`}</div>
                    <div style={{height:3,background:"#151530",borderRadius:999,overflow:"hidden",marginTop:3}}>
                      <div style={{width:`${Math.min(((snap[c.id]||0)/maxV)*100,100)}%`,height:"100%",background:c.color,borderRadius:999,transition:"width 0.8s ease"}}/>
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:isMobile?9:10,fontWeight:800,color:"#d1d5db",fontFamily:"monospace"}}>{(snap[c.id]||0).toLocaleString()}</div>
                    <div style={{fontSize:7,color:"#374151"}}>{snapTotal>0?((snap[c.id]||0)/snapTotal*100).toFixed(2):0}%</div>
                  </div>
                  {canVote&&(
                    <button className="vsm" onClick={e=>{e.stopPropagation();handleVote(c);}}
                      style={{background:`linear-gradient(135deg,${c.color},${c.color}88)`,border:"none",borderRadius:6,padding:isMobile?"4px 7px":"5px 9px",color:"#fff",fontSize:isMobile?8:9,fontWeight:800,cursor:"pointer",fontFamily:"'Syne',Arial",flexShrink:0,whiteSpace:"nowrap"}}>
                      Vote 🗳️
                    </button>
                  )}
                  {!canVote&&isMe&&<span style={{fontSize:11,flexShrink:0}}>✅</span>}
                </div>
              );
            })}

            {view==="chart"&&(
              <div>
                <div style={{background:"#0a0a16",border:"1px solid #111120",borderRadius:11,padding:12,marginBottom:7}}>
                  <div style={{fontSize:10,color:"#4b5563",fontWeight:700,marginBottom:9}}>📊 Votes by Category</div>
                  {Object.entries(CANDS.reduce((acc,c)=>{acc[c.cat]=(acc[c.cat]||0)+(snap[c.id]||0);return acc;},{})).sort((a,b)=>b[1]-a[1]).map(([cn,cv],i)=>(
                    <div key={cn} style={{marginBottom:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#cbd5e1",marginBottom:2}}>
                        <span style={{fontWeight:700}}>{cn}</span>
                        <span style={{fontFamily:"monospace",color:"#4b5563"}}>{cv.toLocaleString()} ({(cv/snapTotal*100).toFixed(1)}%)</span>
                      </div>
                      <div style={{height:5,background:"#151530",borderRadius:999,overflow:"hidden"}}>
                        <div style={{width:`${(cv/snapTotal)*100}%`,height:"100%",background:`hsl(${i*26},68%,55%)`,borderRadius:999,transition:"width 0.9s"}}/>
                      </div>
                    </div>
                  ))}
                </div>
                {sorted.slice(0,30).map((c,i)=>(
                  <div key={c.id} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 9px",background:"#0a0a16",border:`1px solid ${myVoteId===c.id?c.color+"25":"#111120"}`,borderRadius:8,marginBottom:3}}>
                    <span style={{fontSize:8,fontWeight:800,color:"#1e1e38",minWidth:19,flexShrink:0}}>#{i+1}</span>
                    <span style={{fontSize:9,fontWeight:700,color:"#e2e8f0",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</span>
                    {!isMobile&&<span style={{fontSize:7,color:"#4b5563",minWidth:64,textAlign:"right",flexShrink:0}}>{c.nat}</span>}
                    <div style={{flex:2,minWidth:34}}>
                      <div style={{height:4,background:"#151530",borderRadius:999,overflow:"hidden"}}>
                        <div style={{width:`${((snap[c.id]||0)/maxV)*100}%`,height:"100%",background:`linear-gradient(90deg,${c.color},${c.color}55)`,borderRadius:999,transition:"width 0.8s"}}/>
                      </div>
                    </div>
                    <span style={{fontSize:8,fontFamily:"monospace",color:"#374151",minWidth:60,textAlign:"right",flexShrink:0}}>{(snap[c.id]||0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            {view==="live"&&(
              <div>
                <div style={{background:"#0a0a16",border:"1px solid #111120",borderRadius:11,padding:12,marginBottom:7}}>
                  <div style={{fontSize:9,color:"#4b5563",fontWeight:700,marginBottom:8,display:"flex",alignItems:"center",gap:5}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:"#22c55e",display:"inline-block",animation:"livePulse 1.5s infinite"}}/>LIVE STATS
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7}}>
                    {[["Total Votes",snapTotal,"#6366f1"],["Visitors",snapVisitors,"#22c55e"],["Candidates",CANDS.length,"#f472b6"]].map(([lb,vl,cl])=>(
                      <div key={lb} style={{background:"#06060e",borderRadius:9,padding:"9px",textAlign:"center"}}>
                        <div style={{fontSize:12,fontWeight:800,color:cl,fontFamily:"monospace"}}>{vl.toLocaleString()}</div>
                        <div style={{fontSize:7,color:"#374151",marginTop:2}}>{lb}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:8,padding:"6px 10px",background:"#06060e",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:9,color:"#fbbf24",fontWeight:700}}>⏰ Daily reset in</span>
                    <span style={{fontSize:13,fontWeight:800,color:"#fbbf24",fontFamily:"monospace"}}>{countdown}</span>
                  </div>
                </div>
                {recent.map((v,i)=>{
                  const c2=CANDS.find(x=>x.id===v.cid);if(!c2)return null;
                  return(
                    <div key={i} style={{background:"#0a0a16",border:`1px solid ${c2.color}12`,borderRadius:9,padding:"7px 10px",display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                      <div style={{width:26,height:26,borderRadius:"50%",background:`${c2.color}12`,border:`1px solid ${c2.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>⭐</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:9,fontWeight:700,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c2.name}</div>
                        <div style={{fontSize:7,color:"#374151"}}>{c2.group} · {c2.nat}</div>
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <div style={{fontSize:8,color:c2.color,fontWeight:700}}>just now</div>
                        <div style={{fontSize:7,color:"#374151"}}>{(snap[c2.id]||0).toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 컨페티 */}
      {confetti.map(c=>(
        <div key={c.id} style={{position:"fixed",top:"8%",left:`${c.x}%`,fontSize:16,animation:"confettiFall 2.1s ease forwards",animationDelay:`${c.d}s`,zIndex:1000,pointerEvents:"none"}}>{c.e}</div>
      ))}

      {/* 축하 팝업 */}
      {celebrate&&myVote&&(
        <div style={{position:"fixed",top:"50%",left:"50%",background:"#0c0c1a",border:`2px solid ${myVote.color}`,borderRadius:20,padding:isMobile?"16px 20px":"22px 32px",textAlign:"center",animation:"popIn 0.45s ease forwards",zIndex:999,pointerEvents:"none",boxShadow:`0 0 80px ${myVote.color}44`,minWidth:isMobile?210:250}}>
          <div style={{fontSize:38,marginBottom:8}}>🏆</div>
          <div style={{fontSize:14,fontWeight:800,color:"#f1f5f9",marginBottom:5}}>Vote Submitted! 🎉</div>
          <div style={{fontSize:13,color:myVote.color,fontWeight:800}}>{myVote.name}</div>
          <div style={{fontSize:9,color:"#4b5563",marginTop:3}}>{myVote.group} · {myVote.nat}</div>
          <div style={{fontSize:12,color:"#fbbf24",marginTop:8,fontWeight:800}}>Currently #{myRank} 🔥</div>
          <div style={{marginTop:8,padding:"5px 10px",background:"#06060e",borderRadius:7,fontSize:8,color:"#374151"}}>
            ⏰ Next vote in <span style={{color:"#fbbf24",fontWeight:700,fontFamily:"monospace"}}>{countdown}</span>
          </div>
        </div>
      )}
    </div>
  );
}
// eslint-disable-next-line react-hooks/exhaustive-deps 
