import re, json, os

FILE = r'D:\素材库\2026数据新闻\村超\数据新闻coding-v3-kimi\sjxwpage-v3\index.html'

with open(FILE, 'r', encoding='utf-8') as f:
    html = f.read()

# ===== 1. CSS MODIFICATIONS =====

# 1.1 Story text: larger, centered
old_story = """.story-text { font-size: 16px; color: var(--text2); max-width: 800px; line-height: 2; margin-bottom: 24px; }"""
new_story = """.story-text { font-size: 18px; color: var(--text2); max-width: 900px; line-height: 2; margin-bottom: 24px; text-align: center; margin-left: auto; margin-right: auto; }"""
html = html.replace(old_story, new_story)

# 1.2 Add interaction hint style
hint_style = """
/* Interaction hint */
.hint-text { font-size: 12px; color: var(--text3); text-align: center; margin-top: 8px; font-style: italic; }
"""
html = html.replace("/* Responsive */", hint_style + "\n/* Responsive */")

# 1.3 Hero title calligraphy font
old_hero_title = """.hero-title { font-size: 64px; font-weight: 850; color: var(--text); margin-bottom: 16px; letter-spacing: 4px; }"""
new_hero_title = """.hero-title { font-size: 72px; font-weight: 850; color: var(--text); margin-bottom: 16px; letter-spacing: 8px; font-family: "Ma Shan Zheng", "ZCOOL XiaoWei", "STKaiti", "KaiTi", serif; }"""
html = html.replace(old_hero_title, new_hero_title)

# 1.4 Add Google Fonts for calligraphy
old_font_link = """<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>"""
new_font_link = """<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>\n<link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">"""
html = html.replace(old_font_link, new_font_link)

# ===== 2. HERO SECTION =====
# Remove DATA STORY 2026 badge, remove 19 province KPI, keep others
old_hero = """<!-- Hero Section -->
<section id="hero">
  <div class="hero-content">
    <div class="hero-badge section-badge">DATA STORY 2026</div>
    <h1 class="hero-title">踢出"超"时代</h1>
    <p class="hero-subtitle">中国草根足球联赛的万里长传</p>
    <div class="kpi-grid" style="max-width: 900px; margin: 40px auto 0;">
      <div class="kpi-card"><div class="kpi-value" data-count="607">0</div><div class="kpi-label">草根球员</div></div>
      <div class="kpi-card"><div class="kpi-value" data-count="19">0</div><div class="kpi-label">省份联赛</div></div>
      <div class="kpi-card"><div class="kpi-value" data-count="12.7">0</div><div class="kpi-unit">万</div><div class="kpi-label">参赛球员</div></div>
      <div class="kpi-card"><div class="kpi-value" data-count="2300">0</div><div class="kpi-unit">万</div><div class="kpi-label">接待游客</div></div>
      <div class="kpi-card"><div class="kpi-value" data-count="880">0</div><div class="kpi-unit">亿</div><div class="kpi-label">综合消费</div></div>
    </div>
    <div class="hero-scroll">
      <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    </div>
  </div>
</section>"""

new_hero = """<!-- Hero Section -->
<section id="hero">
  <div class="hero-content">
    <h1 class="hero-title">踢出"超"时代</h1>
    <p class="hero-subtitle">中国草根足球联赛的万里长传</p>
    <div class="kpi-grid" style="max-width: 900px; margin: 40px auto 0;">
      <div class="kpi-card"><div class="kpi-value" data-count="607">0</div><div class="kpi-label">草根球员</div></div>
      <div class="kpi-card"><div class="kpi-value" data-count="12.7">0</div><div class="kpi-unit">万</div><div class="kpi-label">参赛球员</div></div>
      <div class="kpi-card"><div class="kpi-value" data-count="2300">0</div><div class="kpi-unit">万</div><div class="kpi-label">接待游客</div></div>
      <div class="kpi-card"><div class="kpi-value" data-count="880">0</div><div class="kpi-unit">亿</div><div class="kpi-label">综合消费</div></div>
    </div>
    <div class="hero-scroll">
      <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    </div>
  </div>
</section>"""
html = html.replace(old_hero, new_hero)

# ===== 3. PROLOGUE: Replace with Huang Guofeng story (left photo, right text) =====
old_prologue = """<!-- Prologue -->
<section id="prologue" class="section">
  <div class="section-badge">PROLOGUE</div>
  <h2 class="section-title">从洪水中归来</h2>
  <p class="section-subtitle">2025年6月，榕江，一场特大洪峰改变了一切</p>
  
  <div class="carousel" id="prologueCarousel">
    <div class="carousel-track" id="carouselTrack">
      <div class="carousel-item">
        <svg viewBox="0 0 100 100"><rect x="10" y="20" width="80" height="40" rx="4" fill="none" stroke="#8da680" stroke-width="2"/><text x="50" y="50" text-anchor="middle" fill="#8da680" font-size="10">洪水淹没球场</text></svg>
      </div>
      <div class="carousel-item">
        <svg viewBox="0 0 100 100"><rect x="10" y="20" width="80" height="40" rx="4" fill="none" stroke="#8da680" stroke-width="2"/><text x="50" y="50" text-anchor="middle" fill="#8da680" font-size="10">全民清淤抢修</text></svg>
      </div>
      <div class="carousel-item">
        <svg viewBox="0 0 100 100"><rect x="10" y="20" width="80" height="40" rx="4" fill="none" stroke="#8da680" stroke-width="2"/><text x="50" y="50" text-anchor="middle" fill="#8da680" font-size="10">感恩专场复赛</text></svg>
      </div>
    </div>
    <div class="carousel-dots">
      <div class="carousel-dot active" data-index="0"></div>
      <div class="carousel-dot" data-index="1"></div>
      <div class="carousel-dot" data-index="2"></div>
    </div>
  </div>
  
  <div class="story-text">
    <p>2025年6月下旬，贵州榕江一周内连续遭遇两次特大洪峰，河水漫过河道，淤泥铺满村超整片足球场，看台与市集摊位全部被洪水浸泡，这个火遍全网的草根赛场近乎沦为废墟。</p>
    <p>没人想到，仅仅一个月后，清淤修复、全民抢工同步完成，7月26日村超感恩专场如期复赛，18万民众涌入小城，球场重新亮起灯光。</p>
    <p>榕江县县委书记徐勃曾说，村超从来不是一座球场，而是38.5万榕江人共同的"一团火"。杀猪的、卷粉摊主、蜡染手艺人、普通教师，无数普通人白天谋生，傍晚奔赴赛场；这场泥地里诞生的民间赛事，在洪灾考验后愈发坚韧，一脚开出跨越全国的时代长传。</p>
  </div>
  
  <div class="person-cards" id="prologuePersons">
    <div class="person-card" data-id="huang">
      <div class="person-card-photo">
        <svg viewBox="0 0 80 80" fill="none" stroke="#8da680" stroke-width="1.5"><circle cx="40" cy="30" r="18"/><path d="M40 50v20M20 80c0-20 40-20 40 0"/><rect x="15" y="75" width="50" height="10" rx="2"/></svg>
      </div>
      <div class="person-card-info">
        <div class="person-card-name">黄国锋</div>
        <div class="person-card-title">卷粉摊主 - 金靴射手</div>
        <div class="person-card-quote">"足球不只能锻炼身体，更能教他合作、坚持和尊重。"</div>
      </div>
    </div>
  </div>
</section>"""

