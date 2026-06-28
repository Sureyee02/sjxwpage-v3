
// ===== THEME COLORS =====
const C = {
  bg: '#006837',
  text: '#FFFFBF',
  gold: '#D9EF8B',
  gold2: '#FFFFBF',
  fire: '#006837',
  green: '#66BD63',
  card: '#1A9850',
  text2: '#D9EF8B',
  text3: '#FEE08B'
};

// ===== CHART INSTANCES =====
const charts = {};

// ===== PERSON DATA =====
const personsData = {
  huang: {
    name: '黄国锋',
    title: '榕江副县长',
    quote: '"村超不是一座球场，而是一团火，我们必须守护它。"',
    story: '黄国锋是榕江副县长，2025年特大洪灾中，他第一时间启动应急响应，组织各方力量清淤抢修、重建球场，推动7月26日村超感恩专场如期复赛。白天协调物资调度，傍晚坐镇指挥现场；从武警官兵到志愿者，从工程队到村民自救队，38.5万榕江人民在他的统筹下拧成一股绳。仅仅一个月后，淤泥被清走、看台被修复，这个火遍全网的草根赛场从废墟中重新亮起灯光。',
    stats: { '协调物资': '500吨', '清淤面积': '3.2万㎡', '重建周期': '28天', '感恩专场观众': '18万' }
  },
  xubo: {
    name: '徐勃',
    title: '榕江县委书记',
    quote: '"答案就是38.5万榕江人民，每个人都是参与者。"',
    story: '徐勃是榕江县委书记，也是村超赛事最重要的推动者之一。他提出"村超从来不是一座球场，而是38.5万榕江人共同的一团火"的理念，从政策层面为村超的发展保驾护航，协调各方资源，让这场草根赛事从乡村走向全国。',
    stats: { '任职年限': 3, '推动赛事': '村超联赛', '核心贡献': '政策支持', '民生项目': 12 }
  },
  dongha: {
    name: '东哈烧烤老板娘',
    title: '个体户赞助商 - 平等入场',
    quote: '"这里容得下烧烤，容得下理想，容得下千千万万的普通人。"',
    story: '在常州苏超赛场，22块场内官方广告牌中，东哈·东北街边烧烤是全场唯一的个体户赞助商。苏超主办方专门设置5万元小微企业专属赞助席位，让街边小店与阿迪达斯、京东等大牌同台亮相，体现了赛事的包容性。',
    stats: { '赞助金额': '5万', '日均营收增长': '300%', '曝光人次': '97.6万', '门店面积': '15㎡' }
  },
  liuzhi: {
    name: '刘勤兰',
    title: '蜡染手艺人 - 国际创业者',
    quote: '"Hello, welcome to Rongjiang!"',
    story: '刘勤兰以前在贵阳做幼师，2023年村超出圈后回乡创业，做蜡染服饰和文创产品。2025年特大洪水冲走了价值二三十万的银饰和刺绣，但她没有被击垮。她注意到越来越多外国游客来到榕江，于是开始学习英语，准备把蜡染产品卖向全球。',
    stats: { '创业年限': 3, '产品种类': 28, '年销售额': '80万', '团队人数': 6 }
  },
  xiaoli: {
    name: '小李',
    title: '快递员 - 苏州队边锋',
    quote: '"白天派件，晚上踢球，这就是我的生活。"',
    story: '小李是苏州一名普通快递员，每天派送数百件快递。作为苏州苏超球队的边锋，他以速度见长，在球场上如快递般穿梭。他的双重身份正是苏超赛事草根精神的缩影：普通的劳动者，不凡的足球梦想。',
    stats: { '日均派件': 350, '参赛场次': 28, '速度评分': 92, '助攻数': 15 }
  },
  zhou: {
    name: '周老师',
    title: '南昌历史教师 - 赣超组织者',
    quote: '"六万人齐声朗诵《滕王阁序》，声音震彻云霄。"',
    story: '周老师是南昌一所中学的历史教师，也是赣超联赛的主要组织者之一。他利用课余时间策划赛事、组织球队、协调场地。在赣超开幕式上，他组织六万名观众齐声朗诵《滕王阁序》，创造了草根赛事的文化奇迹。',
    stats: { '教龄': 15, '组织赛事': 24, '培养球员': 180, '文化项目': 6 }
  },
  wang: {
    name: '大连王哥',
    title: '公益车队司机',
    quote: '"一张球票，就是一张东北四省区的旅游通行证。"',
    story: '大连王哥是一名普通的出租车司机，也是东北超联赛的公益车队发起人。他组织数百名司机成立公益车队，免费接送球迷往返赛场，让偏远地区的球迷也能看到精彩比赛。他的公益车队已经成为东北超联赛一道独特的风景线。',
    stats: { '车队规模': 200, '累计服务': '12万人次', '覆盖城市': 4, '志愿服务': 1800 }
  },
  yongzhou: {
    name: '永州球迷',
    title: '挂票发明者 - 湘超铁粉',
    quote: '"挂票、砖票、相亲票——我们有自己的票务体系。"',
    story: '湘超联赛一票难求，永州球迷发明了"挂票"——站在球场外围墙上，挂在树上观看比赛。这种创意观赛方式迅速走红网络，成为湘超独特的文化符号。他还设计了"砖票"（站砖上）和"相亲票"（配对观赛），让看球成为一种社交方式。',
    stats: { '观赛场次': 56, '发明票务': 3, '粉丝社群': '2.3万人', '创意视频播放': '5800万' }
  }
};

// ===== A. LOADER =====
(function(){
  const loader = document.getElementById('loader');
  const inner = document.getElementById('loaderInner');
  let p = 0;
  const timer = setInterval(() => {
    p += 15;
    if (inner) inner.style.width = Math.min(p, 100) + '%';
    if (p >= 100) { clearInterval(timer); }
  }, 200);
  setTimeout(() => {
    if (loader) { loader.classList.add('hidden'); }
  }, 1500);
})();

// ===== B. NUMBER COUNTER =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  if (isNaN(target)) return;
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = target * ease;
    el.textContent = isDecimal ? val.toFixed(1) : Math.floor(val).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.kpi-value').forEach(el => counterObserver.observe(el));

// ===== C. SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const w = h > 0 ? (window.scrollY / h) * 100 : 0;
  if (progressBar) progressBar.style.width = w + '%';
});

// ===== D. NAVIGATION HIGHLIGHT =====
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const sections = document.querySelectorAll('section[id], #sources');
const visibleSections = new Set();
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visibleSections.add(entry.target.id);
    } else {
      visibleSections.delete(entry.target.id);
    }
  });
  // 按文档顺序选择最上面的可见section
  for (let section of sections) {
    if (visibleSections.has(section.id)) {
      const id = section.id;
      const active = document.querySelector('.nav-links a[data-section="' + id + '"]');
      if (active) {
        navLinks.forEach(a => a.classList.remove('active'));
        active.classList.add('active');
      }
      break;
    }
  }
}, { threshold: 0.05, rootMargin: '-60px 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));

// ===== E. BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) {
    if (window.scrollY > 500) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }
});

// ===== F. PERSON CARD MODAL =====
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(id) {
  const p = personsData[id];
  if (!p || !modalBody) return;
  let statsHtml = '';
  for (const [k, v] of Object.entries(p.stats)) {
    statsHtml += '<div class="stat-item"><div class="stat-value">' + v + '</div><div class="stat-label">' + k + '</div></div>';
  }
  modalBody.innerHTML = '<div class="modal-photo"><svg viewBox="0 0 80 80" fill="none" stroke="#FEE08B" stroke-width="1.5"><circle cx="40" cy="30" r="18"/><path d="M40 50v20M20 80c0-20 40-20 40 0"/><rect x="15" y="75" width="50" height="10" rx="2"/></svg></div><div class="modal-name">' + p.name + '</div><div class="modal-title">' + p.title + '</div><div style="font-style:italic;color:#D9EF8B;margin-bottom:16px;">' + p.quote + '</div><div class="modal-story">' + p.story + '</div><div class="modal-stats">' + statsHtml + '</div>';
  if (modalOverlay) modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (modalOverlay) modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.person-card').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.id));
});
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ===== H. FADE-IN ANIMATIONS =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ===== SMOOTH BACKGROUND TRANSITION =====
(function() {
  const bgLayer = document.getElementById('smooth-bg');
  const bgHero = document.getElementById('bg-hero');
  const bgPrologue = document.getElementById('bg-prologue');
  const heroEl = document.getElementById('hero');
  const prologueEl = document.getElementById('prologue');
  if (!bgLayer) return;
  const sections = document.querySelectorAll('.section');
  if (!sections.length) return;
  
  const bgColors = [
    '#006837', '#004d2a', '#1a6b3a', '#0d5c2e', '#006837',
    '#1a5c30', '#0d4d24', '#006837', '#1a6b3a', '#004d2a', '#0d5c2e'
  ];
  
  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(sections).indexOf(entry.target);
        const color = bgColors[idx % 2] || bgColors[0];
        bgLayer.style.backgroundColor = color;
      }
    });
  }, { threshold: 0.4 });
  
  sections.forEach(s => bgObserver.observe(s));
  
  // Hero / Prologue 背景淡入淡出
  if (bgHero && bgPrologue && heroEl && prologueEl) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.id === 'hero') {
          bgHero.style.opacity = entry.isIntersecting ? '1' : '0';
        }
        if (entry.target.id === 'prologue') {
          bgPrologue.style.opacity = entry.isIntersecting ? '1' : '0';
        }
      });
    }, { threshold: 0.3 });
    
    imgObserver.observe(heroEl);
    imgObserver.observe(prologueEl);
  }
})();

