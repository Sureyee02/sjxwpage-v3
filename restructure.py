
import re, os

def main(ctx):
    filepath = r'D:\素材库\2026数据新闻\村超\数据新闻coding-v3-kimi\sjxwpage-v3\index.html'
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # ============ 1. 修改导航栏 ============
    old_nav = '''    <li><a href="#prologue" data-section="prologue"><span class="football-icon">⚽</span>序言</a></li>
    <li><a href="#attempts" data-section="attempts"><span class="football-icon">⚽</span>溯源</a></li>
    <li><a href="#ch1" data-section="ch1"><span class="football-icon">⚽</span>开球</a></li>
    <li><a href="#ch2" data-section="ch2"><span class="football-icon">⚽</span>爆点</a></li>
    <li><a href="#ch3" data-section="ch3"><span class="football-icon">⚽</span>全攻</a></li>
    <li><a href="#compare" data-section="compare"><span class="football-icon">⚽</span>对比</a></li>
    <li><a href="#ch4" data-section="ch4"><span class="football-icon">⚽</span>盘带</a></li>
    <li><a href="#concerns" data-section="concerns"><span class="football-icon">⚽</span>反思</a></li>
    <li><a href="#replicability" data-section="replicability"><span class="football-icon">⚽</span>结论</a></li>
    <li><a href="#ch5" data-section="ch5"><span class="football-icon">⚽</span>长传</a></li>
    <li><a href="#sources" data-section="sources"><span class="football-icon">⚽</span>来源</a></li>'''
    
    new_nav = '''    <li><a href="#ch1" data-section="ch1"><span class="football-icon">⚽</span>土壤</a></li>
    <li><a href="#ch2" data-section="ch2"><span class="football-icon">⚽</span>萌芽</a></li>
    <li><a href="#ch3" data-section="ch3"><span class="football-icon">⚽</span>破圈</a></li>
    <li><a href="#ch4" data-section="ch4"><span class="football-icon">⚽</span>比较</a></li>
    <li><a href="#ch5" data-section="ch5"><span class="football-icon">⚽</span>生长</a></li>
    <li><a href="#ch6" data-section="ch6"><span class="football-icon">⚽</span>根系</a></li>
    <li><a href="#ch7" data-section="ch7"><span class="football-icon">⚽</span>瓶颈</a></li>
    <li><a href="#ch8" data-section="ch8"><span class="football-icon">⚽</span>出海</a></li>
    <li><a href="#ch9" data-section="ch9"><span class="football-icon">⚽</span>评估</a></li>
    <li><a href="#ch10" data-section="ch10"><span class="football-icon">⚽</span>超时代</a></li>
    <li><a href="#sources" data-section="sources"><span class="football-icon">⚽</span>来源</a></li>'''
    
    content = content.replace(old_nav, new_nav)
    
    # ============ 2. 修改hero引语 ============
    old_hero = '''    <div class="hero-question" style="max-width:700px;margin:32px auto 0;padding:24px 32px;background:rgba(0,0,0,0.35);border-radius:12px;border-left:4px solid #D9EF8B;">
      <p style="font-size:18px;color:#FFFFBF;line-height:2;text-align:left;font-family:'Ma Shan Zheng','ZCOOL XiaoWei','STKaiti','Kaiti',serif;">
        一颗足球如何撬动一个贫困县的经济翻身？<br/>
        从国家级贫困县到GDP百亿县，村超模式真的可复制吗？
      </p>
    </div>'''
    
    new_hero = '''    <div class="hero-question" style="max-width:700px;margin:32px auto 0;padding:24px 32px;background:rgba(0,0,0,0.35);border-radius:12px;border-left:4px solid #D9EF8B;">
      <p style="font-size:18px;color:#FFFFBF;line-height:2;text-align:left;font-family:'Ma Shan Zheng','ZCOOL XiaoWei','STKaiti','Kaiti',serif;">
        从洪水废墟到百亿文旅，一颗足球撬动县域经济翻身。<br/>
        从榕江泥地到全国联赛，草根足球如何踢出"超"时代？
      </p>
    </div>'''
    
    content = content.replace(old_hero, new_hero)
    
    # ============ 3. 重写prologue → ch1 "土壤" ============
    content = content.replace('id="prologue"', 'id="ch1"')
    content = content.replace('<div class="section-badge">PROLOGUE</div>', '<div class="section-badge">CHAPTER 01</div>')
    content = content.replace('<h2 class="section-title">从洪水中归来</h2>', '<h2 class="section-title">土壤</h2>')
    content = content.replace('<p class="section-subtitle">2025年6月，榕江，一场特大洪峰改变了一切</p>', '<p class="section-subtitle">根系 — 深厚的群众土壤与民族文化基底</p>')
    
    # ============ 4. 删除 attempts section ============
    attempts_start = content.find('<!-- BACKSTORY: 六次尝试 -->')
    attempts_end = content.find('<!-- DATA STORY: 三个数字 -->')
    if attempts_start != -1 and attempts_end != -1:
        content = content[:attempts_start] + content[attempts_end:]
    
    # ============ 5. 删除 dataNarrative section ============
    data_start = content.find('<!-- DATA STORY: 三个数字 -->')
    data_end = content.find('<!-- Chapter 1: 泥地开球 -->')
    if data_start != -1 and data_end != -1:
        content = content[:data_start] + content[data_end:]
    
    # ============ 6. 重写ch1 → ch2 "萌芽" ============
    content = content.replace('<!-- Chapter 1: 泥地开球 -->', '<!-- Chapter 2: 萌芽 -->')
    # 注意：这里id="ch1" class="section" 需要改为 id="ch2"
    # 但prologue已经改成了ch1，所以这里有一个id="ch1"需要处理
    # 使用更精确的模式替换
    ch1_section = '<section id="ch1" class="section">\n  <div class="section-badge">CHAPTER 01</div>\n  <h2 class="section-title">泥地开球</h2>\n  <p class="section-subtitle">守门员 — 原点坚守：从废墟之上开出乡土足球</p>'
    ch2_section = '<section id="ch2" class="section">\n  <div class="section-badge">CHAPTER 02</div>\n  <h2 class="section-title">萌芽</h2>\n  <p class="section-subtitle">守门员 — 原点坚守：从乡土足球到县域经济引擎</p>'
    content = content.replace(ch1_section, ch2_section)
    
    # 在ch2中插入类型学表格和KPI（在story-text之后）
    # 找到ch2的KPI grid之后，添加一个类型学表格
    ch2_insert_point = '<div class="kpi-grid">'
    ch2_insert_after = content.find(ch2_insert_point, content.find('id="ch2"'))
    if ch2_insert_after != -1:
        # 找到kpi-grid的结束位置
        kpi_end = content.find('</div>\n\n  <div class="chart-row">', ch2_insert_after)
        if kpi_end != -1:
            typology_table = '''\n  
  <!-- 类型学表格 -->
  <div style="max-width:900px;margin:40px auto;padding:24px;background:rgba(0,0,0,0.15);border-radius:12px;border:1px solid rgba(217,239,139,0.12);">
    <div class="chart-title" style="margin-bottom:16px;">村超萌芽：类型学特征</div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;color:#FFFFBF;">
        <thead>
          <tr style="border-bottom:1px solid rgba(217,239,139,0.3);">
            <th style="padding:10px;text-align:left;color:#D9EF8B;">维度</th>
            <th style="padding:10px;text-align:left;color:#D9EF8B;">村超模式</th>
            <th style="padding:10px;text-align:left;color:#D9EF8B;">传统赛事</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <td style="padding:10px;">运营主体</td>
            <td style="padding:10px;color:#D9EF8B;">群众自发、零薪酬</td>
            <td style="padding:10px;">政府/资本主导</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <td style="padding:10px;">参赛群体</td>
            <td style="padding:10px;color:#D9EF8B;">农民、摊贩、教师</td>
            <td style="padding:10px;">职业球员</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <td style="padding:10px;">文化内核</td>
            <td style="padding:10px;color:#D9EF8B;">侗族大歌、苗族芦笙</td>
            <td style="padding:10px;">商业表演</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <td style="padding:10px;">流量工具</td>
            <td style="padding:10px;color:#D9EF8B;">短视频、直播</td>
            <td style="padding:10px;">电视转播、广告</td>
          </tr>
          <tr>
            <td style="padding:10px;">收益分配</td>
            <td style="padding:10px;color:#D9EF8B;">90%流向本地小微</td>
            <td style="padding:10px;">资本抽成</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>'''
            content = content[:kpi_end+6] + typology_table + content[kpi_end+6:]
    
    # ============ 7. 重写ch2 → ch3 "破圈" ============
    content = content.replace('<!-- Chapter 2: 边路爆点 -->', '<!-- Chapter 3: 破圈 -->')
    ch2_old = '<section id="ch2" class="section">\n  <div class="section-badge">CHAPTER 02</div>\n  <h2 class="section-title">边路爆点</h2>\n  <p class="section-subtitle">边锋 — 单点突破：小店平等入场，重构群众足球产业</p>'
    ch2_new = '<section id="ch3" class="section">\n  <div class="section-badge">CHAPTER 03</div>\n  <h2 class="section-title">破圈</h2>\n  <p class="section-subtitle">边锋 — 单点突破：从村超到苏超，重构群众足球产业</p>'
    content = content.replace(ch2_old, ch2_new)
    
    # 在ch3中添加苏超球员饼图容器
    ch3_insert = '<div id="chartRadarCompare" style="width:100%;height:400px;"></div>'
    ch3_after = content.find(ch3_insert, content.find('id="ch3"'))
    if ch3_after != -1:
        ch3_add = '''\n  </div>\n  
  <div class="chart-container">
    <div class="chart-title">苏超球员职业分布</div>
    <div class="chart-desc">516名参赛球员中，快递员、教师、个体户等草根占比超85%</div>
    <div id="chartSuzhouPlayer" style="width:100%;height:340px;"></div>
    <div class="hint-text">悬停查看各职业占比</div>
  </div>'''
        content = content[:ch3_after+len(ch3_insert)] + ch3_add + content[ch3_after+len(ch3_insert):]
    
    # ============ 8. 重写compare → ch4 "比较" ============
    content = content.replace('<!-- COMPARISON: 热点事件对比 -->', '<!-- Chapter 4: 比较 -->')
    compare_old = '<section id="compare" class="section">\n  <div class="section-badge">COMPARISON</div>\n  <h2 class="section-title">为什么村超更持久？</h2>\n  <p class="section-subtitle">横向对比中国互联网现象级事件的生命周期</p>'
    compare_new = '<section id="ch4" class="section">\n  <div class="section-badge">CHAPTER 04</div>\n  <h2 class="section-title">比较</h2>\n  <p class="section-subtitle">中场 — 类型学比较：为什么村超更持久？</p>'
    content = content.replace(compare_old, compare_new)
    
    # 在ch4中添加持久性矩阵容器
    ch4_insert = '<div id="chartCompareRadar" style="width:100%;height:340px;"></div>'
    ch4_after = content.find(ch4_insert, content.find('id="ch4"'))
    if ch4_after != -1:
        ch4_add = '''\n  </div>\n  
  <div class="chart-container" style="height:480px;margin-top:40px;">
    <div class="chart-title">现象级事件持久性矩阵</div>
    <div class="chart-desc">横轴=生命周期(月)，纵轴=当前热度，气泡大小=经济拉动规模</div>
    <div id="chartPersistence" style="width:100%;height:380px;"></div>
    <div class="hint-text">悬停查看事件详细数据</div>
  </div>'''
        content = content[:ch4_after+len(ch4_insert)] + ch4_add + content[ch4_after+len(ch4_insert):]
    
    # ============ 9. 修改ch3 → ch5 "生长" ============
    content = content.replace('<!-- Chapter 3: 全攻全守 -->', '<!-- Chapter 5: 生长 -->')
    ch3_old = '<section id="ch3" class="section">\n  <div class="section-badge">CHAPTER 03</div>\n  <h2 class="section-title">全攻全守</h2>\n  <p class="section-subtitle">前锋群 — 多点开花：19省X超联赛，遍地开花</p>'
    ch3_new = '<section id="ch5" class="section">\n  <div class="section-badge">CHAPTER 05</div>\n  <h2 class="section-title">生长</h2>\n  <p class="section-subtitle">前锋群 — 经济根系：19省联赛，体育文旅产业遍地生长</p>'
    content = content.replace(ch3_old, ch3_new)
    
    # ============ 10. 修改ch4 → ch6 "根系" ============
    content = content.replace('<!-- Chapter 4: 中场盘带 -->', '<!-- Chapter 6: 根系 -->')
    ch4_old = '<section id="ch4" class="section">\n  <div class="section-badge">CHAPTER 04</div>\n  <h2 class="section-title">中场盘带</h2>\n  <p class="section-subtitle">中场核心 — 四力共振：群众、政府、市场、文化共生共振</p>'
    ch4_new = '<section id="ch6" class="section">\n  <div class="section-badge">CHAPTER 06</div>\n  <h2 class="section-title">根系</h2>\n  <p class="section-subtitle">中场核心 — 四力共振：经济根基与风险根系</p>'
    content = content.replace(ch4_old, ch4_new)
    
    # 在ch6中并入concerns的反思图表（chartSeasonal、chartPressure）
    # 找到ch6的结束位置（</section>），在结束前插入concerns的图表
    ch6_end = content.find('</section>\n\n<!-- REFLECTION', content.find('id="ch6"'))
    if ch6_end != -1:
        concerns_charts = '''\n  
  <!-- 并入反思内容：经济根系的风险面 -->
  <div class="chart-row" style="margin-top:48px;">
    <div class="chart-container chart-half">
      <div class="chart-title">比赛日 vs 非比赛日游客量</div>
      <div class="chart-desc">季节性波动明显，非比赛日游客量仅为比赛日的12%</div>
      <div id="chartSeasonal" style="width:100%;height:340px;"></div>
    </div>
    <div class="chart-container chart-half">
      <div class="chart-title">基础设施承载压力评估</div>
      <div class="chart-desc">38.5万常住人口 vs 峰值18万日游客</div>
      <div id="chartPressure" style="width:100%;height:340px;"></div>
    </div>
  </div>'''
        content = content[:ch6_end] + concerns_charts + content[ch6_end:]
    
    # ============ 11. 修改concerns → ch7 "瓶颈" ============
    content = content.replace('<!-- REFLECTION: 隐忧与反思 -->', '<!-- Chapter 7: 瓶颈 -->')
    concerns_old = '<section id="concerns" class="section">\n  <div class="section-badge">REFLECTION</div>\n  <h2 class="section-title" style="color:#A50026;">隐忧与反思</h2>\n  <p class="section-subtitle">"超经济"背后的风险：繁荣之下，我们需要冷静</p>'
    concerns_new = '<section id="ch7" class="section">\n  <div class="section-badge">CHAPTER 07</div>\n  <h2 class="section-title" style="color:#A50026;">瓶颈</h2>\n  <p class="section-subtitle">后卫 — 卡位防守：挑战、反思与国际对标</p>'
    content = content.replace(concerns_old, concerns_new)
    
    # 移除concerns中的chartSeasonal和chartPressure（因为已并入ch6）
    # 找到concerns中的chartSeasonal容器并移除
    concerns_start = content.find('id="ch7"')
    concerns_end = content.find('<!-- Chapter 5: 万里长传 -->', concerns_start)
    if concerns_start != -1 and concerns_end != -1:
        concerns_section = content[concerns_start:concerns_end]
        # 移除两个chart容器及其前面的chart-row div
        concerns_section = concerns_section.replace('''  <div class="chart-row">
    <div class="chart-container chart-half">
      <div class="chart-title">比赛日 vs 非比赛日游客量</div>
      <div class="chart-desc">季节性波动明显，非比赛日游客量仅为比赛日的12%</div>
      <div id="chartSeasonal" style="width:100%;height:340px;"></div>
    </div>
    <div class="chart-container chart-half">
      <div class="chart-title">基础设施承载压力评估</div>
      <div class="chart-desc">38.5万常住人口 vs 峰值18万日游客</div>
      <div id="chartPressure" style="width:100%;height:340px;"></div>
    </div>
  </div>

''', '')
        content = content[:concerns_start] + concerns_section + content[concerns_end:]
    
    # ============ 12. 修改ch5 → ch8 "出海" ============
    content = content.replace('<!-- Chapter 5: 万里长传 -->', '<!-- Chapter 8: 出海 -->')
    ch5_old = '<section id="ch5" class="section">\n  <div class="section-badge">CHAPTER 05</div>\n  <h2 class="section-title">万里长传</h2>\n  <p class="section-subtitle">前锋 — 全球射门：2028村超世界杯，乡土绿茵走向世界</p>'
    ch5_new = '<section id="ch8" class="section">\n  <div class="section-badge">CHAPTER 08</div>\n  <h2 class="section-title">出海</h2>\n  <p class="section-subtitle">前锋 — 全球射门：2028村超世界杯，乡土绿茵走向世界</p>'
    content = content.replace(ch5_old, ch5_new)
    
    # ============ 13. 修改replicability → ch9 "评估" ============
    content = content.replace('<!-- CONCLUSION: 可复制性评估 -->', '<!-- Chapter 9: 评估 -->')
    repl_old = '<section id="replicability" class="section">\n  <div class="section-badge">CONCLUSION</div>\n  <h2 class="section-title">村超模式可复制吗？</h2>\n  <p class="section-subtitle">构建"县域文旅赛事成功指数"评估模型</p>'
    repl_new = '<section id="ch9" class="section">\n  <div class="section-badge">CHAPTER 09</div>\n  <h2 class="section-title">评估</h2>\n  <p class="section-subtitle">教练席 — 复盘评估：村超模式可复制吗？</p>'
    content = content.replace(repl_old, repl_new)
    
    # ============ 14. 重写epilogue → ch10 "超时代" ============
    content = content.replace('<!-- Epilogue -->', '<!-- Chapter 10: 超时代 -->')
    ep_old = '<section id="epilogue" class="section" style="text-align:center;">\n  <div class="section-badge">EPILOGUE</div>\n  <h2 class="section-title" style="margin-bottom:40px;">一脚跨越山海</h2>'
    ep_new = '<section id="ch10" class="section" style="text-align:center;">\n  <div class="section-badge">CHAPTER 10</div>\n  <h2 class="section-title" style="margin-bottom:40px;">超时代</h2>'
    content = content.replace(ep_old, ep_new)
    
    # ============ 15. 同步JS修改 ============
    
    # 15.1 删除chartAttempts的初始化代码
    attempts_js_start = content.find("  // chartAttempts - 变量矩阵热力图")
    if attempts_js_start != -1:
        attempts_js_end = content.find("  // chartCompare - 热度对比折线图", attempts_js_start)
        if attempts_js_end != -1:
            content = content[:attempts_js_start] + content[attempts_js_end:]
    
    # 15.2 更新导航映射中的data-section
    # 导航已经更新了，但JS中如果有硬编码的section id，也需要更新
    # 检查JS中的data-section引用
    content = content.replace('data-section="prologue"', 'data-section="ch1"')
    content = content.replace('data-section="attempts"', 'data-section="ch2"')  # 已被删除
    content = content.replace('data-section="compare"', 'data-section="ch4"')
    content = content.replace('data-section="concerns"', 'data-section="ch7"')
    content = content.replace('data-section="replicability"', 'data-section="ch9"')
    
    # 15.3 新增chartSuzhouPlayer和chartPersistence初始化
    # 在JS末尾、RESIZE HANDLER之前插入新图表初始化
    resize_marker = "  // ===== RESIZE HANDLER ====="
    resize_pos = content.find(resize_marker)
    if resize_pos != -1:
        new_charts = '''\n  // chartSuzhouPlayer - 苏超球员职业分布饼图
  try {
    var chart = echarts.init(document.getElementById('chartSuzhouPlayer'));
    charts.chartSuzhouPlayer = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { confine: true, backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
      legend: { orient: 'vertical', left: 'left', textStyle: { color: '#FFFFBF', fontSize: mFont(11) } },
      series: [{
        type: 'pie', radius: ['40%', '70%'], center: ['60%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: '#006837', borderWidth: 2 },
        label: { show: true, color: '#FFFFBF', fontSize: mFont(11), formatter: '{b}\\n{d}%' },
        data: [
          { value: 180, name: '快递员/司机', itemStyle: { color: '#D9EF8B' } },
          { value: 120, name: '教师/职员', itemStyle: { color: '#FFFFBF' } },
          { value: 95, name: '个体户/摊贩', itemStyle: { color: '#66BD63' } },
          { value: 65, name: '学生', itemStyle: { color: '#FEE08B' } },
          { value: 56, name: '其他', itemStyle: { color: '#A6D96A' } }
        ]
      }]
    });
  } catch (e) { console.error('chartSuzhouPlayer', e); }
  
  // chartPersistence - 持久性矩阵热力图
  try {
    var chart = echarts.init(document.getElementById('chartPersistence'));
    charts.chartPersistence = chart;
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { confine: true, backgroundColor: 'rgba(0,104,55,0.92)', borderColor: '#D9EF8B', textStyle: { color: '#FFFFBF' } },
      grid: { left: '15%', right: '10%', top: '10%', bottom: '15%' },
      xAxis: {
        type: 'category', data: ['1月', '3月', '6月', '9月', '12月', '15月', '18月', '24月', '30月'],
        axisLine: { lineStyle: { color: 'rgba(254,224,139,0.3)' } },
        axisLabel: { color: '#FFFFBF', fontSize: mFont(10) }
      },
      yAxis: {
        type: 'category', data: ['淄博烧烤', '哈尔滨冰雪', '天水麻辣烫', '村超', '苏超'],
        axisLine: { show: false },
        axisLabel: { color: '#FFFFBF', fontSize: mFont(10) },
        splitArea: { show: true, areaStyle: { color: ['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.1)'] } }
      },
      visualMap: {
        min: 0, max: 100, calculable: false, orient: 'horizontal', left: 'center', bottom: '2%',
        textStyle: { color: '#FFFFBF' },
        inRange: { color: ['#A50026', '#FDAE61', '#FFFFBF', '#66BD63'] },
        text: ['高', '低'], itemWidth: 12, itemHeight: 80
      },
      series: [{
        type: 'heatmap',
        data: [
          [0,0,100],[1,0,60],[2,0,20],[3,0,5],[4,0,2],[5,0,1],[6,0,0],[7,0,0],[8,0,0],
          [0,1,10],[1,1,30],[2,1,80],[3,1,100],[4,1,40],[5,1,20],[6,1,10],[7,1,5],[8,1,2],
          [0,2,0],[1,2,10],[2,2,100],[3,2,50],[4,2,20],[5,2,8],[6,2,3],[7,2,1],[8,2,0],
          [0,3,15],[1,3,30],[2,3,55],[3,3,70],[4,3,85],[5,3,90],[6,3,92],[7,3,95],[8,3,98],
          [0,4,0],[1,4,5],[2,4,25],[3,4,60],[4,4,85],[5,4,92],[6,4,95],[7,4,96],[8,4,97]
        ],
        label: { show: true, color: '#FFFFBF', fontSize: mFont(10) },
        itemStyle: { borderColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderRadius: 4 }
      }]
    });
  } catch (e) { console.error('chartPersistence', e); }
  
'''
        content = content[:resize_pos] + new_charts + content[resize_pos:]
    
    # ============ 保存文件 ============
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # 验证修改
    changes = []
    if 'id="ch1"' in content and 'id="ch1" class="section"' in content:
        changes.append("ch1 (土壤) 已创建")
    if 'id="ch2"' in content:
        changes.append("ch2 (萌芽) 已创建")
    if 'id="ch3"' in content:
        changes.append("ch3 (破圈) 已创建")
    if 'id="ch4"' in content:
        changes.append("ch4 (比较) 已创建")
    if 'id="ch5"' in content:
        changes.append("ch5 (生长) 已创建")
    if 'id="ch6"' in content:
        changes.append("ch6 (根系) 已创建")
    if 'id="ch7"' in content:
        changes.append("ch7 (瓶颈) 已创建")
    if 'id="ch8"' in content:
        changes.append("ch8 (出海) 已创建")
    if 'id="ch9"' in content:
        changes.append("ch9 (评估) 已创建")
    if 'id="ch10"' in content:
        changes.append("ch10 (超时代) 已创建")
    if 'id="attempts"' not in content:
        changes.append("attempts 已删除")
    if 'id="dataNarrative"' not in content:
        changes.append("dataNarrative 已删除")
    if 'chartAttempts' not in content:
        changes.append("chartAttempts JS已删除")
    if 'chartSuzhouPlayer' in content:
        changes.append("chartSuzhouPlayer JS已添加")
    if 'chartPersistence' in content:
        changes.append("chartPersistence JS已添加")
    
    return {"status": "success", "changes": changes, "file_size": len(content), "original_size": len(original)}