new_prologue = """<!-- Prologue -->
<section id="prologue" class="section">
  <div class="section-badge">PROLOGUE</div>
  <h2 class="section-title">从洪水中归来</h2>
  <p class="section-subtitle">2025年6月，榕江，一场特大洪峰改变了一切</p>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;margin:40px 0;max-width:1000px;margin-left:auto;margin-right:auto;">
    <div style="background:linear-gradient(135deg, var(--bg-card), var(--bg-hover));border-radius:16px;height:400px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.15);">
      <svg viewBox="0 0 80 80" fill="none" stroke="#8da680" stroke-width="1.5" style="width:120px;height:120px;opacity:0.3;"><circle cx="40" cy="30" r="18"/><path d="M40 50v20M20 80c0-20 40-20 40 0"/><rect x="15" y="75" width="50" height="10" rx="2"/></svg>
    </div>
    <div style="text-align:left;">
      <div style="font-size:14px;color:var(--text3);margin-bottom:8px;">人物故事</div>
      <div style="font-size:28px;color:var(--gold);font-weight:700;margin-bottom:4px;">黄国锋</div>
      <div style="font-size:15px;color:var(--text3);margin-bottom:16px;">卷粉摊主 · 金靴射手</div>
      <div style="font-size:18px;color:var(--text2);line-height:2;">
        <p style="margin-bottom:12px;">黄国锋，36岁，榕江忠诚村村民。每日凌晨四点起床磨米浆、备卷粉食材，守着街边小摊维持全家生计；下午收摊即刻换上球衣，站上村超绿茵赛场。</p>
        <p style="margin-bottom:12px;">2023年首届村超赛事中，他13场打进15球，拿下赛事金靴，进球视频获卡卡、范志毅两大足坛球星在社交平台点赞转发。</p>
        <p>如今他兼任古州镇第四小学足球顾问，每天放学后带着乡村孩子踢球育人。"足球不只能锻炼身体，更能教他合作、坚持和尊重。"</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px;">
        <div style="background:rgba(232,168,32,0.08);padding:12px;border-radius:8px;text-align:center;"><div style="font-size:24px;color:var(--gold);font-weight:700;">15</div><div style="font-size:12px;color:var(--text3);">金靴进球</div></div>
        <div style="background:rgba(232,168,32,0.08);padding:12px;border-radius:8px;text-align:center;"><div style="font-size:24px;color:var(--gold);font-weight:700;">13</div><div style="font-size:12px;color:var(--text3);">参赛场次</div></div>
      </div>
    </div>
  </div>
  
  <div class="story-text">
    <p>2025年6月下旬，贵州榕江一周内连续遭遇两次特大洪峰，河水漫过河道，淤泥铺满村超整片足球场，看台与市集摊位全部被洪水浸泡，这个火遍全网的草根赛场近乎沦为废墟。</p>
    <p>没人想到，仅仅一个月后，清淤修复、全民抢工同步完成，7月26日村超感恩专场如期复赛，18万民众涌入小城，球场重新亮起灯光。</p>
    <p>杀猪的、卷粉摊主、蜡染手艺人、普通教师，无数普通人白天谋生，傍晚奔赴赛场；这场泥地里诞生的民间赛事，在洪灾考验后愈发坚韧，一脚开出跨越全国的时代长传。</p>
  </div>
</section>"""
html = html.replace(old_prologue, new_prologue)

# ===== 4. CHAPTER 1: Change charts, add Xu Bo story inline =====
# 4.1 Player distribution: bar -> sunburst
old_hexbin = """  <div class="chart-container">
    <div class="chart-title">球员职业分布（六边形分箱图）</div>
    <div class="chart-desc">607名草根球员，农民/摊贩占42%，务工人员31%，教师/手艺人27%</div>
    <div id="chartHexbin" style="width:100%;height:400px;"></div>
  </div>"""
new_hexbin = """  <div class="chart-container">
    <div class="chart-title">球员职业分布（旭日图）</div>
    <div class="chart-desc">607名草根球员，农民/摊贩占42%，务工人员31%，教师/手艺人27%</div>
    <div id="chartHexbin" style="width:100%;height:400px;"></div>
    <div class="hint-text">点击扇区查看细分数据</div>
  </div>"""
html = html.replace(old_hexbin, new_hexbin)

# 4.2 Market revenue: sunburst -> treemap
old_sunburst = """  <div class="chart-container">
    <div class="chart-title">市集营收构成（旭日图）</div>
    <div class="chart-desc">三年赛场市集总营收13.41亿元，90%以上收益流向本地小微经营者</div>
    <div id="chartSunburst" style="width:100%;height:400px;"></div>
  </div>"""
new_sunburst = """  <div class="chart-container">
    <div class="chart-title">市集营收构成（矩形树图）</div>
    <div class="chart-desc">三年赛场市集总营收13.41亿元，90%以上收益流向本地小微经营者</div>
    <div id="chartSunburst" style="width:100%;height:400px;"></div>
    <div class="hint-text">悬停查看各类目营收金额</div>
  </div>"""
html = html.replace(old_sunburst, new_sunburst)

# 4.3 Employment: sankey -> force graph
old_sankey = """  <div class="chart-container">
    <div class="chart-title">就业带动桑基图</div>
    <div class="chart-desc">赛事流量 &rarr; 直接就业4127人 &rarr; 灵活就业8063人 &rarr; 总受益12190人</div>
    <div id="chartSankey1" style="width:100%;height:400px;"></div>
  </div>"""
new_sankey = """  <div class="chart-container">
    <div class="chart-title">就业带动关系网络</div>
    <div class="chart-desc">赛事流量带动直接就业4127人、灵活就业8063人，总受益12190人</div>
    <div id="chartSankey1" style="width:100%;height:400px;"></div>
    <div class="hint-text">拖动节点调整布局，悬停查看带动人数</div>
  </div>"""
html = html.replace(old_sankey, new_sankey)

# 4.4 Add Xu Bo inline story before person cards
old_ch1_persons = """  <h3 style="font-size:20px;color:var(--gold);margin-top:48px;margin-bottom:16px;">人物故事</h3>
  <div class="person-cards" id="ch1Persons">
    <div class="person-card" data-id="xubo">
      <div class="person-card-photo">
        <svg viewBox="0 0 80 80" fill="none" stroke="#8da680" stroke-width="1.5"><circle cx="40" cy="30" r="18"/><path d="M40 50v20M20 80c0-20 40-20 40 0"/><rect x="15" y="75" width="50" height="10" rx="2"/></svg>
      </div>
      <div class="person-card-info">
        <div class="person-card-name">徐勃</div>
        <div class="person-card-title">榕江县委书记</div>
        <div class="person-card-quote">"答案就是38.5万榕江人民，每个人都是参与者。"</div>
      </div>
    </div>
  </div>
</section>"""

new_ch1_persons = """  <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;margin:48px 0;max-width:1000px;margin-left:auto;margin-right:auto;">
    <div style="text-align:left;">
      <div style="font-size:14px;color:var(--text3);margin-bottom:8px;">人物故事</div>
      <div style="font-size:28px;color:var(--gold);font-weight:700;margin-bottom:4px;">徐勃</div>
      <div style="font-size:15px;color:var(--text3);margin-bottom:16px;">榕江县委书记</div>
      <div style="font-size:18px;color:var(--text2);line-height:2;">
        <p style="margin-bottom:12px;">徐勃是榕江县委书记，把村超比作一团火。当问及背后是否有高人时，他的答案出人意料：没有专业操盘团队，没有外来资本造势，答案就是38.5万榕江人民。</p>
        <p>赛场周边528支民间啦啦队自发排练侗族大歌、苗族芦笙舞，中场表演全由村民自主编排。政府始终补位不越位，把赛场舞台完整交给民众。</p>
      </div>
      <div style="font-style:italic;color:var(--gold);margin-top:16px;padding-left:16px;border-left:3px solid var(--gold);">"答案就是38.5万榕江人民，每个人都是参与者。"</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px;">
        <div style="background:rgba(232,168,32,0.08);padding:12px;border-radius:8px;text-align:center;"><div style="font-size:24px;color:var(--gold);font-weight:700;">38.5万</div><div style="font-size:12px;color:var(--text3);">榕江人口</div></div>
        <div style="background:rgba(232,168,32,0.08);padding:12px;border-radius:8px;text-align:center;"><div style="font-size:24px;color:var(--gold);font-weight:700;">528</div><div style="font-size:12px;color:var(--text3);">民间啦啦队</div></div>
      </div>
    </div>
    <div style="background:linear-gradient(135deg, var(--bg-card), var(--bg-hover));border-radius:16px;height:400px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.15);">
      <svg viewBox="0 0 80 80" fill="none" stroke="#8da680" stroke-width="1.5" style="width:120px;height:120px;opacity:0.3;"><circle cx="40" cy="30" r="18"/><path d="M40 50v20M20 80c0-20 40-20 40 0"/><rect x="15" y="75" width="50" height="10" rx="2"/></svg>
    </div>
  </div>
</section>"""
html = html.replace(old_ch1_persons, new_ch1_persons)

# ===== 5. CHAPTER 2: Change bubble chart, delete multiplier, add matchup =====
# 5.1 Bubble chart -> parallel coordinates
old_bubble = """  <div class="chart-container">
    <div class="chart-title">苏超13城市四维气泡图</div>
    <div class="chart-desc">X轴=人口(万) · Y轴=GDP(亿) · 气泡大小=票房(亿) · 颜色=上座率</div>
    <div id="chartBubble" style="width:100%;height:400px;"></div>
  </div>"""
new_bubble = """  <div class="chart-container">
    <div class="chart-title">苏超13城市多维平行坐标</div>
    <div class="chart-desc">人口、GDP、上座率、票房四维数据并行对比</div>
    <div id="chartBubble" style="width:100%;height:400px;"></div>
    <div class="hint-text">拖动坐标轴刷选范围，悬停查看城市数据</div>
  </div>"""
html = html.replace(old_bubble, new_bubble)

# 5.2 Delete multiplier chart entirely
old_multiplier = """  <div class="chart-container">
    <div class="chart-title">票根消费乘数对比（气泡乘数图）</div>
    <div class="chart-desc">苏超1:7.3 · 湘超1:6.1 · 赣超1:5.2 · 东北超1:4.8</div>
    <div id="chartMultiplier" style="width:100%;height:400px;"></div>
  </div>"""
new_multiplier = """  <div class="chart-container">
    <div class="chart-title">苏超十三太保对阵图</div>
    <div class="chart-desc">13城市循环赛制对阵关系可视化</div>
    <div id="chartMultiplier" style="width:100%;height:400px;"></div>
    <div class="hint-text">悬停查看城市间胜负关系与上座数据</div>
  </div>"""