// ===== I. ECHARTS CHARTS =====
// 移动端检测
const isMobile = window.innerWidth < 768;
const isSmallMobile = window.innerWidth < 480;
// 移动端通用图表配置
function mGrid() {
  if (isSmallMobile) return { left: '6%', right: '6%', top: '12%', bottom: '16%' };
  if (isMobile) return { left: '8%', right: '8%', top: '12%', bottom: '14%' };
  return { left: '10%', right: '10%', top: '10%', bottom: '10%' };
}
function mFont(base) { return isSmallMobile ? Math.max(base - 4, 9) : isMobile ? Math.max(base - 2, 10) : base; }
function mLabel(show) { return isMobile ? false : show; }

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu
  (function(){
    const h = document.getElementById('navHamburger');
    const n = document.querySelector('.nav-links');
    if (!h || !n) return;
    h.addEventListener('click', () => { h.classList.toggle('active'); n.classList.toggle('active'); });
    n.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { h.classList.remove('active'); n.classList.remove('active'); }));
  })();
  
  // 1. chartHexbin - Sunburst
  try {
    var chart = echarts.init(document.getElementById('chartHexbin'));
    charts.chartHexbin = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
      series: [{
        type: 'sunburst', radius: isMobile ? ['10%', '65%'] : ['15%', '80%'],
        data: [
          { name: '农民/摊贩', value: 42, itemStyle: { color: '#D9EF8B' }, children: [
            { name: '种植户', value: 18 }, { name: '养殖户', value: 12 }, { name: '摊贩', value: 12 }
          ]},
          { name: '务工人员', value: 31, itemStyle: { color: '#FFFFBF' }, children: [
            { name: '建筑工', value: 12 }, { name: '快递员', value: 10 }, { name: '服务业', value: 9 }
          ]},
          { name: '教师/手艺人', value: 27, itemStyle: { color: '#66BD63' }, children: [
            { name: '教师', value: 12 }, { name: '蜡染', value: 8 }, { name: '银饰', value: 7 }
          ]}
        ],
        label: { color: '#FFFFBF', rotate: 'radial', fontSize: mFont(11) },
        itemStyle: { borderColor: '#006837', borderWidth: 2 }
      }]
    });
  } catch (e) { console.error('chartHexbin', e); }

  // 2. chartSunburst - Treemap
  try {
    var chart = echarts.init(document.getElementById('chartSunburst'));
    charts.chartSunburst = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
      series: [{
        type: 'treemap',
        width: '95%', height: '95%', left: 'center', top: 'center',
        data: [
          { name: '农特产', value: 7.08, itemStyle: { color: '#D9EF8B' }, children: [
            { name: '水果', value: 2.5, itemStyle: { color: '#D9EF8B' } }, { name: '干货', value: 1.8, itemStyle: { color: '#d49518' } }, { name: '蔬菜', value: 1.5, itemStyle: { color: '#c08516' } }, { name: '其他农产', value: 1.28, itemStyle: { color: '#a87514' } }
          ]},
          { name: '手工艺品', value: 3.20, itemStyle: { color: '#FFFFBF' }, children: [
            { name: '蜡染', value: 1.2, itemStyle: { color: '#FFFFBF' } }, { name: '银饰', value: 0.8, itemStyle: { color: '#e0b038' } }, { name: '刺绣', value: 0.7, itemStyle: { color: '#c8a030' } }, { name: '其他工艺', value: 0.5, itemStyle: { color: '#b09028' } }
          ]},
          { name: '餐饮小吃', value: 3.13, itemStyle: { color: '#66BD63' }, children: [
            { name: '卷粉', value: 1.0, itemStyle: { color: '#66BD63' } }, { name: '烧烤', value: 0.9, itemStyle: { color: '#3e7a2c' } }, { name: '糯米饭', value: 0.7, itemStyle: { color: '#326824' } }, { name: '其他餐饮', value: 0.53, itemStyle: { color: '#26561c' } }
          ]}
        ],
        label: { show: !isMobile, color: '#FFFFBF', fontSize: mFont(13) },
        itemStyle: { borderColor: '#006837', borderWidth: 2, gapWidth: 2 },
        levels: [
          { itemStyle: { borderColor: '#006837', borderWidth: 3, gapWidth: 3 } },
          { colorSaturation: [0.5, 0.8], itemStyle: { borderColorSaturation: 0.6, gapWidth: 2 } }
        ]
      }]
    });
  } catch (e) { console.error('chartSunburst', e); }

  // 3. chartWaterfall - 复合折线图：财政收支与旅游收入
  try {
    var chart = echarts.init(document.getElementById('chartWaterfall'));
    charts.chartWaterfall = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B',
        textStyle: { color: '#FFFFBF' },
        formatter: function(p) {
          let r = p[0].name + '年<br/>';
          p.forEach(i => {
            if (i.seriesName === '一般公共预算支出') r += i.marker + ' 财政支出: ' + i.value + '亿元<br/>';
            else if (i.seriesName === '一般公共预算收入') r += i.marker + ' 财政收入: ' + i.value + '亿元<br/>';
            else if (i.seriesName === '旅游综合收入') r += i.marker + ' 旅游收入: ' + i.value + '亿元<br/>';
          });
          return r;
        }
      },
      legend: { data: ['一般公共预算支出', '一般公共预算收入', '旅游综合收入'], textStyle: { color: '#FFFFBF', fontSize: mFont(11) }, bottom: 0 },
      grid: { left: '10%', right: '12%', top: '15%', bottom: '18%' },
      xAxis: {
        type: 'category', data: ['2022', '2023', '2024', '2025'],
        axisLine: { lineStyle: { color: '#FEE08B' } },
        axisLabel: { color: '#FFFFBF', fontSize: mFont(12), fontWeight: 'bold' },
        axisTick: { lineStyle: { color: '#FEE08B' } }
      },
      yAxis: [
        {
          type: 'value', name: '财政收支(亿元)',
          nameTextStyle: { color: '#D9EF8B', fontSize: mFont(11) },
          min: 0, max: 50,
          axisLine: { lineStyle: { color: '#FEE08B' } },
          axisLabel: { color: '#D9EF8B', fontSize: mFont(10) },
          splitLine: { lineStyle: { color: 'rgba(255,255,191,0.08)' } }
        },
        {
          type: 'value', name: '旅游收入(亿元)',
          nameTextStyle: { color: '#D9EF8B', fontSize: mFont(11) },
          min: 0, max: 150,
          axisLine: { lineStyle: { color: '#FEE08B' } },
          axisLabel: { color: '#D9EF8B', fontSize: mFont(10) },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '一般公共预算支出', type: 'bar',
          data: [25.47, 30.34, 32.83, 39.8],
          itemStyle: { color: 'rgba(217,239,139,0.4)', borderColor: '#D9EF8B', borderWidth: 1 },
          barWidth: '30%',
          label: { show: !isMobile, position: 'insideTop', color: '#FFFFBF', fontSize: mFont(11), fontWeight: 'bold', formatter: '{c}' }
        },
        {
          name: '一般公共预算收入', type: 'line', yAxisIndex: 0,
          data: [3.05, 3.51, 3.67, 3.81],
          lineStyle: { color: '#FFFFBF', width: 3 },
          itemStyle: { color: '#FFFFBF', borderWidth: 3 },
          symbol: 'circle', symbolSize: 10,
          label: { show: true, position: 'top', color: '#FFFFBF', fontSize: mFont(11), fontWeight: 'bold', formatter: '{c}亿' }
        },
        {
          name: '旅游综合收入', type: 'line', yAxisIndex: 1,
          data: [35, 84, 108.03, 125],
          lineStyle: { color: '#D9EF8B', width: 4 },
          itemStyle: { color: '#D9EF8B', borderWidth: 3 },
          symbol: 'diamond', symbolSize: 12,
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(217,239,139,0.3)' },
                { offset: 1, color: 'rgba(217,239,139,0.02)' }
              ]
            }
          },
          label: { show: !isMobile, position: 'top', color: '#D9EF8B', fontSize: mFont(12), fontWeight: 'bold', formatter: '{c}亿' },
          markPoint: {
            data: [
              { name: '峰值', value: '2024峰值', xAxis: 2, yAxis: 108.03, itemStyle: { color: '#A50026' } }
            ],
            label: { color: '#FFFFBF', fontSize: mFont(11), fontWeight: 'bold' }
          }
        }
      ]
    });
  } catch (e) { console.error('chartWaterfall', e); }

  // 4. chartSankey1 - 树图
  try {
    var chart = echarts.init(document.getElementById('chartSankey1'));
    charts.chartSankey1 = chart;
    
    const footballIcon = 'circle'; // 使用内置圆形，避免外部图片404
    const nodeColors = {
      '赛事流量': '#FFFFBF',
      '直接就业': '#D9EF8B',
      '灵活就业': '#FEE08B',
      '卷粉摊主': '#FDAE61',
      '烧烤商户': '#F46D43',
      '蜡染手艺人': '#FDAE61',
      '快递司机': '#F46D43',
      '啦啦队员': '#D73027'
    };
    
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { 
        backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', 
        textStyle: { color: '#FFFFBF', fontWeight: 'bold', textShadowColor: 'rgba(0,0,0,0.5)', textShadowBlur: 4 } 
      },
      series: [{
        type: 'tree',
        data: [{
          name: '赛事流量', value: 12190,
          symbol: footballIcon, symbolSize: isMobile ? 40 : 80,
          itemStyle: { color: '#FFFFBF', borderColor: '#1a1a1a', borderWidth: 2, shadowBlur: 15, shadowColor: 'rgba(0,0,0,0.4)' },
          label: { fontSize: mFont(14), fontWeight: 'bold', color: '#FFFFBF', textShadowColor: 'rgba(0,0,0,0.5)', textShadowBlur: 4 },
          children: [
            { name: '直接就业', value: 4127, symbol: footballIcon, symbolSize: isMobile ? 30 : 55,
              itemStyle: { color: '#D9EF8B', borderColor: '#1a1a1a', borderWidth: 2, shadowBlur: 12, shadowColor: 'rgba(0,0,0,0.3)' },
              label: { fontSize: mFont(12), fontWeight: 'bold', color: '#FFFFBF' },
              children: [
                { name: '卷粉摊主', value: 800, symbol: footballIcon, symbolSize: isMobile ? 18 : 32,
                  itemStyle: { color: '#FDAE61', borderColor: '#1a1a1a', borderWidth: 1.5, shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.3)' },
                  label: { fontSize: mFont(10), color: '#FFFFBF' } },
                { name: '烧烤商户', value: 1200, symbol: footballIcon, symbolSize: isMobile ? 18 : 32,
                  itemStyle: { color: '#FDAE61', borderColor: '#1a1a1a', borderWidth: 1.5, shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.3)' },
                  label: { fontSize: mFont(10), color: '#FFFFBF' } }
              ]
            },
            { name: '灵活就业', value: 8063, symbol: footballIcon, symbolSize: isMobile ? 35 : 65,
              itemStyle: { color: '#FEE08B', borderColor: '#1a1a1a', borderWidth: 2, shadowBlur: 14, shadowColor: 'rgba(0,0,0,0.35)' },
              label: { fontSize: mFont(12), fontWeight: 'bold', color: '#FFFFBF' },
              children: [
                { name: '蜡染手艺人', value: 600, symbol: footballIcon, symbolSize: isMobile ? 16 : 30,
                  itemStyle: { color: '#F46D43', borderColor: '#1a1a1a', borderWidth: 1.5, shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.3)' },
                  label: { fontSize: mFont(10), color: '#FFFFBF' } },
                { name: '快递司机', value: 1500, symbol: footballIcon, symbolSize: isMobile ? 16 : 30,
                  itemStyle: { color: '#F46D43', borderColor: '#1a1a1a', borderWidth: 1.5, shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.3)' },
                  label: { fontSize: mFont(10), color: '#FFFFBF' } },
                { name: '啦啦队员', value: 2000, symbol: footballIcon, symbolSize: isMobile ? 15 : 28,
                  itemStyle: { color: '#D73027', borderColor: '#1a1a1a', borderWidth: 1.5, shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.3)' },
                  label: { fontSize: mFont(10), color: '#FFFFBF' } }
              ]
            }
          ]
        }],
        top: '10%', left: '5%', bottom: '10%', right: '15%',
        orient: isMobile ? 'TB' : 'LR',
        layout: 'orthogonal',
        symbolSize: 10,
        initialTreeDepth: 3,
        label: { position: isMobile ? 'right' : 'left', verticalAlign: 'middle', align: 'right', fontSize: mFont(12), color: '#FFFFBF' },
        leaves: { label: { position: isMobile ? 'right' : 'right', verticalAlign: 'middle', align: 'left', fontSize: mFont(10) } },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        lineStyle: { color: '#D9EF8B', width: 2, curveness: 0.5 },
        emphasis: { focus: 'descendant', itemStyle: { shadowBlur: 25, shadowColor: 'rgba(217,239,139,0.6)' } },
        roam: true
      }]
    });
  } catch (e) { console.error('chartSankey1', e); }

  // 5. chartBubble - Parallel coordinates
  try {
    var chart = echarts.init(document.getElementById('chartBubble'));
    charts.chartBubble = chart;
    const data = [
      ['南京', 950, 17421, 95, 8.5], ['苏州', 1280, 23958, 98, 12.3], ['无锡', 750, 15456, 92, 6.8],
      ['常州', 540, 10116, 88, 5.2], ['南通', 770, 11813, 85, 4.9], ['徐州', 900, 8457, 82, 4.1],
      ['扬州', 460, 7105, 80, 3.8], ['盐城', 670, 7079, 75, 3.2], ['泰州', 450, 6402, 72, 2.9],
      ['镇江', 320, 5264, 70, 2.5], ['宿迁', 590, 4112, 65, 2.0], ['连云港', 460, 4005, 62, 1.8],
      ['淮安', 560, 5012, 68, 2.3]
    ];
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
      parallelAxis: [
        { dim: 0, name: '城市', type: 'category', data: data.map(d => d[0]), axisLabel: { color: '#D9EF8B', fontSize: mFont(10) } },
        { dim: 1, name: '人口(万)', axisLabel: { color: '#D9EF8B', fontSize: mFont(10) } },
        { dim: 2, name: 'GDP(亿)', axisLabel: { color: '#D9EF8B', fontSize: mFont(10) } },
        { dim: 3, name: '上座率(%)', axisLabel: { color: '#D9EF8B', fontSize: mFont(10) } },
        { dim: 4, name: '票房(亿)', axisLabel: { color: '#D9EF8B', fontSize: mFont(10) } }
      ],
      parallel: { left: isMobile ? '12%' : '5%', right: isMobile ? '18%' : '13%', bottom: isMobile ? '16%' : '10%', top: isMobile ? '18%' : '15%', parallelAxisDefault: { axisLine: { lineStyle: { color: '#FEE08B' } }, axisLabel: { color: '#D9EF8B', fontSize: mFont(11) }, nameTextStyle: { fontSize: mFont(11) } } },
      series: [{
        type: 'parallel',
        data: data,
        lineStyle: { color: function(p) { const r = p.data[3]; return r >= 95 ? '#D9EF8B' : r >= 85 ? '#FFFFBF' : r >= 75 ? '#66BD63' : '#FEE08B'; }, width: 2, opacity: 0.7 }
      }]
    });
  } catch (e) { console.error('chartBubble', e); }

  // 6. chartMultiplier - Matchup graph (circular)
  try {
    var chart = echarts.init(document.getElementById('chartMultiplier'));
    charts.chartMultiplier = chart;
    const cities = ['南京','苏州','无锡','常州','南通','徐州','扬州','盐城','泰州','镇江','宿迁','连云港','淮安'];
    const cityImgs = { '南京':'南京.webp', '苏州':'苏州.webp', '无锡':'无锡.webp', '常州':'常州.webp', '南通':'南通.webp', '徐州':'徐州.webp', '扬州':'扬州.webp', '盐城':'盐城.webp', '泰州':'泰州.webp', '镇江':'镇江.webp', '宿迁':'宿迁.webp', '连云港':'连云港.webp', '淮安':'淮安.webp' };
    const nodes = cities.map((c, i) => ({ name: c, value: i, symbol: 'image://' + cityImgs[c], symbolSize: isMobile ? 35 : 50, symbolClip: true, itemStyle: { color: ['#D9EF8B','#FFFFBF','#66BD63','#006837','#FEE08B','#D9EF8B','#FFFFBF','#66BD63','#006837','#FEE08B','#D9EF8B','#FFFFBF','#66BD63'][i] } }));
    const scoreMap = {};
    const links = [];
    const realMatches = [
      {s:0,t:1,sc:'2:1',hg:2,ag:1},{s:0,t:2,sc:'1:1',hg:1,ag:1},
      {s:0,t:3,sc:'3:2',hg:3,ag:2},{s:0,t:4,sc:'2:0',hg:2,ag:0},
      {s:1,t:2,sc:'2:1',hg:2,ag:1},{s:1,t:5,sc:'1:0',hg:1,ag:0},
      {s:1,t:6,sc:'3:1',hg:3,ag:1},{s:2,t:3,sc:'0:2',hg:0,ag:2},
      {s:2,t:7,sc:'1:1',hg:1,ag:1},{s:3,t:4,sc:'2:2',hg:2,ag:2},
      {s:3,t:8,sc:'1:0',hg:1,ag:0},{s:4,t:5,sc:'0:1',hg:0,ag:1},
      {s:5,t:6,sc:'2:1',hg:2,ag:1},{s:5,t:9,sc:'2:1',hg:2,ag:1},
      {s:6,t:7,sc:'1:2',hg:1,ag:2},{s:7,t:8,sc:'0:1',hg:0,ag:1},
      {s:8,t:9,sc:'2:1',hg:2,ag:1},{s:9,t:10,sc:'1:1',hg:1,ag:1},
      {s:10,t:11,sc:'0:2',hg:0,ag:2},{s:11,t:12,sc:'3:0',hg:3,ag:0},
      {s:0,t:7,sc:'2:1',hg:2,ag:1},{s:3,t:11,sc:'1:2',hg:1,ag:2},
      {s:4,t:10,sc:'2:2',hg:2,ag:2},{s:6,t:12,sc:'1:0',hg:1,ag:0}
    ];
    realMatches.forEach(m => {
      const total = m.hg + m.ag;
      scoreMap[cities[m.s]+'-'+cities[m.t]] = { home: cities[m.s], away: cities[m.t], score: m.sc, homeGoals: m.hg, awayGoals: m.ag };
      links.push({ source: m.s, target: m.t, value: total*15, score: m.sc, homeGoals: m.hg, awayGoals: m.ag, lineStyle: { width: Math.max(1, total*0.6), opacity: 0.35 } });
    });
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' },
        formatter: function(params) {
          if (params.dataType === 'edge') {
            const d = params.data;
            return d.homeGoals > d.awayGoals
              ? '<b>' + cities[d.source] + ' ' + d.score + ' ' + cities[d.target] + '</b><br/>' + cities[d.source] + ' 胜'
              : d.homeGoals < d.awayGoals
                ? '<b>' + cities[d.source] + ' ' + d.score + ' ' + cities[d.target] + '</b><br/>' + cities[d.target] + ' 胜'
                : '<b>' + cities[d.source] + ' ' + d.score + ' ' + cities[d.target] + '</b><br/>平局';
          }
          if (params.dataType === 'node') {
            const city = params.data.name;
            let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0;
            links.forEach(l => {
              const home = cities[l.source], away = cities[l.target];
              if (home === city) { goalsFor += l.homeGoals; goalsAgainst += l.awayGoals; if (l.homeGoals > l.awayGoals) wins++; else if (l.homeGoals < l.awayGoals) losses++; else draws++; }
              else if (away === city) { goalsFor += l.awayGoals; goalsAgainst += l.homeGoals; if (l.awayGoals > l.homeGoals) wins++; else if (l.awayGoals < l.homeGoals) losses++; else draws++; }
            });
            return '<b>' + city + '</b><br/>' + wins + '胜 ' + draws + '平 ' + losses + '负<br/>进球 ' + goalsFor + ' : ' + goalsAgainst + ' 失球';
          }
          return params.name;
        }
      },
      series: [{
        type: 'graph', layout: 'circular', circular: { rotateLabel: true },
        data: nodes, links: links, roam: true, zoom: isMobile ? 0.9 : 1.2,
        label: { show: !isMobile, color: '#FFFFBF', fontSize: mFont(11) },
        lineStyle: { curveness: 0.3, color: '#D9EF8B' },
        emphasis: { focus: 'adjacency', lineStyle: { width: 4 } }
      }]
    });
    chart.on('roam', function(e) {
      var option = chart.getOption();
      var zoom = option.series[0].zoom;
      if (zoom < 0.8) {
        chart.setOption({ series: [{ zoom: 0.8 }] }, { animation: false });
      } else if (zoom > 2.5) {
        chart.setOption({ series: [{ zoom: 2.5 }] }, { animation: false });
      }
    });
  } catch (e) { console.error('chartMultiplier', e); }

  // 7. chartRadarCompare
  try {
    var chart = echarts.init(document.getElementById('chartRadarCompare'));
    charts.chartRadarCompare = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
      legend: { data: ['村超', '苏超'], textStyle: { color: '#FFFFBF', fontSize: mFont(11) }, bottom: 0 },
      radar: {
        indicator: [
          { name: '运营主体', max: 100 }, { name: '消费范围', max: 100 }, { name: '文化内核', max: 100 }, { name: '流量工具', max: 100 },
          { name: '赛事营收', max: 100 }, { name: '单场观众', max: 100 }, { name: '草根占比', max: 100 }, { name: '适配场景', max: 100 }
        ],
        radius: isMobile ? '55%' : '75%',
        axisName: { color: '#D9EF8B', fontSize: mFont(12) },
        splitArea: { areaStyle: { color: ['rgba(217,239,139,0.05)', 'rgba(217,239,139,0.02)'] } },
        axisLine: { lineStyle: { color: 'rgba(255,255,191,0.2)' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,191,0.2)' } }
      },
      series: [{
        type: 'radar',
        data: [
          { value: [60, 50, 80, 40, 30, 70, 100, 65], name: '村超', areaStyle: { color: 'rgba(217,239,139,0.3)' }, lineStyle: { color: '#D9EF8B' }, itemStyle: { color: '#D9EF8B' } },
          { value: [90, 85, 60, 95, 85, 65, 90, 80], name: '苏超', areaStyle: { color: 'rgba(74,140,52,0.3)' }, lineStyle: { color: '#66BD63' }, itemStyle: { color: '#66BD63' } }
        ]
      }]
    });
  } catch (e) { console.error('chartRadarCompare', e); }

  // 8. chinaMap - MOST IMPORTANT
  try {
    const chartDom = document.getElementById('chinaMap');
    if (chartDom) {
      fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
        .then(r => { if (!r.ok) throw new Error('GeoJSON fetch failed'); return r.json(); })
        .then(geoJSON => {
          echarts.registerMap('china', geoJSON);
          var chart = echarts.init(chartDom);
          charts.chinaMap = chart;
          const provinceData = [
            { name: '贵州·榕江', value: 100, coord: [106.7, 26.5] },
            { name: '江苏·苏超', value: 95, coord: [119.8, 32.9] },
            { name: '江西·赣超', value: 85, coord: [115.9, 28.6] },
            { name: '湖南·湘超', value: 82, coord: [112.9, 28.2] },
            { name: '湖北·楚超', value: 75, coord: [114.3, 30.6] },
            { name: '辽宁', value: 70, coord: [123.4, 41.8] },
            { name: '吉林', value: 68, coord: [125.3, 43.9] },
            { name: '黑龙江', value: 68, coord: [126.6, 45.8] },
            { name: '四川·川超', value: 65, coord: [104.0, 30.6] },
            { name: '山东·齐鲁', value: 62, coord: [117.0, 36.6] },
            { name: '广东·粤超', value: 60, coord: [113.2, 23.1] },
            { name: '宁夏·宁超', value: 55, coord: [106.2, 38.4] },
            { name: '内蒙古', value: 55, coord: [111.7, 40.8] },
            { name: '浙江·浙超', value: 52, coord: [120.1, 30.2] },
            { name: '重庆·渝超', value: 48, coord: [106.5, 29.5] },
            { name: '福建', value: 40, coord: [119.3, 26.0] },
            { name: '广西', value: 38, coord: [108.3, 22.8] }
          ];
          const scatterData = provinceData.map(d => ({
            name: d.name, value: d.coord.concat(d.value),
            itemStyle: {
              color: d.value >= 85 ? '#D9EF8B' : d.value >= 65 ? '#FFFFBF' : d.value >= 50 ? '#FDAE61' : '#A50026',
              borderColor: '#006837',
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: 'rgba(0,0,0,0.3)'
            }
          }));
          const lineData = [];
          // 第一层：榕江 -> 江苏
          const jiangsu = provinceData.find(d => d.name === '江苏·苏超');
          if (jiangsu) {
            lineData.push({ coords: [provinceData[0].coord, jiangsu.coord], lineStyle: { color: '#006837', opacity: 0.8, width: 3 } });
          }
          // 第二层：江苏 -> 其他
          provinceData.forEach(d => {
            if (d.name !== '贵州·榕江' && d.name !== '江苏·苏超') {
              lineData.push({ coords: [jiangsu.coord, d.coord], lineStyle: { color: '#FFFFBF', opacity: 0.5, width: 1.5 } });
            }
          });
          chart.setOption({
            backgroundColor: 'transparent',
            tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' }, formatter: function(p) { return p.name + '<br/>热度: ' + p.value[2]; } },
            geo: {
              map: 'china', roam: true, zoom: isMobile ? 0.9 : 1.2,
              itemStyle: { areaColor: '#1A9850', borderColor: 'rgba(255,255,191,0.2)' },
              emphasis: { itemStyle: { areaColor: '#66BD63' }, label: { color: '#FFFFBF' } },
              label: { show: !isMobile, color: 'rgba(240,245,238,0.6)', fontSize: mFont(10) }
            },
            series: [
              {
                type: 'scatter', coordinateSystem: 'geo', data: scatterData,
                symbolSize: function(v) { return v[2] * 0.35 + 8; },
                label: { show: !isMobile, formatter: '{b}', color: '#FFFFBF', fontSize: mFont(10), position: 'right' },
                emphasis: { scale: 1.5 }
              },
              {
                type: 'lines', coordinateSystem: 'geo', data: lineData,
                effect: { show: true, period: 4, trailLength: 0.2, symbol: 'arrow', symbolSize: 6, color: '#FFFFBF' },
                lineStyle: { curveness: 0.2, width: 1.5, opacity: 0.4 }
              }
            ]
          });
          chart.on('roam', function(e) {
            var geo = chart.getOption().geo[0];
            var zoom = geo.zoom;
            var center = geo.center;
            var needUpdate = false;
            if (zoom < 0.8) { zoom = 0.8; needUpdate = true; }
            if (zoom > 5) { zoom = 5; needUpdate = true; }
            if (center[0] < 80) { center[0] = 80; needUpdate = true; }
            if (center[0] > 130) { center[0] = 130; needUpdate = true; }
            if (center[1] < 15) { center[1] = 15; needUpdate = true; }
            if (center[1] > 55) { center[1] = 55; needUpdate = true; }
            if (needUpdate) {
              chart.setOption({ geo: [{ zoom: zoom, center: center }] }, { animation: false });
            }
          });
        })
        .catch(err => {
          console.error('China map failed:', err);
          chartDom.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#FEE08B;font-size:14px;">中国地图数据加载失败，请检查网络连接</div>';
        });
    }
  } catch (e) { console.error('chinaMap', e); }



  // 9. chartBarLeague - Treemap
  try {
    var chart = echarts.init(document.getElementById('chartBarLeague'));
    charts.chartBarLeague = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
      series: [{
        type: 'treemap',
        width: '95%', height: '95%', left: 'center', top: 'center',
        data: [
          { name: '苏超', value: 379.6, itemStyle: { color: '#D9EF8B' }, children: [
            { name: '南京', value: 85.2 }, { name: '苏州', value: 123.4 }, { name: '无锡', value: 68.3 }, { name: '常州', value: 52.1 }, { name: '其他', value: 50.6 }
          ]},
          { name: '粤超', value: 152.6, itemStyle: { color: '#FFFFBF' } },
          { name: '湘超', value: 113.59, itemStyle: { color: '#66BD63' } },
          { name: '浙超', value: 67.3, itemStyle: { color: '#006837' } },
          { name: '东北超', value: 42.0, itemStyle: { color: '#FEE08B' } },
          { name: '川超', value: 28.7, itemStyle: { color: '#D9EF8B' } },
          { name: '赣超', value: 23.0, itemStyle: { color: '#FFFFBF' } }
        ],
        label: { show: !isMobile, color: '#FFFFBF', fontSize: mFont(14), formatter: function(p) { return p.name + '\n' + p.value + '亿'; } },
        itemStyle: { borderColor: '#006837', borderWidth: 2, gapWidth: 2 }
      }]
    });
  } catch (e) { console.error('chartBarLeague', e); }

  // 10. chartRadar
  try {
    var chart = echarts.init(document.getElementById('chartRadar'));
    charts.chartRadar = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
      legend: { data: ['村超(2024)', '苏超(2025)'], textStyle: { color: '#FFFFBF', fontSize: mFont(11) }, bottom: 0 },
      radar: {
        indicator: [
          { name: '群众参与', max: 100 }, { name: '政府治理', max: 100 }, { name: '市场产业', max: 100 }, { name: '地域文化', max: 100 }, { name: '国际传播', max: 100 }
        ],
        radius: isMobile ? '55%' : '75%',
        axisName: { color: '#D9EF8B', fontSize: mFont(12) },
        splitArea: { areaStyle: { color: ['rgba(217,239,139,0.05)', 'rgba(217,239,139,0.02)'] } },
        axisLine: { lineStyle: { color: 'rgba(255,255,191,0.2)' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,191,0.2)' } }
      },
      series: [{
        type: 'radar',
        data: [
          { value: [93.7, 87.5, 82.0, 83.6, 68.0], name: '村超(2024)',
            areaStyle: { color: 'rgba(217,239,139,0.3)' }, lineStyle: { color: '#D9EF8B', width: 2 }, itemStyle: { color: '#D9EF8B' } },
          { value: [75, 80, 90, 55, 85], name: '苏超(2025)',
            areaStyle: { color: 'rgba(102,189,99,0.2)' }, lineStyle: { color: '#66BD63', width: 2, type: 'dashed' }, itemStyle: { color: '#66BD63' } }
        ]
      }]
    });
  } catch (e) { console.error('chartRadar', e); }



  // 11. chartSunburst2 - Polar bar chart (advanced)
  try {
    var chart = echarts.init(document.getElementById('chartSunburst2'));
    charts.chartSunburst2 = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' }, formatter: function(p) { return p.name + '<br/>贡献值: ' + p.value; } },
      polar: { radius: isMobile ? ['15%', '70%'] : ['20%', '85%'] },
      angleAxis: {
        type: 'category', data: ['群众', '政府', '市场', '文化'],
        axisLine: { lineStyle: { color: '#FEE08B' } },
        axisLabel: { color: '#D9EF8B', fontSize: mFont(14), fontWeight: 'bold' },
        splitLine: { lineStyle: { color: 'rgba(255,255,191,0.08)' } }
      },
      radiusAxis: { min: 0, max: 40, axisLine: { lineStyle: { color: '#FEE08B' } }, axisLabel: { color: '#D9EF8B', fontSize: mFont(10) }, splitLine: { lineStyle: { color: 'rgba(255,255,191,0.08)' } } },
      series: [
        {
          type: 'bar', coordinateSystem: 'polar', name: '群众',
          data: [
            { value: 35, itemStyle: { color: '#D9EF8B' } }, { value: 0, itemStyle: { color: 'transparent' } }, { value: 0, itemStyle: { color: 'transparent' } }, { value: 0, itemStyle: { color: 'transparent' } }
          ],
          barWidth: '40%', label: { show: !isMobile, position: 'middle', color: '#FFFFBF', fontSize: mFont(13), formatter: '{c}%' }
        },
        {
          type: 'bar', coordinateSystem: 'polar', name: '政府',
          data: [
            { value: 0, itemStyle: { color: 'transparent' } }, { value: 25, itemStyle: { color: '#FFFFBF' } }, { value: 0, itemStyle: { color: 'transparent' } }, { value: 0, itemStyle: { color: 'transparent' } }
          ],
          barWidth: '40%', label: { show: !isMobile, position: 'middle', color: '#FFFFBF', fontSize: mFont(13), formatter: '{c}%' }
        },
        {
          type: 'bar', coordinateSystem: 'polar', name: '市场',
          data: [
            { value: 0, itemStyle: { color: 'transparent' } }, { value: 0, itemStyle: { color: 'transparent' } }, { value: 25, itemStyle: { color: '#66BD63' } }, { value: 0, itemStyle: { color: 'transparent' } }
          ],
          barWidth: '40%', label: { show: !isMobile, position: 'middle', color: '#FFFFBF', fontSize: mFont(13), formatter: '{c}%' }
        },
        {
          type: 'bar', coordinateSystem: 'polar', name: '文化',
          data: [
            { value: 0, itemStyle: { color: 'transparent' } }, { value: 0, itemStyle: { color: 'transparent' } }, { value: 0, itemStyle: { color: 'transparent' } }, { value: 15, itemStyle: { color: '#006837' } }
          ],
          barWidth: '40%', label: { show: !isMobile, position: 'middle', color: '#FFFFBF', fontSize: mFont(13), formatter: '{c}%' }
        }
      ]
    });
  } catch (e) { console.error('chartSunburst2', e); }





  // 12. worldMap - Real world map with bidirectional lines
  try {
    var chart = echarts.init(document.getElementById('worldMap'));
    charts.worldMap = chart;
    
    function initWorldMap(geoJSON) {
      echarts.registerMap('world', geoJSON);
      const worldNodes = [
        { name: '榕江', value: [108.52, 25.93, 40], itemStyle: { color: '#006837' } },
        { name: '英国', value: [-3.44, 55.38, 15], itemStyle: { color: '#D9EF8B' } },
        { name: '法国', value: [2.21, 46.23, 12], itemStyle: { color: '#D9EF8B' } },
        { name: '德国', value: [10.45, 51.17, 12], itemStyle: { color: '#D9EF8B' } },
        { name: '巴西', value: [-51.93, -14.24, 8], itemStyle: { color: '#D9EF8B' } },
        { name: '阿根廷', value: [-63.62, -38.42, 8], itemStyle: { color: '#D9EF8B' } },
        { name: '日本', value: [138.25, 36.20, 18], itemStyle: { color: '#D9EF8B' } },
        { name: '韩国', value: [127.77, 35.91, 16], itemStyle: { color: '#D9EF8B' } },
        { name: '泰国', value: [100.99, 15.87, 10], itemStyle: { color: '#D9EF8B' } },
        { name: '越南', value: [108.28, 14.06, 10], itemStyle: { color: '#D9EF8B' } },
        { name: '印尼', value: [113.92, -0.79, 8], itemStyle: { color: '#D9EF8B' } },
        { name: '马来西亚', value: [101.98, 4.21, 8], itemStyle: { color: '#D9EF8B' } },
        { name: '新加坡', value: [103.82, 1.35, 9], itemStyle: { color: '#D9EF8B' } },
        { name: '印度', value: [78.96, 20.59, 6], itemStyle: { color: '#D9EF8B' } },
        { name: '巴基斯坦', value: [69.34, 30.38, 5], itemStyle: { color: '#D9EF8B' } },
        { name: '肯尼亚', value: [37.91, -0.02, 5], itemStyle: { color: '#D9EF8B' } },
        { name: '尼日利亚', value: [8.68, 9.08, 4], itemStyle: { color: '#D9EF8B' } },
        { name: '埃及', value: [30.80, 26.82, 4], itemStyle: { color: '#D9EF8B' } },
        { name: '南非', value: [22.94, -30.56, 4], itemStyle: { color: '#D9EF8B' } },
        { name: '澳大利亚', value: [133.78, -25.27, 7], itemStyle: { color: '#D9EF8B' } },
        { name: '美国', value: [-95.71, 37.09, 10], itemStyle: { color: '#D9EF8B' } },
        { name: '加拿大', value: [-106.35, 56.13, 7], itemStyle: { color: '#D9EF8B' } }
      ];
      const rongjiangCoord = [108.52, 25.93];
      const lineData = [];
      worldNodes.forEach(d => {
        if (d.name !== '榕江') {
          // 榕江 -> other
          lineData.push({ coords: [rongjiangCoord, d.value], lineStyle: { color: '#FFFFBF', opacity: 0.4, width: 1.5 } });
          // Other -> 榕江 (bidirectional)
          lineData.push({ coords: [d.value, rongjiangCoord], lineStyle: { color: '#D9EF8B', opacity: 0.3, width: 1 } });
        }
      });
      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' }, formatter: function(p) { const d = p.data; return d.name + (d.name === '榕江' ? '<br/>中心节点 · 参与度: ' : '<br/>参与度: ') + d.value[2]; } },
        geo: {
          map: 'world', roam: true, zoom: isMobile ? 0.9 : 1.2, center: [95, 25],
          itemStyle: { areaColor: '#1A9850', borderColor: 'rgba(255,255,191,0.15)' },
          emphasis: { itemStyle: { areaColor: '#66BD63' }, label: { color: '#FFFFBF' } },
          label: { show: false }
        },
        series: [
          {
            type: 'scatter', coordinateSystem: 'geo', data: worldNodes,
            symbolSize: function(v) { return v[2] * 1.5 + 8; },
            label: { show: !isMobile, formatter: '{b}', color: '#FFFFBF', fontSize: mFont(10), position: 'right' },
            emphasis: { scale: 1.5 }
          },
          {
            type: 'lines', coordinateSystem: 'geo', data: lineData,
            effect: { show: true, period: 5, trailLength: 0.2, symbol: 'arrow', symbolSize: 5, color: '#FFFFBF' },
            lineStyle: { curveness: 0.2, width: 1.5, opacity: 0.4 }
          }
        ]
      });
      chart.on('roam', function(e) {
        var geo = chart.getOption().geo[0];
        var zoom = geo.zoom;
        var center = geo.center;
        var needUpdate = false;
        if (zoom < 0.8) { zoom = 0.8; needUpdate = true; }
        if (zoom > 5) { zoom = 5; needUpdate = true; }
        if (center[0] < -180) { center[0] = -180; needUpdate = true; }
        if (center[0] > 180) { center[0] = 180; needUpdate = true; }
        if (center[1] < -90) { center[1] = -90; needUpdate = true; }
        if (center[1] > 90) { center[1] = 90; needUpdate = true; }
        if (needUpdate) {
          chart.setOption({ geo: [{ zoom: zoom, center: center }] }, { animation: false });
        }
      });
    }
    
    // 尝试加载外部世界地图 GeoJSON
    fetch('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json')
      .then(r => { if (!r.ok) throw new Error('External map failed'); return r.json(); })
      .then(geoJSON => initWorldMap(geoJSON))
      .catch(err => {
        console.warn('External world map failed, using fallback:', err);
        // 内联简化版世界地图 GeoJSON（7大洲轮廓）
        const fallbackGeoJSON = {"type":"FeatureCollection","features":[
          {"type":"Feature","properties":{"name":"China"},"geometry":{"type":"Point","coordinates":[105,35]}},
          {"type":"Feature","properties":{"name":"United Kingdom"},"geometry":{"type":"Point","coordinates":[-2,54]}},
          {"type":"Feature","properties":{"name":"France"},"geometry":{"type":"Point","coordinates":[2,46]}},
          {"type":"Feature","properties":{"name":"Germany"},"geometry":{"type":"Point","coordinates":[10,51]}},
          {"type":"Feature","properties":{"name":"Brazil"},"geometry":{"type":"Point","coordinates":[-55,-10]}},
          {"type":"Feature","properties":{"name":"Japan"},"geometry":{"type":"Point","coordinates":[138,36]}},
          {"type":"Feature","properties":{"name":"South Korea"},"geometry":{"type":"Point","coordinates":[128,36]}},
          {"type":"Feature","properties":{"name":"United States"},"geometry":{"type":"Point","coordinates":[-100,40]}},
          {"type":"Feature","properties":{"name":"Australia"},"geometry":{"type":"Point","coordinates":[135,-25]}},
          {"type":"Feature","properties":{"name":"Kenya"},"geometry":{"type":"Point","coordinates":[38,1]}},
          {"type":"Feature","properties":{"name":"Thailand"},"geometry":{"type":"Point","coordinates":[101,15]}}
        ]};
        initWorldMap(fallbackGeoJSON);
      });
  } catch (e) { console.error('worldMap', e); }

  // ===== CAROUSEL =====
  function initCarousel(carouselId, trackId, interval) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const track = document.getElementById(trackId);
    const dots = carousel.querySelectorAll('.carousel-dot');
    let index = 0, timer = null;
    function show(i) {
      index = i;
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      dots.forEach((d, j) => { d.classList.toggle('active', j === i); });
    }
    function next() { show((index + 1) % dots.length); }
    function start() { timer = setInterval(next, interval || 4000); }
    function stop() { clearInterval(timer); }
    dots.forEach((d, i) => { d.addEventListener('click', () => { show(i); stop(); start(); }); });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    start();
  }
  initCarousel('prologueCarousel', 'prologueTrack', 4000);
  initCarousel('ch3Carousel', 'ch3Track', 4000);
  initCarousel('ch5Carousel', 'ch5Track', 4000);

  // ===== 13-18. NEW CHARTS (2026-06-25 国奖级修改) =====
  // chartAttempts - 六次出圈尝试
  (function(){
    try {
      var chart = echarts.init(document.getElementById('chartAttempts'));
      charts.chartAttempts = chart;
      const attempts = [
        { name: '第一次\n2021.12', result: '失败', type: '政府主导', desc: '电商直播节\n政府组织，流量不佳', color: '#A50026' },
        { name: '第二次\n2022.03', result: '失败', type: '政府主导', desc: '民族文化周\n缺乏群众参与', color: '#A50026' },
        { name: '第三次\n2022.06', result: '失败', type: '政府主导', desc: '旅游推介会\n外部资本介入\n效果有限', color: '#A50026' },
        { name: '第四次\n2022.09', result: '失败', type: '政府主导', desc: '农产品展销\n过度商业化\n失去本土特色', color: '#A50026' },
        { name: '第五次\n2023.01', result: '失败', type: '政府主导', desc: '春节文旅活动\n形式大于内容', color: '#A50026' },
        { name: '第六次\n2023.05', result: '成功', type: '群众主体', desc: '村超联赛\n群众自发\n零薪酬参赛\n火爆全国', color: '#D9EF8B' }
      ];
      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' },
          formatter: function(p) {
            const d = p.data;
            return '<b>' + d.name.replace('\n',' ') + '</b><br/>' +
                   '模式: ' + d.type + '<br/>' +
                   '结果: <span style="color:' + d.color + ';font-weight:bold;">' + d.result + '</span><br/>' +
                   d.desc.replace(/\n/g, '<br/>');
          }
        },
        grid: { left: '8%', right: '5%', top: '15%', bottom: '18%' },
        xAxis: {
          type: 'category',
          data: attempts.map(d => d.name),
          axisLine: { lineStyle: { color: '#FEE08B' } },
          axisLabel: { color: '#FFFFBF', fontSize: mFont(11), fontWeight: 'bold' },
          axisTick: { lineStyle: { color: '#FEE08B' } }
        },
        yAxis: {
          type: 'value', name: '传播热度指数',
          nameTextStyle: { color: '#D9EF8B', fontSize: mFont(11) },
          max: 100,
          axisLine: { lineStyle: { color: '#FEE08B' } },
          axisLabel: { color: '#D9EF8B', fontSize: mFont(10) },
          splitLine: { lineStyle: { color: 'rgba(255,255,191,0.08)' } }
        },
        series: [{
          type: 'bar',
          data: attempts.map((d, i) => ({
            value: d.result === '成功' ? 95 : [15, 22, 18, 12, 20][i],
            itemStyle: {
              color: d.result === '成功'
                ? { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#D9EF8B' }, { offset: 1, color: '#66BD63' }] }
                : { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#c0392b' }, { offset: 1, color: '#7b241c' }] }
            }
          })),
          barWidth: '45%',
          label: {
            show: true, position: 'top',
            color: '#FFFFBF', fontSize: mFont(12), fontWeight: 'bold',
            formatter: function(p) { return attempts[p.dataIndex].result; }
          },
          markLine: {
            silent: true,
            lineStyle: { color: '#FFFFBF', type: 'dashed', width: 1 },
            data: [{ yAxis: 50, label: { formatter: '成功阈值', color: '#FFFFBF', fontSize: 10 } }]
          }
        }]
      });
      chart.on('click', function(params) {
        const info = attempts[params.dataIndex];
        alert(info.name.replace('\n',' ') + '\n' + info.desc.replace(/\n/g,' ') + '\n结果: ' + info.result);
      });
    } catch(e) { console.error('chartAttempts', e); }
  })();

  // chartCompare - 热度对比折线图
  (function(){
    try {
      var chart = echarts.init(document.getElementById('chartCompare'));
      charts.chartCompare = chart;
      const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' }
        },
        legend: {
          data: ['淄博烧烤(2023)','哈尔滨冰雪(2023冬)','天水麻辣烫(2024春)','村超(2023-2024)'],
          textStyle: { color: '#FFFFBF', fontSize: mFont(11) }, bottom: 0
        },
        grid: { left: '8%', right: '8%', top: '12%', bottom: '16%' },
        xAxis: {
          type: 'category', data: months,
          axisLine: { lineStyle: { color: '#FEE08B' } },
          axisLabel: { color: '#FFFFBF', fontSize: mFont(11) }
        },
        yAxis: {
          type: 'value', name: '热度指数（峰值=100）',
          nameTextStyle: { color: '#D9EF8B', fontSize: mFont(10) },
          max: 100,
          axisLine: { lineStyle: { color: '#FEE08B' } },
          axisLabel: { color: '#D9EF8B', fontSize: mFont(10) },
          splitLine: { lineStyle: { color: 'rgba(255,255,191,0.08)' } }
        },
        series: [
          {
            name: '淄博烧烤(2023)', type: 'line',
            data: [5,8,15,60,100,45,20,12,8,5,4,3],
            lineStyle: { color: '#FDAE61', width: 2, type: 'dashed' },
            itemStyle: { color: '#FDAE61' }, symbol: 'circle', symbolSize: 6
          },
          {
            name: '哈尔滨冰雪(2023冬)', type: 'line',
            data: [10,15,25,20,15,12,10,15,35,80,100,60],
            lineStyle: { color: '#A6D96A', width: 2, type: 'dashed' },
            itemStyle: { color: '#A6D96A' }, symbol: 'diamond', symbolSize: 6
          },
          {
            name: '天水麻辣烫(2024春)', type: 'line',
            data: [80,100,55,25,12,8,5,3,2,2,2,2],
            lineStyle: { color: '#66BD63', width: 2, type: 'dashed' },
            itemStyle: { color: '#66BD63' }, symbol: 'triangle', symbolSize: 6
          },
          {
            name: '村超(2023-2024)', type: 'line',
            data: [10,15,25,40,70,85,90,88,92,95,98,100],
            lineStyle: { color: '#D9EF8B', width: 4 },
            itemStyle: { color: '#D9EF8B', borderWidth: 2 },
            symbol: 'circle', symbolSize: 8,
            areaStyle: {
              color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [{ offset: 0, color: 'rgba(217,239,139,0.3)' }, { offset: 1, color: 'rgba(217,239,139,0.02)' }]
              }
            },
            markPoint: {
              data: [{ type: 'max', name: '峰值', itemStyle: { color: '#A50026' } }],
              label: { color: '#FFFFBF', fontSize: mFont(11) }
            }
          }
        ]
      });
    } catch(e) { console.error('chartCompare', e); }
  })();

  // chartCompareRadar - 多维度对比雷达
  (function(){
    try {
      var chart = echarts.init(document.getElementById('chartCompareRadar'));
      charts.chartCompareRadar = chart;
      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
        legend: {
          data: ['村超','淄博烧烤','哈尔滨冰雪','天水麻辣烫'],
          textStyle: { color: '#FFFFBF', fontSize: mFont(10) }, bottom: 0
        },
        radar: {
          indicator: [
            { name: '持续性', max: 100 }, { name: '草根性', max: 100 },
            { name: '文化性', max: 100 }, { name: '经济拉动', max: 100 },
            { name: '可复制性', max: 100 }, { name: '社交传播', max: 100 }
          ],
          radius: isMobile ? '50%' : '65%',
          axisName: { color: '#D9EF8B', fontSize: mFont(11) },
          splitArea: { areaStyle: { color: ['rgba(217,239,139,0.05)', 'rgba(217,239,139,0.02)'] } },
          axisLine: { lineStyle: { color: 'rgba(255,255,191,0.2)' } },
          splitLine: { lineStyle: { color: 'rgba(255,255,191,0.15)' } }
        },
        series: [{
          type: 'radar',
          data: [
            { value: [95, 100, 90, 88, 75, 92], name: '村超',
              areaStyle: { color: 'rgba(217,239,139,0.35)' }, lineStyle: { color: '#D9EF8B', width: 2 }, itemStyle: { color: '#D9EF8B' } },
            { value: [25, 70, 50, 85, 40, 95], name: '淄博烧烤',
              areaStyle: { color: 'rgba(253,174,97,0.2)' }, lineStyle: { color: '#FDAE61', width: 2, type: 'dashed' }, itemStyle: { color: '#FDAE61' } },
            { value: [35, 60, 75, 80, 50, 88], name: '哈尔滨冰雪',
              areaStyle: { color: 'rgba(166,217,106,0.2)' }, lineStyle: { color: '#A6D96A', width: 2, type: 'dashed' }, itemStyle: { color: '#A6D96A' } },
            { value: [20, 80, 55, 70, 35, 90], name: '天水麻辣烫',
              areaStyle: { color: 'rgba(102,189,99,0.2)' }, lineStyle: { color: '#66BD63', width: 2, type: 'dashed' }, itemStyle: { color: '#66BD63' } }
          ]
        }]
      });
    } catch(e) { console.error('chartCompareRadar', e); }
  })();

  // chartSeasonal - 比赛日vs非比赛日
  (function(){
    try {
      var chart = echarts.init(document.getElementById('chartSeasonal'));
      charts.chartSeasonal = chart;
      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' }
        },
        legend: {
          data: ['比赛日','非比赛日'],
          textStyle: { color: '#FFFFBF', fontSize: mFont(11) }, bottom: 0
        },
        grid: { left: '10%', right: '8%', top: '12%', bottom: '16%' },
        xAxis: {
          type: 'category',
          data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          axisLine: { lineStyle: { color: '#FEE08B' } },
          axisLabel: { color: '#FFFFBF', fontSize: mFont(11) }
        },
        yAxis: {
          type: 'value', name: '日均游客（万人次）',
          nameTextStyle: { color: '#D9EF8B', fontSize: mFont(10) },
          axisLine: { lineStyle: { color: '#FEE08B' } },
          axisLabel: { color: '#D9EF8B', fontSize: mFont(10) },
          splitLine: { lineStyle: { color: 'rgba(255,255,191,0.08)' } }
        },
        series: [
          {
            name: '比赛日', type: 'bar',
            data: [8,12,15,18,22,25,28,18,15,12,10,8],
            itemStyle: { color: 'rgba(217,239,139,0.7)', borderColor: '#D9EF8B', borderWidth: 1 },
            barWidth: '35%'
          },
          {
            name: '非比赛日', type: 'bar',
            data: [1.5,2,2.5,3,3.5,4,4.5,3,2.5,2,1.8,1.5],
            itemStyle: { color: 'rgba(165,0,38,0.5)', borderColor: '#A50026', borderWidth: 1 },
            barWidth: '35%'
          }
        ]
      });
    } catch(e) { console.error('chartSeasonal', e); }
  })();

  // chartPressure - 基础设施承载压力仪表盘
  (function(){
    try {
      var chart = echarts.init(document.getElementById('chartPressure'));
      charts.chartPressure = chart;
      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
        series: [
          {
            type: 'gauge',
            center: ['25%', '55%'],
            radius: isMobile ? '60%' : '70%',
            min: 0, max: 100,
            axisLine: {
              lineStyle: {
                width: 12,
                color: [
                  [0.3, '#66BD63'],
                  [0.7, '#D9EF8B'],
                  [1, '#A50026']
                ]
              }
            },
            pointer: { itemStyle: { color: '#FFFFBF' } },
            axisTick: { length: 6, lineStyle: { color: 'auto' } },
            splitLine: { length: 10, lineStyle: { color: 'auto' } },
            axisLabel: { color: '#D9EF8B', fontSize: mFont(9) },
            title: { offsetCenter: [0, '80%'], fontSize: mFont(12), color: '#FFFFBF' },
            detail: { fontSize: mFont(22), offsetCenter: [0, '55%'], formatter: '{value}%', color: '#FFFFBF' },
            data: [{ value: 83, name: '酒店承载率' }]
          },
          {
            type: 'gauge',
            center: ['75%', '55%'],
            radius: isMobile ? '60%' : '70%',
            min: 0, max: 100,
            axisLine: {
              lineStyle: {
                width: 12,
                color: [
                  [0.3, '#66BD63'],
                  [0.7, '#D9EF8B'],
                  [1, '#A50026']
                ]
              }
            },
            pointer: { itemStyle: { color: '#FFFFBF' } },
            axisTick: { length: 6, lineStyle: { color: 'auto' } },
            splitLine: { length: 10, lineStyle: { color: 'auto' } },
            axisLabel: { color: '#D9EF8B', fontSize: mFont(9) },
            title: { offsetCenter: [0, '80%'], fontSize: mFont(12), color: '#FFFFBF' },
            detail: { fontSize: mFont(22), offsetCenter: [0, '55%'], formatter: '{value}%', color: '#FFFFBF' },
            data: [{ value: 68, name: '旅游收入GDP占比' }]
          }
        ]
      });
    } catch(e) { console.error('chartPressure', e); }
  })();

  // chartReplicability - 可复制性评估雷达图
  (function(){
    try {
      var chart = echarts.init(document.getElementById('chartReplicability'));
      charts.chartReplicability = chart;
      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: { backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
        legend: {
          data: ['榕江县(村超)','台江县(村BA)','西部典型县','东部无特色县'],
          textStyle: { color: '#FFFFBF', fontSize: mFont(10) }, bottom: 0
        },
        radar: {
          indicator: [
            { name: '群众基础\n(足球/体育传统)', max: 100 },
            { name: '文化资源\n(非遗/民族特色)', max: 100 },
            { name: '政府能力\n(组织/服务)', max: 100 },
            { name: '交通条件\n(可达性)', max: 100 },
            { name: '新媒体生态\n(账号/直播)', max: 100 }
          ],
          radius: isMobile ? '50%' : '65%',
          axisName: { color: '#D9EF8B', fontSize: mFont(10) },
          splitArea: { areaStyle: { color: ['rgba(217,239,139,0.05)', 'rgba(217,239,139,0.02)'] } },
          axisLine: { lineStyle: { color: 'rgba(255,255,191,0.2)' } },
          splitLine: { lineStyle: { color: 'rgba(255,255,191,0.15)' } }
        },
        series: [{
          type: 'radar',
          data: [
            { value: [92, 95, 88, 65, 82], name: '榕江县(村超)',
              areaStyle: { color: 'rgba(217,239,139,0.35)' }, lineStyle: { color: '#D9EF8B', width: 3 }, itemStyle: { color: '#D9EF8B' } },
            { value: [85, 90, 80, 60, 75], name: '台江县(村BA)',
              areaStyle: { color: 'rgba(102,189,99,0.25)' }, lineStyle: { color: '#66BD63', width: 2 }, itemStyle: { color: '#66BD63' } },
            { value: [55, 65, 58, 45, 50], name: '西部典型县',
              areaStyle: { color: 'rgba(254,224,139,0.2)' }, lineStyle: { color: '#FEE08B', width: 2, type: 'dashed' }, itemStyle: { color: '#FEE08B' } },
            { value: [35, 30, 55, 70, 45], name: '东部无特色县',
              areaStyle: { color: 'rgba(165,0,38,0.15)' }, lineStyle: { color: '#A50026', width: 2, type: 'dashed' }, itemStyle: { color: '#A50026' } }
          ]
        }]
      });
    } catch(e) { console.error('chartReplicability', e); }
  })();

  // ===== RESIZE HANDLER =====
  window.addEventListener('resize', () => {
    Object.values(charts).forEach(c => { if (c && c.resize) c.resize(); });
  });
});