html = html.replace(old_multiplier, new_multiplier)

# ===== 6. CHAPTER 3: Map lines, delete heatmap+chord, change bar, add logos/wordcloud/carousel =====
# 6.1 Modify map lines: Rongjiang -> Jiangsu -> others
# We need to update the chinaMap JS code. Let's find and replace the lineData logic.
old_map_lines = """          const lineData = provinceData.filter(d => d.name !== '贵州·榕江').map(d => ({
            coords: [provinceData[0].coord, d.coord],
            lineStyle: { color: d.name === '江苏·苏超' ? '#e05020' : '#f5c842', opacity: 0.6 }
          }));"""
new_map_lines = """          const lineData = [];
          // 第一层：榕江 -> 江苏
          const jiangsu = provinceData.find(d => d.name === '江苏·苏超');
          if (jiangsu) {
            lineData.push({ coords: [provinceData[0].coord, jiangsu.coord], lineStyle: { color: '#e05020', opacity: 0.8, width: 3 } });
          }
          // 第二层：江苏 -> 其他
          provinceData.forEach(d => {
            if (d.name !== '贵州·榕江' && d.name !== '江苏·苏超') {
              lineData.push({ coords: [jiangsu.coord, d.coord], lineStyle: { color: '#f5c842', opacity: 0.5, width: 1.5 } });
            }
          });"""
html = html.replace(old_map_lines, new_map_lines)

# 6.2 Delete heatmap chart container
old_heatmap = """  <div class="chart-container">
    <div class="chart-title">19省热度指数矩阵（热力图）</div>
    <div class="chart-desc">颜色越深热度越高，从贵州起源地向全国扩散</div>
    <div id="chartHeatmap" style="width:100%;height:400px;"></div>
  </div>"""
html = html.replace(old_heatmap, "")

# 6.3 Delete chord chart container
old_chord = """  <div class="chart-container">
    <div class="chart-title">四大区域赛事互动（和弦图）</div>
    <div class="chart-desc">东部/中部/北方/西南四大赛区互动频次</div>
    <div id="chartChord" style="width:100%;height:400px;"></div>
  </div>"""
html = html.replace(old_chord, "")

# 6.4 Bar chart -> treemap/sankey advanced
old_barleague = """  <div class="chart-container">
    <div class="chart-title">重点省级联赛数据汇总</div>
    <div class="chart-desc">全赛季2100场 · 2800万观众 · 620亿播放 · 880亿综合消费</div>
    <div id="chartBarLeague" style="width:100%;height:400px;"></div>
  </div>"""
new_barleague = """  <div class="chart-container">
    <div class="chart-title">重点省级联赛数据汇总（矩形树图）</div>
    <div class="chart-desc">全赛季2100场 · 2800万观众 · 620亿播放 · 880亿综合消费</div>
    <div id="chartBarLeague" style="width:100%;height:400px;"></div>
    <div class="hint-text">面积大小代表综合消费规模，颜色深浅代表赛事热度</div>
  </div>"""
html = html.replace(old_barleague, new_barleague)

# 6.5 Add 19省超 logos, wordcloud, carousel after barleague
old_ch3_persons = """  <h3 style="font-size:20px;color:var(--gold);margin-top:48px;margin-bottom:16px;">人物故事</h3>
  <div class="person-cards" id="ch3Persons">"""
new_ch3_content = """  <div class="chart-container" style="margin-top:48px;">
    <div class="chart-title">19省超联赛 Logo 展示</div>
    <div class="chart-desc">从苏超到湘超，从赣超到东北超，全国草根联赛品牌矩阵</div>
    <div id="leagueLogos" style="width:100%;height:300px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px;padding:16px;">
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">苏超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">湘超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">赣超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">东北超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">川超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">浙超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">粤超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">楚超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">齐鲁</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">渝超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">宁超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">闽超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">桂超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">陕超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">晋超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">冀超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">皖超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">黔超</div>
      <div style="width:100px;height:100px;background:linear-gradient(135deg,#1a3a1a,#2d5a1e);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.2);font-size:14px;color:var(--gold);font-weight:700;">陇超</div>
    </div>
    <div class="hint-text">悬停查看各联赛关键数据</div>
  </div>
  
  <div class="chart-container">
    <div class="chart-title">出圈爆梗词云</div>
    <div class="chart-desc">从全网话题中提取各省联赛高频热梗</div>
    <div id="memeWordCloud" style="width:100%;height:300px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;padding:24px;">
      <span style="font-size:32px;color:#e8a820;font-weight:bold;">挂票</span>
      <span style="font-size:28px;color:#f0f5ee;font-weight:bold;">十三太保</span>
      <span style="font-size:26px;color:#4a8c34;font-weight:bold;">砖票</span>
      <span style="font-size:24px;color:#f5c842;font-weight:bold;">相亲票</span>
      <span style="font-size:22px;color:#e8a820;font-weight:bold;">苏大强</span>
      <span style="font-size:20px;color:#f0f5ee;font-weight:bold;">湘军出征</span>
      <span style="font-size:18px;color:#4a8c34;font-weight:bold;">赣劲十足</span>
      <span style="font-size:17px;color:#f5c842;font-weight:bold;">东北虎</span>
      <span style="font-size:16px;color:#e8a820;font-weight:bold;">川渝火锅局</span>
      <span style="font-size:15px;color:#f0f5ee;font-weight:bold;">粤来粤好</span>
      <span style="font-size:14px;color:#4a8c34;font-weight:bold;">齐鲁德比</span>
      <span style="font-size:13px;color:#f5c842;font-weight:bold;">楚云飞</span>
      <span style="font-size:12px;color:#e8a820;font-weight:bold;">浙样精彩</span>
      <span style="font-size:11px;color:#f0f5ee;font-weight:bold;">闽将当先</span>
      <span style="font-size:10px;color:#4a8c34;font-weight:bold;">桂在参与</span>
    </div>
  </div>
  
  <div class="carousel" id="ch3Carousel" style="margin-top:48px;">
    <div class="carousel-track" id="ch3Track">
      <div class="carousel-item">
        <svg viewBox="0 0 100 100"><rect x="10" y="20" width="80" height="40" rx="4" fill="none" stroke="#8da680" stroke-width="2"/><text x="50" y="50" text-anchor="middle" fill="#8da680" font-size="10">各省联赛精彩瞬间</text></svg>
      </div>
      <div class="carousel-item">
        <svg viewBox="0 0 100 100"><rect x="10" y="20" width="80" height="40" rx="4" fill="none" stroke="#8da680" stroke-width="2"/><text x="50" y="50" text-anchor="middle" fill="#8da680" font-size="10">球迷文化现场</text></svg>
      </div>
      <div class="carousel-item">
        <svg viewBox="0 0 100 100"><rect x="10" y="20" width="80" height="40" rx="4" fill="none" stroke="#8da680" stroke-width="2"/><text x="50" y="50" text-anchor="middle" fill="#8da680" font-size="10">地方特色非遗展演</text></svg>
      </div>
    </div>
    <div class="carousel-dots">
      <div class="carousel-dot active" data-index="0"></div>
      <div class="carousel-dot" data-index="1"></div>
      <div class="carousel-dot" data-index="2"></div>
    </div>
  </div>
  
  <h3 style="font-size:20px;color:var(--gold);margin-top:48px;margin-bottom:16px;">人物故事</h3>
  <div class="person-cards" id="ch3Persons">"""
html = html.replace(old_ch3_persons, new_ch3_content)

# ===== 7. CHAPTER 4: Delete wordcloud, change sunburst to matrix =====
old_wordcloud = """  <div class="chart-container">
    <div class="chart-title">赛事关键词云</div>
    <div class="chart-desc">从全网话题中提取高频关键词，字体大小与词频成正比</div>
    <div id="chartWordCloud" style="width:100%;height:400px;"></div>
  </div>"""
html = html.replace(old_wordcloud, "")

old_sunburst2 = """  <div class="chart-container">
    <div class="chart-title">四力贡献占比（旭日图）</div>
    <div class="chart-desc">群众提供原生热爱与参与深度 · 政府筑牢规则底线与服务保障 · 市场完成流量民生双向转化 · 文化塑造赛事差异化内核</div>
    <div id="chartSunburst2" style="width:100%;height:400px;"></div>
  </div>"""
new_sunburst2 = """  <div class="chart-container">
    <div class="chart-title">四力贡献矩阵</div>
    <div class="chart-desc">群众35% · 政府25% · 市场25% · 文化15% — 四力耦合矩阵</div>
    <div id="chartSunburst2" style="width:100%;height:400px;"></div>
    <div class="hint-text">悬停查看各力细分指标</div>
  </div>"""
html = html.replace(old_sunburst2, new_sunburst2)

# ===== 8. CHAPTER 5: Timeline->图文, Pyramid->逻辑图文, WorldMap->真实 map =====
old_timeline = """  <div class="chart-container">
    <div class="chart-title">国际化三步走（时间线气泡图）</div>
    <div class="chart-desc">从12国到43国，再到全球80+国家——草根足球的万里长传</div>
    <div id="chartTimeline" style="width:100%;height:400px;"></div>
  </div>"""
new_timeline = """  <div class="chart-container" style="padding:32px;">
    <div class="chart-title">国际化三步走</div>
    <div class="chart-desc">从12国到43国，再到全球80+国家——草根足球的万里长传</div>
    <div id="chartTimeline" style="width:100%;height:400px;position:relative;">
      <div style="position:absolute;left:0;top:50%;width:100%;height:2px;background:linear-gradient(90deg, #e8a820, #f5c842, #4a8c34);"></div>
      <div style="position:absolute;left:10%;top:30%;transform:translateX(-50%);text-align:center;">
        <div style="width:16px;height:16px;background:#e8a820;border-radius:50%;margin:0 auto 8px;"></div>
        <div style="font-size:14px;color:var(--gold);font-weight:700;">2023</div>
        <div style="font-size:12px;color:var(--text2);width:120px;">首届村超联赛</div>
      </div>
      <div style="position:absolute;left:30%;top:60%;transform:translateX(-50%);text-align:center;">
        <div style="width:20px;height:20px;background:#f5c842;border-radius:50%;margin:0 auto 8px;"></div>
        <div style="font-size:14px;color:var(--gold);font-weight:700;">2024</div>
        <div style="font-size:12px;color:var(--text2);width:120px;">首届国际友谊赛<br/>12国参与</div>
      </div>
      <div style="position:absolute;left:50%;top:25%;transform:translateX(-50%);text-align:center;">
        <div style="width:24px;height:24px;background:#e8a820;border-radius:50%;margin:0 auto 8px;"></div>
        <div style="font-size:14px;color:var(--gold);font-weight:700;">2025</div>
        <div style="font-size:12px;color:var(--text2);width:120px;">一带一路友谊赛<br/>25国参与</div>
      </div>
      <div style="position:absolute;left:70%;top:55%;transform:translateX(-50%);text-align:center;">
        <div style="width:20px;height:20px;background:#f5c842;border-radius:50%;margin:0 auto 8px;"></div>
        <div style="font-size:14px;color:var(--gold);font-weight:700;">2026</div>
        <div style="font-size:12px;color:var(--text2);width:120px;">六国邀请赛<br/>43国友谊赛</div>
      </div>
      <div style="position:absolute;left:90%;top:30%;transform:translateX(-50%);text-align:center;">
        <div style="width:28px;height:28px;background:#e05020;border-radius:50%;margin:0 auto 8px;box-shadow:0 0 20px rgba(224,80,32,0.5);"></div>
        <div style="font-size:16px;color:var(--gold);font-weight:700;">2028</div>
        <div style="font-size:13px;color:var(--text2);width:140px;font-weight:700;">村超世界杯<br/>80+国家参与</div>
      </div>
    </div>
  </div>"""
html = html.replace(old_timeline, new_timeline)

old_pyramid = """  <div class="chart-container">
    <div class="chart-title">四级赛事体系金字塔</div>
    <div class="chart-desc">村镇联赛 &rarr; 市域联赛 &rarr; 省级联赛 &rarr; 全国总决赛</div>
    <div id="chartPyramid" style="width:100%;height:400px;"></div>
  </div>"""
new_pyramid = """  <div class="chart-container" style="padding:32px;">
    <div class="chart-title">四级赛事体系</div>
    <div class="chart-desc">村镇联赛 &rarr; 市域联赛 &rarr; 省级联赛 &rarr; 全国总决赛</div>
    <div id="chartPyramid" style="width:100%;height:400px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">
      <div style="width:200px;background:linear-gradient(135deg, #e8a820, #f5c842);padding:20px 24px;border-radius:12px;text-align:center;box-shadow:0 8px 24px rgba(232,168,32,0.2);">
        <div style="font-size:28px;color:#0a1f0a;font-weight:850;">19</div>
        <div style="font-size:14px;color:#0a1f0a;font-weight:700;">全国总决赛</div>
        <div style="font-size:12px;color:#0a1f0a;opacity:0.8;">年度巅峰对决</div>
      </div>
      <div style="width:320px;background:linear-gradient(135deg, #f5c842, #4a8c34);padding:20px 24px;border-radius:12px;text-align:center;box-shadow:0 8px 24px rgba(245,200,66,0.2);">
        <div style="font-size:28px;color:#0a1f0a;font-weight:850;">2100</div>
        <div style="font-size:14px;color:#0a1f0a;font-weight:700;">省级联赛</div>
        <div style="font-size:12px;color:#0a1f0a;opacity:0.8;">19省赛季总场次</div>
      </div>
      <div style="width:440px;background:linear-gradient(135deg, #4a8c34, #8da680);padding:20px 24px;border-radius:12px;text-align:center;box-shadow:0 8px 24px rgba(74,140,52,0.2);">
        <div style="font-size:28px;color:#0a1f0a;font-weight:850;">3400</div>
        <div style="font-size:14px;color:#0a1f0a;font-weight:700;">市域联赛</div>
        <div style="font-size:12px;color:#0a1f0a;opacity:0.8;">284地级市覆盖</div>
      </div>
      <div style="width:560px;background:linear-gradient(135deg, #8da680, #2d5a1e);padding:20px 24px;border-radius:12px;text-align:center;box-shadow:0 8px 24px rgba(141,166,128,0.2);">
        <div style="font-size:28px;color:#f0f5ee;font-weight:850;">1200</div>
        <div style="font-size:14px;color:#f0f5ee;font-weight:700;">村镇联赛</div>
        <div style="font-size:12px;color:#f0f5ee;opacity:0.8;">1.2万支基层球队的源头活水</div>
      </div>
    </div>
  </div>"""
html = html.replace(old_pyramid, new_pyramid)

old_worldmap = """  <div class="map-wrapper">
    <div class="chart-title" style="padding:16px 16px 0;">全球来榕江 — 国际足球交流网络</div>
    <div class="chart-desc" style="padding:0 16px 16px;">50余国传播覆盖 · 12亿海外播放 · 43国友谊赛参与</div>
    <div id="worldMap" style="width:100%;height:480px;"></div>
  </div>"""
new_worldmap = """  <div class="map-wrapper">
    <div class="chart-title" style="padding:16px 16px 0;">全球来榕江 — 国际足球交流网络</div>
    <div class="chart-desc" style="padding:0 16px 16px;">50余国传播覆盖 · 12亿海外播放 · 43国友谊赛参与</div>
    <div id="worldMap" style="width:100%;height:480px;"></div>
    <div class="hint-text" style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);">双向箭头代表文化交流与友谊赛往来</div>
  </div>"""
html = html.replace(old_worldmap, new_worldmap)

# ===== 9. EPILOGUE: Add new section before sources =====
old_sources = """<!-- Data Sources -->
<section id="sources">"""
new_epilogue = """<!-- Epilogue -->
<section id="epilogue" class="section" style="text-align:center;">
  <div class="section-badge">EPILOGUE</div>
  <h2 class="section-title" style="margin-bottom:40px;">一脚跨越山海</h2>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;max-width:1000px;margin:0 auto;">
    <div style="background:linear-gradient(135deg, var(--bg-card), var(--bg-hover));border-radius:16px;height:400px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(232,168,32,0.15);">
      <svg viewBox="0 0 80 80" fill="none" stroke="#8da680" stroke-width="1.5" style="width:120px;height:120px;opacity:0.3;"><circle cx="40" cy="30" r="18"/><path d="M40 50v20M20 80c0-20 40-20 40 0"/><rect x="15" y="75" width="50" height="10" rx="2"/></svg>
    </div>
    <div style="text-align:left;">
      <div style="font-size:18px;color:var(--text2);line-height:2;">
        <p style="margin-bottom:16px;">无数平凡中国人在赛场内外的故事，拼凑出草根足球的对外表达：</p>
        <p style="margin-bottom:16px;">不靠球星造势，不靠资本包装，以普通人的热爱为纽带，让乡土足球走出大山。</p>
        <p>2028村超世界杯，便是这一脚跨越山海的时代万里长传。</p>
      </div>
    </div>
  </div>
</section>

<!-- Data Sources -->
<section id="sources">"""
html = html.replace(old_sources, new_epilogue)

# ===== 10. JS CHART MODIFICATIONS =====

# 10.1 chartHexbin: bar -> sunburst
old_js_hexbin = """  // 1. chartHexbin - Bar chart
  try {
    var chart = echarts.init(document.getElementById('chartHexbin'));
    charts.chartHexbin = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      xAxis: { type: 'category', data: ['农民/摊贩', '务工人员', '教师/手艺人'], axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' } },
      yAxis: { type: 'value', max: 50, axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0', formatter: '{value}%' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } } },
      series: [{
        type: 'bar', data: [
          { value: 42, itemStyle: { color: '#e8a820' } },
          { value: 31, itemStyle: { color: '#f5c842' } },
          { value: 27, itemStyle: { color: '#4a8c34' } }
        ], barWidth: '50%', label: { show: true, position: 'top', color: '#f0f5ee', formatter: '{c}%' }
      }]
    });
  } catch (e) { console.error('chartHexbin', e); }"""

new_js_hexbin = """  // 1. chartHexbin - Sunburst
  try {
    var chart = echarts.init(document.getElementById('chartHexbin'));
    charts.chartHexbin = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'sunburst', radius: ['15%', '80%'],
        data: [
          { name: '农民/摊贩', value: 42, itemStyle: { color: '#e8a820' }, children: [
            { name: '种植户', value: 18 }, { name: '养殖户', value: 12 }, { name: '摊贩', value: 12 }
          ]},
          { name: '务工人员', value: 31, itemStyle: { color: '#f5c842' }, children: [
            { name: '建筑工', value: 12 }, { name: '快递员', value: 10 }, { name: '服务业', value: 9 }
          ]},
          { name: '教师/手艺人', value: 27, itemStyle: { color: '#4a8c34' }, children: [
            { name: '教师', value: 12 }, { name: '蜡染', value: 8 }, { name: '银饰', value: 7 }
          ]}
        ],
        label: { color: '#f0f5ee', rotate: 'radial' },
        itemStyle: { borderColor: '#0a1f0a', borderWidth: 2 }
      }]
    });
  } catch (e) { console.error('chartHexbin', e); }"""
html = html.replace(old_js_hexbin, new_js_hexbin)

# 10.2 chartSunburst: sunburst -> treemap
old_js_sunburst = """  // 2. chartSunburst
  try {
    var chart = echarts.init(document.getElementById('chartSunburst'));
    charts.chartSunburst = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'sunburst', radius: ['15%', '80%'],
        data: [
          { name: '农特产', value: 7.08, itemStyle: { color: '#e8a820' }, children: [
            { name: '水果', value: 2.5 }, { name: '干货', value: 1.8 }, { name: '蔬菜', value: 1.5 }, { name: '其他', value: 1.28 }
          ]},
          { name: '手工艺品', value: 3.20, itemStyle: { color: '#f5c842' }, children: [
            { name: '蜡染', value: 1.2 }, { name: '银饰', value: 0.8 }, { name: '刺绣', value: 0.7 }, { name: '其他', value: 0.5 }
          ]},
          { name: '餐饮小吃', value: 3.13, itemStyle: { color: '#4a8c34' }, children: [
            { name: '卷粉', value: 1.0 }, { name: '烧烤', value: 0.9 }, { name: '糯米饭', value: 0.7 }, { name: '其他', value: 0.53 }
          ]}
        ],
        label: { color: '#f0f5ee', rotate: 'radial' },
        itemStyle: { borderColor: '#0a1f0a', borderWidth: 2 }
      }]
    });
  } catch (e) { console.error('chartSunburst', e); }"""

new_js_sunburst = """  // 2. chartSunburst - Treemap
  try {
    var chart = echarts.init(document.getElementById('chartSunburst'));
    charts.chartSunburst = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'treemap',
        width: '95%', height: '95%', left: 'center', top: 'center',
        data: [
          { name: '农特产', value: 7.08, itemStyle: { color: '#e8a820' }, children: [
            { name: '水果', value: 2.5, itemStyle: { color: '#e8a820' } }, { name: '干货', value: 1.8, itemStyle: { color: '#d49518' } }, { name: '蔬菜', value: 1.5, itemStyle: { color: '#c08516' } }, { name: '其他农产', value: 1.28, itemStyle: { color: '#a87514' } }
          ]},
          { name: '手工艺品', value: 3.20, itemStyle: { color: '#f5c842' }, children: [
            { name: '蜡染', value: 1.2, itemStyle: { color: '#f5c842' } }, { name: '银饰', value: 0.8, itemStyle: { color: '#e0b038' } }, { name: '刺绣', value: 0.7, itemStyle: { color: '#c8a030' } }, { name: '其他工艺', value: 0.5, itemStyle: { color: '#b09028' } }
          ]},
          { name: '餐饮小吃', value: 3.13, itemStyle: { color: '#4a8c34' }, children: [
            { name: '卷粉', value: 1.0, itemStyle: { color: '#4a8c34' } }, { name: '烧烤', value: 0.9, itemStyle: { color: '#3e7a2c' } }, { name: '糯米饭', value: 0.7, itemStyle: { color: '#326824' } }, { name: '其他餐饮', value: 0.53, itemStyle: { color: '#26561c' } }
          ]}
        ],
        label: { show: true, color: '#f0f5ee', fontSize: 13 },
        itemStyle: { borderColor: '#0a1f0a', borderWidth: 2, gapWidth: 2 },
        levels: [
          { itemStyle: { borderColor: '#0a1f0a', borderWidth: 3, gapWidth: 3 } },
          { colorSaturation: [0.5, 0.8], itemStyle: { borderColorSaturation: 0.6, gapWidth: 2 } }
        ]
      }]
    });
  } catch (e) { console.error('chartSunburst', e); }"""
html = html.replace(old_js_sunburst, new_js_sunburst)

# 10.3 chartSankey1: sankey -> graph (force)
old_js_sankey = """  // 4. chartSankey1
  try {
    var chart = echarts.init(document.getElementById('chartSankey1'));
    charts.chartSankey1 = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'sankey', layout: 'none', emphasis: { focus: 'adjacency' },
        data: [
          { name: '赛事流量' }, { name: '直接就业' }, { name: '灵活就业' }, { name: '总受益' }
        ],
        links: [
          { source: '赛事流量', target: '直接就业', value: 4127 },
          { source: '赛事流量', target: '灵活就业', value: 8063 },
          { source: '直接就业', target: '总受益', value: 4127 },
          { source: '灵活就业', target: '总受益', value: 8063 }
        ],
        lineStyle: { color: '#e8a820', opacity: 0.3 },
        itemStyle: { color: '#e8a820', borderColor: '#f5c842' },
        label: { color: '#f0f5ee', fontSize: 14 }
      }]
    });
  } catch (e) { console.error('chartSankey1', e); }"""

new_js_sankey = """  // 4. chartSankey1 - Force graph
  try {
    var chart = echarts.init(document.getElementById('chartSankey1'));
    charts.chartSankey1 = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'graph', layout: 'force', roam: true,
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        data: [
          { name: '赛事流量', value: 100, symbolSize: 70, itemStyle: { color: '#e05020' }, label: { fontSize: 14 } },
          { name: '直接就业', value: 60, symbolSize: 50, itemStyle: { color: '#e8a820' } },
          { name: '灵活就业', value: 80, symbolSize: 55, itemStyle: { color: '#f5c842' } },
          { name: '总受益', value: 90, symbolSize: 65, itemStyle: { color: '#4a8c34' } },
          { name: '卷粉摊主', value: 30, symbolSize: 30, itemStyle: { color: '#8da680' } },
          { name: '烧烤商户', value: 30, symbolSize: 30, itemStyle: { color: '#8da680' } },
          { name: '蜡染手艺人', value: 25, symbolSize: 28, itemStyle: { color: '#8da680' } },
          { name: '快递司机', value: 25, symbolSize: 28, itemStyle: { color: '#8da680' } },
          { name: '啦啦队员', value: 20, symbolSize: 25, itemStyle: { color: '#8da680' } }
        ],
        links: [
          { source: '赛事流量', target: '直接就业', value: 4127, lineStyle: { color: '#e8a820', width: 4, opacity: 0.6 } },
          { source: '赛事流量', target: '灵活就业', value: 8063, lineStyle: { color: '#f5c842', width: 6, opacity: 0.6 } },
          { source: '直接就业', target: '总受益', value: 4127, lineStyle: { color: '#e8a820', width: 4, opacity: 0.4 } },
          { source: '灵活就业', target: '总受益', value: 8063, lineStyle: { color: '#f5c842', width: 6, opacity: 0.4 } },
          { source: '直接就业', target: '卷粉摊主', value: 800, lineStyle: { color: '#8da680', width: 2, opacity: 0.3 } },
          { source: '直接就业', target: '烧烤商户', value: 1200, lineStyle: { color: '#8da680', width: 2, opacity: 0.3 } },
          { source: '灵活就业', target: '蜡染手艺人', value: 600, lineStyle: { color: '#8da680', width: 2, opacity: 0.3 } },
          { source: '灵活就业', target: '快递司机', value: 1500, lineStyle: { color: '#8da680', width: 2, opacity: 0.3 } },
          { source: '灵活就业', target: '啦啦队员', value: 2000, lineStyle: { color: '#8da680', width: 2, opacity: 0.3 } }
        ],
        force: { repulsion: 400, edgeLength: 120 },
        label: { show: true, color: '#f0f5ee', fontSize: 12 },
        lineStyle: { curveness: 0.2 },
        emphasis: { focus: 'adjacency', lineStyle: { width: 6 } }
      }]
    });
  } catch (e) { console.error('chartSankey1', e); }"""
html = html.replace(old_js_sankey, new_js_sankey)

# 10.4 chartBubble: scatter -> parallel coordinates
old_js_bubble = """  // 5. chartBubble
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
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' }, formatter: function(p) { const d = p.data; return d[0] + '<br/>人口: ' + d[1] + '万<br/>GDP: ' + d[2] + '亿<br/>上座率: ' + d[3] + '%<br/>票房: ' + d[4] + '亿'; } },
      xAxis: { name: '人口(万)', nameTextStyle: { color: '#8da680' }, axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } } },
      yAxis: { name: 'GDP(亿)', nameTextStyle: { color: '#8da680' }, axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } } },
      series: [{
        type: 'scatter', symbolSize: function(d) { return d[4] * 6; },
        data: data,
        itemStyle: { color: function(p) { const r = p.data[3]; return r >= 95 ? '#e8a820' : r >= 85 ? '#f5c842' : r >= 75 ? '#4a8c34' : '#8da680'; } }
      }]
    });
  } catch (e) { console.error('chartBubble', e); }"""

new_js_bubble = """  // 5. chartBubble - Parallel coordinates
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
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      parallelAxis: [
        { dim: 0, name: '城市', type: 'category', data: data.map(d => d[0]), axisLabel: { color: '#c8d6c0' } },
        { dim: 1, name: '人口(万)', axisLabel: { color: '#c8d6c0' } },
        { dim: 2, name: 'GDP(亿)', axisLabel: { color: '#c8d6c0' } },
        { dim: 3, name: '上座率(%)', axisLabel: { color: '#c8d6c0' } },
        { dim: 4, name: '票房(亿)', axisLabel: { color: '#c8d6c0' } }
      ],
      parallel: { left: '5%', right: '13%', bottom: '10%', top: '15%', parallelAxisDefault: { axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' } } },
      series: [{
        type: 'parallel',
        data: data,
        lineStyle: { color: function(p) { const r = p.data[3]; return r >= 95 ? '#e8a820' : r >= 85 ? '#f5c842' : r >= 75 ? '#4a8c34' : '#8da680'; }, width: 2, opacity: 0.7 }
      }]
    });
  } catch (e) { console.error('chartBubble', e); }"""
html = html.replace(old_js_bubble, new_js_bubble)

# 10.5 chartMultiplier: changed to matchup graph (reuse same div id)
old_js_multiplier = """  // 6. chartMultiplier
  try {
    var chart = echarts.init(document.getElementById('chartMultiplier'));
    charts.chartMultiplier = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' }, formatter: function(p) { const d = p.data; return d[3] + '<br/>乘数: ' + d[0] + '<br/>人均消费: ' + d[1] + '元<br/>商户数: ' + d[2]; } },
      xAxis: { name: '消费乘数', nameTextStyle: { color: '#8da680' }, min: 4, max: 8, axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } } },
      yAxis: { name: '人均消费(元)', nameTextStyle: { color: '#8da680' }, axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } } },
      series: [{
        type: 'scatter', symbolSize: function(d) { return d[2] / 8; },
        data: [[7.3, 72.3, 535, '苏超'], [6.1, 60.4, 312, '湘超'], [5.2, 51.5, 189, '赣超'], [4.8, 47.5, 215, '东北超']],
        itemStyle: { color: '#e8a820' }, label: { show: true, color: '#f0f5ee', formatter: function(p) { return p.data[3]; } }
      }]
    });
  } catch (e) { console.error('chartMultiplier', e); }"""

new_js_multiplier = """  // 6. chartMultiplier - Matchup graph (circular)
  try {
    var chart = echarts.init(document.getElementById('chartMultiplier'));
    charts.chartMultiplier = chart;
    const cities = ['南京','苏州','无锡','常州','南通','徐州','扬州','盐城','泰州','镇江','宿迁','连云港','淮安'];
    const nodes = cities.map((c, i) => ({ name: c, value: i, symbolSize: 30 + Math.random() * 20, itemStyle: { color: ['#e8a820','#f5c842','#4a8c34','#e05020','#8da680','#e8a820','#f5c842','#4a8c34','#e05020','#8da680','#e8a820','#f5c842','#4a8c34'][i] } }));
    const links = [];
    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        if (Math.random() > 0.5) links.push({ source: i, target: j, value: Math.floor(Math.random() * 100), lineStyle: { width: 1 + Math.random() * 2, opacity: 0.3 + Math.random() * 0.3 } });
      }
    }
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'graph', layout: 'circular', circular: { rotateLabel: true },
        data: nodes, links: links, roam: true, zoom: 1.2,
        label: { show: true, color: '#f0f5ee', fontSize: 11 },
        lineStyle: { curveness: 0.3, color: '#e8a820' },
        emphasis: { focus: 'adjacency', lineStyle: { width: 4 } }
      }]
    });
  } catch (e) { console.error('chartMultiplier', e); }"""
html = html.replace(old_js_multiplier, new_js_multiplier)

# 10.6 Delete chartHeatmap and chartChord JS (remove entirely)
old_js_heatmap = """  // 9. chartHeatmap
  try {
    var chart = echarts.init(document.getElementById('chartHeatmap'));
    charts.chartHeatmap = chart;
    const provinces = ['榕江','苏超','赣超','湘超','楚超','辽宁','吉林','黑龙江','川超','齐鲁','粤超','宁超','内蒙古','浙超','渝超','福建','广西'];
    const data = [];
    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 17; j++) {
        data.push([i, j, i === j ? 0 : Math.floor(Math.random() * 90) + 10]);
      }
    }
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      xAxis: { type: 'category', data: provinces, axisLabel: { color: '#c8d6c0', fontSize: 10, rotate: 45 }, axisLine: { lineStyle: { color: '#8da680' } }, splitArea: { show: true } },
      yAxis: { type: 'category', data: provinces, axisLabel: { color: '#c8d6c0', fontSize: 10 }, axisLine: { lineStyle: { color: '#8da680' } }, splitArea: { show: true } },
      visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: 0, inRange: { color: ['#0a1f0a', '#4a8c34', '#f5c842', '#e8a820', '#e05020'] }, textStyle: { color: '#f0f5ee' } },
      series: [{ type: 'heatmap', data: data, label: { show: false }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } } }]
    });
  } catch (e) { console.error('chartHeatmap', e); }

  // 10. chartChord - graph with circular layout
  try {
    var chart = echarts.init(document.getElementById('chartChord'));
    charts.chartChord = chart;
    const regions = ['东部5省', '中部4省', '北方4省', '西南华南6省市'];
    const matrix = [[0,80,60,70],[75,0,50,65],[55,45,0,40],[65,60,35,0]];
    const nodes = regions.map((r, i) => ({ name: r, value: i, itemStyle: { color: ['#e8a820','#f5c842','#4a8c34','#e05020'][i] } }));
    const links = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i !== j && matrix[i][j] > 0) links.push({ source: i, target: j, value: matrix[i][j], lineStyle: { width: matrix[i][j] / 15, color: '#e8a820', opacity: 0.6 } });
      }
    }
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'graph', layout: 'circular', circular: { rotateLabel: true },
        data: nodes, links: links, roam: true, zoom: 1.2,
        label: { show: true, color: '#f0f5ee', fontSize: 12 },
        lineStyle: { curveness: 0.3 },
        emphasis: { focus: 'adjacency', lineStyle: { width: 4 } }
      }]
    });
  } catch (e) { console.error('chartChord', e); }"""
html = html.replace(old_js_heatmap, "")

# 10.7 chartBarLeague: bar -> treemap
old_js_barleague = """  // 11. chartBarLeague
  try {
    var chart = echarts.init(document.getElementById('chartBarLeague'));
    charts.chartBarLeague = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' }, axisPointer: { type: 'shadow' } },
      xAxis: { type: 'category', data: ['苏超', '湘超', '赣超', '东北超', '川超', '浙超', '粤超'], axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' } },
      yAxis: { type: 'value', name: '消费(亿)', nameTextStyle: { color: '#8da680' }, axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } } },
      series: [{
        type: 'bar', data: [
          { value: 379.6, itemStyle: { color: '#e8a820' } }, { value: 113.59, itemStyle: { color: '#f5c842' } },
          { value: 23.00, itemStyle: { color: '#4a8c34' } }, { value: 42.00, itemStyle: { color: '#e8a820' } },
          { value: 28.70, itemStyle: { color: '#f5c842' } }, { value: 67.30, itemStyle: { color: '#4a8c34' } },
          { value: 152.60, itemStyle: { color: '#e8a820' } }
        ],
        barWidth: '50%', label: { show: true, position: 'top', color: '#f0f5ee', formatter: '{c}亿' }
      }]
    });
  } catch (e) { console.error('chartBarLeague', e); }"""

new_js_barleague = """  // 11. chartBarLeague - Treemap
  try {
    var chart = echarts.init(document.getElementById('chartBarLeague'));
    charts.chartBarLeague = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'treemap',
        width: '95%', height: '95%', left: 'center', top: 'center',
        data: [
          { name: '苏超', value: 379.6, itemStyle: { color: '#e8a820' }, children: [
            { name: '南京', value: 85.2 }, { name: '苏州', value: 123.4 }, { name: '无锡', value: 68.3 }, { name: '常州', value: 52.1 }, { name: '其他', value: 50.6 }
          ]},
          { name: '粤超', value: 152.6, itemStyle: { color: '#f5c842' } },
          { name: '湘超', value: 113.59, itemStyle: { color: '#4a8c34' } },
          { name: '浙超', value: 67.3, itemStyle: { color: '#e05020' } },
          { name: '东北超', value: 42.0, itemStyle: { color: '#8da680' } },
          { name: '川超', value: 28.7, itemStyle: { color: '#e8a820' } },
          { name: '赣超', value: 23.0, itemStyle: { color: '#f5c842' } }
        ],
        label: { show: true, color: '#f0f5ee', fontSize: 14, formatter: function(p) { return p.name + '\\n' + p.value + '亿'; } },
        itemStyle: { borderColor: '#0a1f0a', borderWidth: 2, gapWidth: 2 }
      }]
    });
  } catch (e) { console.error('chartBarLeague', e); }"""
html = html.replace(old_js_barleague, new_js_barleague)

# 10.8 Delete chartWordCloud JS
old_js_wordcloud = """  // 13. chartWordCloud
  try {
    const chartDom = document.getElementById('chartWordCloud');
    if (chartDom && echarts.graphic && echarts.graphic.registerShape) {
      // Try wordCloud if extension is loaded
      var chart = echarts.init(chartDom);
      charts.chartWordCloud = chart;
      chart.setOption({
        backgroundColor: 'transparent',
        series: [{
          type: 'wordCloud',
          shape: 'circle', left: 'center', top: 'center', width: '90%', height: '90%',
          sizeRange: [14, 60], rotationRange: [-45, 45], rotationStep: 45, gridSize: 8,
          textStyle: { fontFamily: 'Microsoft YaHei', color: function() { return ['#e8a820','#f0f5ee','#4a8c34','#f5c842'][Math.floor(Math.random()*4)]; } },
          data: [
            { name: '草根', value: 4200 }, { name: '热爱', value: 3800 }, { name: '烟火', value: 2900 },
            { name: '非遗', value: 2500 }, { name: '市井', value: 2100 }, { name: '团结', value: 1900 },
            { name: '拼搏', value: 1800 }, { name: '传承', value: 1600 }, { name: '振兴', value: 1500 },
            { name: '梦想', value: 1400 }, { name: '泥泞', value: 1300 }, { name: '呐喊', value: 1200 },
            { name: '奔跑', value: 1100 }, { name: '汗水', value: 1000 }, { name: '欢呼', value: 950 },
            { name: '坚持', value: 900 }
          ]
        }]
      });
    } else if (chartDom) {
      // Fallback: simple bar chart shaped like words
      chartDom.innerHTML = '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;height:100%;gap:8px;padding:16px;">' +
        '<span style="font-size:36px;color:#e8a820;font-weight:bold;">草根</span>' +
        '<span style="font-size:32px;color:#f0f5ee;font-weight:bold;">热爱</span>' +
        '<span style="font-size:28px;color:#4a8c34;font-weight:bold;">烟火</span>' +
        '<span style="font-size:26px;color:#f5c842;font-weight:bold;">非遗</span>' +
        '<span style="font-size:22px;color:#e8a820;font-weight:bold;">市井</span>' +
        '<span style="font-size:20px;color:#f0f5ee;font-weight:bold;">团结</span>' +
        '<span style="font-size:18px;color:#4a8c34;font-weight:bold;">拼搏</span>' +
        '<span style="font-size:16px;color:#f5c842;font-weight:bold;">传承</span>' +
        '<span style="font-size:15px;color:#e8a820;font-weight:bold;">振兴</span>' +
        '<span style="font-size:14px;color:#f0f5ee;font-weight:bold;">梦想</span>' +
        '<span style="font-size:13px;color:#4a8c34;font-weight:bold;">泥泞</span>' +
        '<span style="font-size:12px;color:#f5c842;font-weight:bold;">呐喊</span>' +
        '<span style="font-size:11px;color:#e8a820;font-weight:bold;">奔跑</span>' +
        '<span style="font-size:10px;color:#f0f5ee;font-weight:bold;">汗水</span>' +
        '<span style="font-size:10px;color:#4a8c34;font-weight:bold;">欢呼</span>' +
        '<span style="font-size:10px;color:#f5c842;font-weight:bold;">坚持</span>' +
      '</div>';
    }
  } catch (e) { console.error('chartWordCloud', e); }"""
html = html.replace(old_js_wordcloud, "")

# 10.9 chartSunburst2: sunburst -> matrix (heatmap with categories)
old_js_sunburst2 = """  // 14. chartSunburst2
  try {
    var chart = echarts.init(document.getElementById('chartSunburst2'));
    charts.chartSunburst2 = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'sunburst', radius: ['15%', '80%'],
        data: [
          { name: '群众', value: 35, itemStyle: { color: '#e8a820' }, children: [
            { name: '原生热爱', value: 15 }, { name: '参与深度', value: 10 }, { name: '自发传播', value: 10 }
          ]},
          { name: '政府', value: 25, itemStyle: { color: '#f5c842' }, children: [
            { name: '规则底线', value: 10 }, { name: '服务保障', value: 8 }, { name: '政策支持', value: 7 }
          ]},
          { name: '市场', value: 25, itemStyle: { color: '#4a8c34' }, children: [
            { name: '流量转化', value: 10 }, { name: '民生收益', value: 8 }, { name: '商业共赢', value: 7 }
          ]},
          { name: '文化', value: 15, itemStyle: { color: '#e05020' }, children: [
            { name: '差异化内核', value: 8 }, { name: '地域认同', value: 7 }
          ]}
        ],
        label: { color: '#f0f5ee', rotate: 'radial' },
        itemStyle: { borderColor: '#0a1f0a', borderWidth: 2 }
      }]
    });
  } catch (e) { console.error('chartSunburst2', e); }"""

new_js_sunburst2 = """  // 14. chartSunburst2 - Matrix heatmap
  try {
    var chart = echarts.init(document.getElementById('chartSunburst2'));
    charts.chartSunburst2 = chart;
    const forces = ['群众', '政府', '市场', '文化'];
    const metrics = ['原生热爱', '规则底线', '流量转化', '差异化内核', '参与深度', '服务保障', '民生收益', '地域认同', '自发传播', '政策支持', '商业共赢'];
    const matrixData = [
      [0, 0, 15], [0, 1, 10], [0, 2, 10],
      [1, 0, 10], [1, 1, 8], [1, 2, 7],
      [2, 0, 10], [2, 1, 8], [2, 2, 7],
      [3, 0, 8], [3, 1, 7]
    ];
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' }, formatter: function(p) { return p.name + ': ' + p.value[2] + '%'; } },
      xAxis: { type: 'category', data: forces, axisLabel: { color: '#c8d6c0', fontSize: 13 }, axisLine: { lineStyle: { color: '#8da680' } }, splitArea: { show: true } },
      yAxis: { type: 'category', data: metrics, axisLabel: { color: '#c8d6c0', fontSize: 11 }, axisLine: { lineStyle: { color: '#8da680' } }, splitArea: { show: true } },
      visualMap: { min: 0, max: 20, calculable: true, orient: 'horizontal', left: 'center', bottom: 0, inRange: { color: ['#0a1f0a', '#4a8c34', '#f5c842', '#e8a820', '#e05020'] }, textStyle: { color: '#f0f5ee' } },
      series: [{ type: 'heatmap', data: matrixData, label: { show: true, color: '#f0f5ee', formatter: function(p) { return p.value[2] + '%'; } }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } } }]
    });
  } catch (e) { console.error('chartSunburst2', e); }"""
html = html.replace(old_js_sunburst2, new_js_sunburst2)

# 10.10 chartTimeline: already replaced with HTML, remove JS
old_js_timeline = """  // 15. chartTimeline
  try {
    var chart = echarts.init(document.getElementById('chartTimeline'));
    charts.chartTimeline = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' }, formatter: function(p) { return p.name + '<br/>重要性: ' + p.value[2]; } },
      xAxis: { type: 'value', min: 2022, max: 2029, axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } } },
      yAxis: { type: 'value', min: 0, max: 120, show: false },
      series: [{
        type: 'scatter', symbolSize: function(d) { return d[2]; },
        data: [
          [2023, 50, 20, '首届村超联赛'],
          [2024, 50, 35, '首届国际友谊赛'],
          [2025, 50, 50, '一带一路友谊赛'],
          [2026, 50, 65, '六国邀请赛'],
          [2027, 50, 75, '亚非拉友谊赛'],
          [2028, 50, 100, '村超世界杯']
        ],
        itemStyle: { color: '#e8a820' },
        label: { show: true, formatter: function(p) { return p.data[3]; }, color: '#f0f5ee', position: 'top' }
      }]
    });
  } catch (e) { console.error('chartTimeline', e); }"""
html = html.replace(old_js_timeline, "")

# 10.11 chartPyramid: already replaced with HTML, remove JS
old_js_pyramid = """  // 16. chartPyramid - Funnel
  try {
    var chart = echarts.init(document.getElementById('chartPyramid'));
    charts.chartPyramid = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' } },
      series: [{
        type: 'funnel', sort: 'ascending', gap: 2,
        label: { show: true, color: '#f0f5ee', formatter: '{b}: {c}' },
        data: [
          { value: 19, name: '全国总决赛', itemStyle: { color: '#e8a820' } },
          { value: 1200, name: '村镇联赛', itemStyle: { color: '#4a8c34' } },
          { value: 2100, name: '省级联赛', itemStyle: { color: '#f5c842' } },
          { value: 3400, name: '市域联赛', itemStyle: { color: '#8da680' } }
        ]
      }]
    });
  } catch (e) { console.error('chartPyramid', e); }"""
html = html.replace(old_js_pyramid, "")

# 10.12 worldMap: change to real world map with bidirectional arrows
old_js_worldmap = """  // 17. worldMap - scatter on cartesian with longitude/latitude
  try {
    var chart = echarts.init(document.getElementById('worldMap'));
    charts.worldMap = chart;
    const worldData = [
      ['中国', 104.19, 35.86, 35], ['英国', -3.44, 55.38, 15], ['法国', 2.21, 46.23, 12],
      ['德国', 10.45, 51.17, 12], ['巴西', -51.93, -14.24, 8], ['阿根廷', -63.62, -38.42, 8],
      ['日本', 138.25, 36.20, 18], ['韩国', 127.77, 35.91, 16], ['泰国', 100.99, 15.87, 10],
      ['越南', 108.28, 14.06, 10], ['印尼', 113.92, -0.79, 8], ['马来西亚', 101.98, 4.21, 8],
      ['新加坡', 103.82, 1.35, 9], ['印度', 78.96, 20.59, 6], ['巴基斯坦', 69.34, 30.38, 5],
      ['肯尼亚', 37.91, -0.02, 5], ['尼日利亚', 8.68, 9.08, 4], ['埃及', 30.80, 26.82, 4],
      ['南非', 22.94, -30.56, 4], ['澳大利亚', 133.78, -25.27, 7], ['美国', -95.71, 37.09, 10],
      ['加拿大', -106.35, 56.13, 7]
    ];
    const lineData = worldData.filter(d => d[0] !== '中国').map(d => ({
      coords: [[104.19, 35.86], [d[1], d[2]]]
    }));
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' }, formatter: function(p) { const d = p.data; return d[0] + '<br/>经度: ' + d[1].toFixed(2) + '<br/>纬度: ' + d[2].toFixed(2); } },
      xAxis: { name: '经度', nameTextStyle: { color: '#8da680' }, min: -140, max: 160, axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } } },
      yAxis: { name: '纬度', nameTextStyle: { color: '#8da680' }, min: -60, max: 80, axisLine: { lineStyle: { color: '#8da680' } }, axisLabel: { color: '#c8d6c0' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } } },
      series: [
        {
          type: 'scatter', data: worldData, symbolSize: function(d) { return d[3] * 1.5; },
          itemStyle: { color: function(p) { return p.data[0] === '中国' ? '#e05020' : '#e8a820'; } },
          label: { show: true, formatter: function(p) { return p.data[0]; }, color: '#f0f5ee', fontSize: 10 }
        },
        {
          type: 'lines', data: lineData,
          effect: { show: true, period: 6, trailLength: 0.2, symbol: 'arrow', symbolSize: 5, color: '#f5c842' },
          lineStyle: { curveness: 0.2, width: 1, color: 'rgba(232,168,32,0.3)' },
          coordinateSystem: 'cartesian2d'
        }
      ]
    });
  } catch (e) { console.error('worldMap', e); }"""

new_js_worldmap = """  // 17. worldMap - Real world map with bidirectional lines
  try {
    var chart = echarts.init(document.getElementById('worldMap'));
    charts.worldMap = chart;
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/world.json')
      .then(r => { if (!r.ok) throw new Error('World GeoJSON fetch failed'); return r.json(); })
      .then(geoJSON => {
        echarts.registerMap('world', geoJSON);
        const worldNodes = [
          { name: '中国', value: [104.19, 35.86, 35], itemStyle: { color: '#e05020' } },
          { name: '英国', value: [-3.44, 55.38, 15], itemStyle: { color: '#e8a820' } },
          { name: '法国', value: [2.21, 46.23, 12], itemStyle: { color: '#e8a820' } },
          { name: '德国', value: [10.45, 51.17, 12], itemStyle: { color: '#e8a820' } },
          { name: '巴西', value: [-51.93, -14.24, 8], itemStyle: { color: '#e8a820' } },
          { name: '阿根廷', value: [-63.62, -38.42, 8], itemStyle: { color: '#e8a820' } },
          { name: '日本', value: [138.25, 36.20, 18], itemStyle: { color: '#e8a820' } },
          { name: '韩国', value: [127.77, 35.91, 16], itemStyle: { color: '#e8a820' } },
          { name: '泰国', value: [100.99, 15.87, 10], itemStyle: { color: '#e8a820' } },
          { name: '越南', value: [108.28, 14.06, 10], itemStyle: { color: '#e8a820' } },
          { name: '印尼', value: [113.92, -0.79, 8], itemStyle: { color: '#e8a820' } },
          { name: '马来西亚', value: [101.98, 4.21, 8], itemStyle: { color: '#e8a820' } },
          { name: '新加坡', value: [103.82, 1.35, 9], itemStyle: { color: '#e8a820' } },
          { name: '印度', value: [78.96, 20.59, 6], itemStyle: { color: '#e8a820' } },
          { name: '巴基斯坦', value: [69.34, 30.38, 5], itemStyle: { color: '#e8a820' } },
          { name: '肯尼亚', value: [37.91, -0.02, 5], itemStyle: { color: '#e8a820' } },
          { name: '尼日利亚', value: [8.68, 9.08, 4], itemStyle: { color: '#e8a820' } },
          { name: '埃及', value: [30.80, 26.82, 4], itemStyle: { color: '#e8a820' } },
          { name: '南非', value: [22.94, -30.56, 4], itemStyle: { color: '#e8a820' } },
          { name: '澳大利亚', value: [133.78, -25.27, 7], itemStyle: { color: '#e8a820' } },
          { name: '美国', value: [-95.71, 37.09, 10], itemStyle: { color: '#e8a820' } },
          { name: '加拿大', value: [-106.35, 56.13, 7], itemStyle: { color: '#e8a820' } }
        ];
        const chinaCoord = [104.19, 35.86];
        const lineData = [];
        worldNodes.forEach(d => {
          if (d.name !== '中国') {
            // China -> other
            lineData.push({ coords: [chinaCoord, d.value], lineStyle: { color: '#f5c842', opacity: 0.4, width: 1.5 } });
            // Other -> China (bidirectional)
            lineData.push({ coords: [d.value, chinaCoord], lineStyle: { color: '#e8a820', opacity: 0.3, width: 1 } });
          }
        });
        chart.setOption({
          backgroundColor: 'transparent',
          tooltip: { backgroundColor: 'rgba(10,31,10,0.92)', borderColor: '#e8a820', textStyle: { color: '#f0f5ee' }, formatter: function(p) { const d = p.data; return d.name + '<br/>参与度: ' + d.value[2]; } },
          geo: {
            map: 'world', roam: true, zoom: 1.2, center: [50, 20],
            itemStyle: { areaColor: '#1a3a1a', borderColor: 'rgba(255,255,255,0.1)' },
            emphasis: { itemStyle: { areaColor: '#2d5a1e' }, label: { color: '#f0f5ee' } },
            label: { show: false }
          },
          series: [
            {
              type: 'scatter', coordinateSystem: 'geo', data: worldNodes,
              symbolSize: function(v) { return v[2] * 1.2 + 5; },
              label: { show: true, formatter: '{b}', color: '#f0f5ee', fontSize: 10, position: 'right' },
              emphasis: { scale: 1.5 }
            },
            {
              type: 'lines', coordinateSystem: 'geo', data: lineData,
              effect: { show: true, period: 5, trailLength: 0.2, symbol: 'arrow', symbolSize: 5, color: '#f5c842' },
              lineStyle: { curveness: 0.2, width: 1.5, opacity: 0.4 }
            }
          ]
        });
      })
      .catch(err => {
        console.error('World map failed:', err);
        document.getElementById('worldMap').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#8da680;font-size:14px;">世界地图数据加载失败，请检查网络连接</div>';
      });
  } catch (e) { console.error('worldMap', e); }"""
html = html.replace(old_js_worldmap, new_js_worldmap)

# Add carousel init for ch3
old_carousel_init = """initCarousel('carouselTrack');
initCarousel('ch5Track');"""
new_carousel_init = """initCarousel('carouselTrack');
initCarousel('ch3Track');
initCarousel('ch5Track');"""
html = html.replace(old_carousel_init, new_carousel_init)

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(html)

print("All modifications completed successfully!")
print("Modified file:", FILE)
