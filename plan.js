import fs from "node:fs";
import path from "node:path";
import {
  AlignmentType,
  Document,
  Footer,
  Header,
  HeadingLevel,
  ImportedXmlComponent,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  convertInchesToTwip,
} from "docx";

const outputPath = process.argv[2];
if (!outputPath) {
  throw new Error("Usage: node plan.js /absolute/path/output.docx");
}

const T = String.raw;

const palette = {
  dark: "1a3a1a",
  primary: "2d5a1e",
  accent: "e8a820",
  light: "8da680",
  border: "c8d6c0",
  fill: "f0f5ee",
  white: "f0f5ee",
};

const font = { name: "Times New Roman", eastAsia: "SimSun" };
const run = (text, options = {}) => new TextRun({ text, font, size: 24, ...options });
const para = (children, options = {}) => new Paragraph({
  spacing: { after: 160, line: 300 },
  ...options,
  children: Array.isArray(children) ? children : [children],
});
const p = (text, options = {}) => para(run(text), { indent: { firstLine: convertInchesToTwip(0.33) }, ...options });
const h1 = (text) => para(run(text, { bold: true, size: 32, color: palette.dark }), {
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 360, after: 180 },
});
const h2 = (text) => para(run(text, { bold: true, size: 28, color: palette.primary }), {
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 280, after: 140 },
});
const h3 = (text) => para(run(text, { bold: true, size: 26, color: palette.dark }), {
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 200, after: 100 },
});
const note = (text) => para(run(text, { italics: true, color: palette.light, size: 22 }), { spacing: { before: 80, after: 80 } });

const cell = (text, options = {}) => new TableCell({
  children: [para(run(text, { size: 22 }))],
  margins: { top: 100, bottom: 100, left: 100, right: 100 },
  ...options,
});

const headerCell = (text, w) => cell(text, {
  shading: { type: ShadingType.CLEAR, fill: palette.fill },
  width: { size: w, type: WidthType.DXA },
});

const xmlEscape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const toc = (entries) => {
  const cached = entries.map(({ title: t, level, page }) => {
    const indent = Math.max(0, level - 1) * 360;
    return `<w:p><w:pPr><w:pStyle w:val="TOC${level}"/><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="9000"/></w:tabs><w:ind w:left="${indent}"/></w:pPr><w:r><w:t>${xmlEscape(t)}</w:t></w:r><w:r><w:tab/></w:r><w:r><w:t>${xmlEscape(page)}</w:t></w:r></w:p>`;
  }).join("");
  return ImportedXmlComponent.fromXmlString(`<w:sdt xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:sdtPr><w:alias w:val="目录"/></w:sdtPr><w:sdtContent><w:p><w:r><w:fldChar w:fldCharType="begin" w:dirty="true"/><w:instrText xml:space="preserve"> TOC \\o &quot;1-3&quot; \\h \\z \\u </w:instrText><w:fldChar w:fldCharType="separate"/></w:r></w:p>${cached}<w:p><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p></w:sdtContent></w:sdt>`).root[0];
};

const sections = [
  { title: "一、项目概述", level: 1, page: 3 },
  { title: "1.1 项目背景", level: 2, page: 3 },
  { title: "1.2 核心定位", level: 2, page: 4 },
  { title: "1.3 目标受众", level: 2, page: 4 },
  { title: "二、内容架构设计", level: 1, page: 5 },
  { title: "2.1 叙事主线", level: 2, page: 5 },
  { title: "2.2 页面模块划分", level: 2, page: 6 },
  { title: "2.3 信息层级设计", level: 2, page: 7 },
  { title: "三、数据维度与可视化策略", level: 1, page: 8 },
  { title: "3.1 时间维度数据", level: 2, page: 8 },
  { title: "3.2 空间维度数据", level: 2, page: 9 },
  { title: "3.3 对比维度数据", level: 2, page: 10 },
  { title: "3.4 人物维度数据", level: 2, page: 11 },
  { title: "3.5 可视化图表清单", level: 2, page: 12 },
  { title: "四、核心交互设计", level: 1, page: 13 },
  { title: "4.1 中国X超联赛热度扩散地图", level: 2, page: 13 },
  { title: "4.2 全球来榕江国际足球交流网络", level: 2, page: 14 },
  { title: "4.3 人物故事交互卡片", level: 2, page: 15 },
  { title: "4.4 数据滚动与动效", level: 2, page: 16 },
  { title: "4.5 章节导航与进度", level: 2, page: 17 },
  { title: "五、视觉设计规范", level: 1, page: 18 },
  { title: "5.1 色彩体系", level: 2, page: 18 },
  { title: "5.2 字体规范", level: 2, page: 19 },
  { title: "5.3 图片素材策略", level: 2, page: 19 },
  { title: "5.4 足球元素融入", level: 2, page: 20 },
  { title: "六、技术实现方案", level: 1, page: 21 },
  { title: "6.1 前端框架", level: 2, page: 21 },
  { title: "6.2 地图技术", level: 2, page: 22 },
  { title: "6.3 动画与动效", level: 2, page: 23 },
  { title: "6.4 性能优化", level: 2, page: 24 },
  { title: "6.5 响应式适配", level: 2, page: 24 },
  { title: "七、制作流程与分工", level: 1, page: 25 },
  { title: "7.1 阶段划分", level: 2, page: 25 },
  { title: "7.2 人员分工", level: 2, page: 26 },
  { title: "7.3 时间节点", level: 2, page: 27 },
];

const children = [
  para(run(T`踢出"超"时代——中国草根足球联赛数据新闻`, { bold: true, size: 40, color: palette.dark }), {
    alignment: AlignmentType.CENTER, spacing: { after: 240 },
  }),
  para(run(T`网页制作方案`, { bold: true, size: 36, color: palette.accent }), {
    alignment: AlignmentType.CENTER, spacing: { after: 480 },
  }),
  para(run(T`V1.0 | 2026年7月`, { size: 22, color: palette.light }), { alignment: AlignmentType.CENTER, spacing: { after: 600 } }),
  h1("目录"),
  note(T`右键目录，选择"更新域"刷新页码。`),
  toc(sections.map(s => ({ title: s.title, level: s.level, page: s.page }))),
];

// Section 1
children.push(h1("一、项目概述"));
children.push(h2("1.1 项目背景"));
children.push(p(T`2023年5月13日，贵州榕江（三宝侗寨）和美乡村足球超级联赛（简称"村超"）正式开赛。这场由村民自发筹办、零薪酬参赛的草根足球赛事，迅速从县域走向全国，进而引发国际关注。至2025年，全国已有19个省份推出省级草根足球联赛（统称"X超"），覆盖284个地级市、1.2万支基层球队，参赛草根球员突破12.7万人。`));
children.push(p(T`2025年6月，榕江遭遇特大洪灾，村超球场一度被淤泥淹没。然而仅仅一个月后，清淤修复、全民抢工同步完成，7月26日感恩专场比赛如期举行，18万民众涌入小城，球场重新亮起灯光。这场泥地里诞生的民间赛事，在洪灾考验后愈发坚韧，一脚开出跨越全国的时代长传。`));
children.push(p(T`本数据新闻项目旨在通过强交互、高可视化的网页形式，全景式呈现中国草根足球联赛从"村超"原点向全国燎原的壮阔历程，揭示群众体育、县域经济、地域文化共生共振的深层逻辑，并展望2028年村超世界杯的国际化蓝图。`));

children.push(h2("1.2 核心定位"));
children.push(p(T`本项目定位为"沉浸式数据叙事长文"，以"一个原点、三层扩散、四力共振、万里长传"为叙事逻辑，融合滚动驱动动画、交互地图、数据可视化、人物故事卡片等多元媒介形式，打造国内首个以草根足球联赛为主题的全交互数据新闻产品。`));
children.push(p(T`核心卖点：`));
children.push(p(T`（1）首创中国"X超"联赛热度扩散交互地图，以真实GeoJSON底图呈现19省热度扩散路径；`));
children.push(p(T`（2）构建全球草根足球交流网络可视化，展示50余国参与的民间体育外交；`));
children.push(p(T`（3）设计8位典型人物故事交互卡片，以第一人称视角讲述草根足球人的真实故事；`));
children.push(p(T`（4）运用足球场配色体系与足球元素动效，营造沉浸式绿茵场体验。`));

children.push(h2("1.3 目标受众"));
children.push(p(T`主要受众：25-45岁城市白领、体育爱好者、数据新闻从业者、媒体研究者、政策制定者。`));
children.push(p(T`次要受众：大学生群体、县域经济研究者、文旅行业从业者、国际体育组织关注者。`));
children.push(p(T`用户预期：通过15-20分钟的沉浸式阅读体验，获得对中国草根足球联赛生态的系统性认知，感受数据背后的人情温度与时代脉搏。`));

// Section 2
children.push(h1("二、内容架构设计"));
children.push(h2("2.1 叙事主线"));
children.push(p(T`全文采用"五章长传"叙事结构，对应足球战术中的五个位置角色：`));
children.push(p(T`第一章：泥地足球——守门员（原点坚守）。以榕江村超为叙事原点，从洪水废墟中的坚守讲起，呈现村民自发办赛的原始生态、草坪市集县域经济链、三年文旅客流与就业数据复盘。`));
children.push(p(T`第二章：边路爆点——边锋（单点突破）。聚焦江苏苏超的省级产业化模式，对比村超的乡村内生模式与苏超的省级产业模式，呈现"小店平等入场"的商业创新。`));
children.push(p(T`第三章：全攻全守——前锋群（多点开花）。展示19省X超联赛遍地开花的区域差异化办赛特色，从东部城市竞技赛道到北方跨省联动赛道，再到西南市井烟火赛道。`));
children.push(p(T`第四章：中场盘带——中场核心（四力共振）。解析群众、政府、市场、文化四股力量如何共生共振，托举全民足球热潮。`));
children.push(p(T`第五章：万里长传——前锋（全球射门）。展望2028村超世界杯，呈现草根足球国际化三步走规划与四级全民足球赛事体系。`));

children.push(h2("2.2 页面模块划分"));

const moduleWidths = [2200, 3800, 2200];
const moduleHeader = (text, w) => headerCell(text, w);
const moduleTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: moduleWidths,
  rows: [
    new TableRow({ children: [moduleHeader("模块", moduleWidths[0]), moduleHeader("功能说明", moduleWidths[1]), moduleHeader("交互类型", moduleWidths[2])] }),
    new TableRow({ children: [cell("封面/加载页"), cell("项目标题、主题视觉、加载进度"), cell("全屏动画+进度条")] }),
    new TableRow({ children: [cell("序言"), cell("洪水后村超复赛的背景故事，引入"从洪水中归来"的情绪锚点"), cell("视差滚动+文字动画")] }),
    new TableRow({ children: [cell("第一章"), cell("村超起源数据、赛事原生数据、市集经济数据、三年复盘"), cell("数据图表+地图热力点")] }),
    new TableRow({ children: [cell("第二章"), cell("苏超规模数据、创新模式、传播流量与产业效益"), cell("对比图表+票根消费乘数可视化")] }),
    new TableRow({ children: [cell("第三章"), cell("19省联赛区域划分、核心数据汇总、四大赛道特色"), cell("中国热度扩散地图+飞线动画")] }),
    new TableRow({ children: [cell("第四章"), cell("群众/政府/市场/文化四力耦合逻辑"), cell("四象限雷达图+联动交互")] }),
    new TableRow({ children: [cell("第五章"), cell("国际化三步走、2028世界杯配套、四级赛事体系"), cell("世界地图+时间轴动画")] }),
    new TableRow({ children: [cell("人物卡片"), cell("8位典型人物故事，嵌入各章节"), cell("点击弹窗+照片轮播")] }),
    new TableRow({ children: [cell("导航栏"), cell("章节快速跳转、进度指示、收藏分享"), cell("固定导航+滚动联动")] }),
  ],
});
children.push(moduleTable);

children.push(h2("2.3 信息层级设计"));
children.push(p(T`采用"数据层-叙事层-情感层"三层信息架构：`));
children.push(p(T`数据层（底层骨架）：所有核心数据以图表、地图、数字形式直观呈现，确保数据的可读性与准确性。包括2300万人次游客、270亿元旅游收入、620亿次全网播放、880亿元综合消费等关键指标。`));
children.push(p(T`叙事层（中层血肉）：以五章结构串联数据点，通过故事钩子（故事钩子.docx）将冰冷数据转化为有温度的叙事。每个章节设置2-3个故事锚点，如董永恒的卷粉与金靴、东哈烧烤的平等入场、六万人齐诵《滕王阁序》等。`));
children.push(p(T`情感层（顶层灵魂）：通过足球场视觉氛围、人物面孔特写、乡音方言音频、烟火气场景照片，营造"草根足球=人民热爱"的情感共鸣。`));

// Section 3
children.push(h1("三、数据维度与可视化策略"));
children.push(h2("3.1 时间维度数据"));
children.push(p(T`时间维度覆盖2023-2028年，分为三个阶段：`));
children.push(p(T`（1）起源期（2023-2024）：村超从民间自发赛事到全网爆火的数据曲线。关键节点：2023年5月13日首届开赛、2024年全网话题浏览量突破1000亿次、海外传播覆盖50余国。`));
children.push(p(T`（2）扩散期（2024-2026）：19省调研转化、省级联赛落地。关键数据：37批次600人调研团队赴榕江、19省中16省完成成果转化（转化率84.2%）、全赛季2100场比赛、2800万现场观众。`));
children.push(p(T`（3）展望期（2026-2028）：国际化三步走与村超世界杯。关键规划：2026年"一带一路"全民足球友谊赛（43国参与）、2028年首届村超世界杯（预计吸引120万人次入境游客、160亿元旅游收入）。`));
children.push(p(T`可视化形式：横向时间轴+滚动动画，关键节点以足球图标锚定，鼠标悬停显示详细数据面板。`));

children.push(h2("3.2 空间维度数据"));
children.push(p(T`空间维度从县域到全球五个层级：`));
children.push(p(T`（1）县域层级：榕江县38.5万人口、607名草根球员、286个免费市集摊位、98场全年常赛。`));
children.push(p(T`（2）市级层级：284个地级市、1.2万支基层球队、3400场年均市域业余联赛。`));
children.push(p(T`（3）省级层级：19省标准化X超联赛，划分为东部赛区（5省）、中部赛区（4省）、北方赛区（4省）、西南华南赛区（6省市）。`));
children.push(p(T`（4）全国层级：全国群众足球年度总决赛、四级赛事体系、620亿次全网播放。`));
children.push(p(T`（5）国际层级：50余国传播覆盖、12亿次海外播放、2028年世界杯预计覆盖80国以上。`));
children.push(p(T`可视化形式：中国地图热力图（ECharts + DataV GeoJSON）+ 世界地图网络图（D3.js或ECharts GL）。`));

children.push(h2("3.3 对比维度数据"));
children.push(p(T`全文设置三组核心对比：`));
children.push(p(T`（1）村超（乡村内生模式） vs 苏超（省级产业模式）：运营主体、消费范围、文化内核、流量工具、赛事总营收、单场平均上座、球员草根占比、适配场景等8个维度对比。`));
children.push(p(T`（2）四大区域差异化对比：东部城市竞技赛道（鲁超、浙超、粤超）vs 北方跨省联动赛道（东北超）vs 中部红色非遗赛道（赣超、湘超）vs 西南市井烟火赛道（渝超、川超）。`));
children.push(p(T`（3）票根消费乘数按联赛层级对比：苏超1:7.3、湘超1:6.1、赣超1:5.2、东北超1:4.8，揭示区域经济发展水平与流量转化效率的关系。`));
children.push(p(T`可视化形式：雷达图、平行坐标图、桑基图、哑铃图。`));

children.push(h2("3.4 人物维度数据"));
children.push(p(T`精选8位典型人物，覆盖全产业链角色：`));
children.push(p(T`（1）球员代表：董永恒（卷粉摊主→金靴射手→足球顾问）、小李（快递员→苏州队边锋）。`));
children.push(p(T`（2）商户代表：东哈·东北烧烤店老板娘（个体户赞助商）、刘勤兰（蜡染手艺人→国际创业者）。`));
children.push(p(T`（3）组织者代表：榕江县委书记徐勃（治理逻辑）、南昌周老师（教师联赛组织者）。`));
children.push(p(T`（4）群众代表：大连王哥（公益车队司机）、永州球迷（挂票发明者）。`));
children.push(p(T`可视化形式：人物肖像卡片（点击弹窗）+ 故事时间轴 + 引语高亮。`));

children.push(h2("3.5 可视化图表清单"));
const chartWidths = [1600, 2600, 1600, 1600];
const chartHeader = (text, w) => headerCell(text, w);
const chartTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: chartWidths,
  rows: [
    new TableRow({ children: [chartHeader("图表名称", chartWidths[0]), chartHeader("数据内容", chartWidths[1]), chartHeader("技术方案", chartWidths[2]), chartHeader("所在章节", chartWidths[3])] }),
    new TableRow({ children: [cell("三年文旅数据趋势图"), cell("2023-2025年游客人次、旅游收入、同比增幅"), cell("ECharts折线+柱状混合图"), cell("第一章")] }),
    new TableRow({ children: [cell("市集营收构成饼图"), cell("农特产52.8%、手工艺品23.9%、餐饮23.3%"), cell("ECharts玫瑰饼图"), cell("第一章")] }),
    new TableRow({ children: [cell("中国X超热度扩散地图"), cell("19省热度指数、扩散飞线、城市坐标"), cell("ECharts map + DataV GeoJSON"), cell("第三章")] }),
    new TableRow({ children: [cell("国际交流网络世界地图"), cell("50余国传播节点、43国友谊赛参与"), cell("ECharts world map + GL"), cell("第五章")] }),
    new TableRow({ children: [cell("村超vs苏超对比雷达图"), cell("8维度对比：运营、消费、文化、营收等"), cell("ECharts雷达图"), cell("第二章")] }),
    new TableRow({ children: [cell("票根消费乘数对比图"), cell("四大联赛乘数比与平均带动消费"), cell("ECharts柱状图+折线"), cell("第二章/三")] }),
    new TableRow({ children: [cell("四力耦合象限图"), cell("群众/政府/市场/文化四力耦合度"), cell("D3.js力导向图"), cell("第四章")] }),
    new TableRow({ children: [cell("四级赛事体系金字塔"), cell("村镇/地市/省级/全国四级赛事规模"), cell("CSS/SVG动画金字塔"), cell("第五章")] }),
    new TableRow({ children: [cell("人物故事时间轴"), cell("8位人物关键事件节点"), cell("GSAP滚动时间轴"), cell("全篇")] }),
    new TableRow({ children: [cell("就业数据桑基图"), cell("赛事→直接就业→间接就业→灵活就业"), cell("ECharts桑基图"), cell("第一章")] }),
  ],
});
children.push(chartTable);

// Section 4
children.push(h1("四、核心交互设计"));
children.push(h2("4.1 中国X超联赛热度扩散地图"));
children.push(p(T`技术方案：基于ECharts 5.5.0 + 阿里DataV GeoJSON真实中国省份边界数据。`));
children.push(p(T`视觉设计：深绿色足球场主题背景（参考map_demo.html），省份填充色为#1a3a1a（暗绿），边框为rgba(255,255,255,0.15)，高亮区域为#2d5a1e。`));
children.push(p(T`数据层：`));
children.push(p(T`（1）热力点：19个省份以散点形式标注，点大小与热度指数成正比（symbolSize = v * 0.28 + 6）。颜色分级：≥85为红色（#e05020）、65-84为金色（#e8a820）、50-64为浅金（#f5c842）、<50为绿色（#4a8c34）。`));
children.push(p(T`（2）扩散飞线：从贵州榕江（起源地）向江苏苏超（第一扩散点）发射红色高亮飞线；从苏超向其他省份发射金色飞线，动态展示热度扩散路径。飞线使用lines系列，effect开启箭头动画，period=4秒，trailLength=0.2。`));
children.push(p(T`（3）交互行为：鼠标悬停显示tooltip（背景rgba(10,31,10,0.92)，边框金色半透明），展示省份名称、热度指数、核心数据；支持地图缩放（roam=true）、拖拽平移；点击省份可下钻至该省详细数据面板。`));
children.push(p(T`（4）动画效果：页面滚动至地图区域时，热力点从中心向外脉冲扩散；飞线依次出现，模拟病毒式传播效果。`));

children.push(h2("4.2 全球来榕江国际足球交流网络"));
children.push(p(T`技术方案：ECharts world map（或D3.js + topojson）+ 动态粒子效果。`));
children.push(p(T`数据层：`));
children.push(p(T`（1）全球节点：50余国传播覆盖以圆形节点标注，节点大小与海外播放量成正比。核心节点：中国（榕江，原点）、东南亚/中亚/非洲（2026年友谊赛71%参赛队来源）、欧洲（足球文化输出地）。`));
children.push(p(T`（2）交流路径：以弧线连接中国与各参与国家，线条粗细与文化交流频次成正比。2024年首届国际草根友谊赛（12国驻华业余球队）→ 2026年"一带一路"友谊赛（43国）→ 2028年世界杯（全球）。`));
children.push(p(T`（3）交互行为：鼠标悬停国家节点显示该国参与数据（如2025年入境榕江游客3.7万人次，来自哪些国家）；点击节点展开该国的村超传播故事（如英国游客、东南亚球迷等）；支持360度旋转地球视角。`));
children.push(p(T`（4）视觉风格：深色宇宙背景（#0a1f0a渐变），地球陆地用足球场绿色纹理，海洋用深绿色，航线用金色发光线条，营造"足球星球"的科幻感。`));

children.push(h2("4.3 人物故事交互卡片"));
children.push(p(T`设计8位典型人物的交互卡片，嵌入各章节相关位置：`));
children.push(p(T`（1）卡片外观：矩形卡片，顶部为人物照片（建议尺寸400x300px），底部为姓名、身份标签、一句引语。背景为深绿色渐变，边框1px金色半透明。`));
children.push(p(T`（2）悬停效果：鼠标悬停时卡片轻微上浮（translateY -8px），阴影增强，照片区域叠加半透明绿茵场纹理。`));
children.push(p(T`（3）点击弹窗：点击卡片后弹出全屏/半屏模态框，包含：人物大头照、详细故事文本（500-800字）、关键数据（如进球数、经营数据、带动就业人数等）、2-3张生活/工作照片轮播、引语高亮。`));
children.push(p(T`（4）人物列表：`));
children.push(p(T`• 董永恒：卷粉摊主→金靴射手。照片占位：凌晨4点做卷粉的工作照、赛场进球瞬间、与小学生踢球的照片。`));
children.push(p(T`• 徐勃：县委书记。照片占位：球场调研照、与村民交流照、洪水后清淤现场照。`));
children.push(p(T`• 东哈烧烤老板娘：个体户赞助商。照片占位：烧烤店门头照、赛场广告牌照、日常经营照。`));
children.push(p(T`• 周老师：南昌历史教师。照片占位：带领学生朗诵《滕王阁序》照、组织教师联赛照、赛场照片。`));
children.push(p(T`• 永州球迷：挂票发明者。照片占位：爬墙看球照片、自带板凳照、球场相亲角照片。`));
children.push(p(T`• 湖北球迷：小龙虾主题。照片占位：黄石vs潜江比赛照、小龙虾主题美食照、城市德比现场。`));
children.push(p(T`• 大连王哥：公益车队。照片占位：出租车队照片、跨省观赛照、景区游览照。`));
children.push(p(T`• 刘勤兰：蜡染手艺人。照片占位：蜡染作品照、学英语场景照、接待外国游客照。`));
children.push(note(T`照片素材建议从事例.docx中提取，或由用户提供。若无法直接插入，以[照片占位：人物名称+场景描述]标注。`));

children.push(h2("4.4 数据滚动与动效"));
children.push(p(T`全局采用滚动驱动动画（Scroll-driven Animation）策略：`));
children.push(p(T`（1）数字滚动：关键数据（如2300万人次、270亿元、12.7万球员）在进入视口时触发数字递增动画，从0滚动至目标值，持续时间2秒，使用requestAnimationFrame实现流畅帧率。`));
children.push(p(T`（2）视差滚动：背景层（足球场纹理、观众席照片）以0.3倍速滚动，内容层以1倍速滚动，前景层（足球元素装饰）以1.5倍速滚动，营造景深层次感。`));
children.push(p(T`（3）章节过渡：每章开头使用全屏视频/动图作为背景（如村超赛场航拍、观众欢呼、烟火市集），文字从底部滑入，配合足球飞过的SVG路径动画。`));
children.push(p(T`（4）图表动画：所有ECharts图表在首次进入视口时触发入场动画（数据从底部升起、饼图扇区依次展开、地图热力点脉冲扩散）。`));
children.push(p(T`（5）加载动效：封面页设计足球旋转 loading，配合"正在加载数据..."文字，进度条以足球场草坪纹理填充。`));

children.push(h2("4.5 章节导航与进度"));
children.push(p(T`（1）固定导航栏：页面左侧或右侧固定悬浮导航，显示五章标题（守门员/边锋/前锋群/中场/射门），当前章节以金色高亮，已完成章节以绿色标记，未读章节以灰色显示。`));
children.push(p(T`（2）进度指示器：导航栏旁附垂直进度条，以足球场草坪纹理填充，高度对应阅读进度。`));
children.push(p(T`（3）快速跳转：点击导航项平滑滚动至对应章节，滚动时间800ms，使用GSAP ScrollToPlugin。`));
children.push(p(T`（4）章节标题动效：每章标题出现时，以足球射门轨迹SVG动画为背景，文字从虚化到清晰，配合哨声音效（可选）。`));

// Section 5
children.push(h1("五、视觉设计规范"));
children.push(h2("5.1 色彩体系"));
children.push(p(T`以"足球场夜色"为核心视觉意象，构建低饱和度、高对比度的深绿色调体系：`));
const colorWidths = [2000, 2000, 2000, 2400];
const colorTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: colorWidths,
  rows: [
    new TableRow({ children: [headerCell("角色", colorWidths[0]), headerCell("色值", colorWidths[1]), headerCell("用途", colorWidths[2]), headerCell("对应场景", colorWidths[3])] }),
    new TableRow({ children: [cell("主背景色"), cell("#0a1f0a"), cell("页面底色、导航栏背景"), cell("深夜足球场草坪")] }),
    new TableRow({ children: [cell("次背景色"), cell("#1a3a1a"), cell("卡片背景、图表底色"), cell("球场灯光下的草地")] }),
    new TableRow({ children: [cell("高亮背景色"), cell("#2d5a1e"), cell("悬停状态、选中状态"), cell("球员跑动热区")] }),
    new TableRow({ children: [cell("主文字色"), cell("#f0f5ee"), cell("正文、标题"), cell("球场照明灯光")] }),
    new TableRow({ children: [cell("次文字色"), cell("#c8d6c0"), cell("注释、辅助文字"), cell("远处看台灯光")] }),
    new TableRow({ children: [cell("弱化文字色"), cell("#8da680"), cell("标签、时间戳"), cell("球场边缘暗区")] }),
    new TableRow({ children: [cell("强调色"), cell("#e8a820"), cell("数据高亮、按钮、图标"), cell("进球瞬间的金色火花")] }),
    new TableRow({ children: [cell("次强调色"), cell("#f5c842"), cell("次级数据、飞线动画"), cell("庆祝烟花")] }),
    new TableRow({ children: [cell("警示色"), cell("#e05020"), cell("最高热度、紧急数据"), cell("红牌、球门网")] }),
  ],
});
children.push(colorTable);
children.push(p(T`配色原则：背景以深绿色为主（占比70%），文字以暖白色为主（占比20%），金色作为点缀（占比10%）。避免使用纯黑（#000000）和纯红（#FF0000），所有颜色带有一点暖调，确保长时间阅读的舒适性。`));

children.push(h2("5.2 字体规范"));
children.push(p(T`（1）标题字体：使用"DIN Alternate"或"Impact"作为英文数字标题字体，中文使用"PingFang SC"（苹方）或"Noto Sans SC"（思源黑体）。H1字号48-60px，H2字号32-40px，H3字号24-28px。`));
children.push(p(T`（2）正文字体：中文"PingFang SC" / "Microsoft YaHei"，英文"SF Pro Text" / "Helvetica Neue"。正文16-18px，行高1.8，段间距1.5em。`));
children.push(p(T`（3）数字字体：所有数据数字使用"DIN Alternate"或"Roboto Mono"等等宽字体，确保对齐整齐。大号数据（如2300万）使用60-80px，配合金色渐变。`));
children.push(p(T`（4）引语字体：人物引语使用楷体或仿宋（"KaiTi" / "STKaiti"），字号20px，斜体，左侧加3px金色竖线。`));

children.push(h2("5.3 图片素材策略"));
children.push(p(T`（1）足球场全景航拍：作为每章过渡页的全屏背景，要求4K分辨率、夜间灯光效果，航拍视角包含球场、观众席、市集。`));
children.push(p(T`（2）人物肖像照：8位典型人物的工作照、生活照、赛场照，要求自然光、真实感、不摆拍。建议从事例.docx中提取。`));
children.push(p(T`（3）市集烟火照片：卷粉摊位、蜡染手工艺品、烧烤摊位、球迷互动场景，要求暖色调、高饱和度、体现生活气息。`));
children.push(p(T`（4）赛事动作照片：草根球员射门、扑救、庆祝瞬间，啦啦队表演、中场非遗展演，要求动态模糊、真实感。`));
children.push(p(T`（5）足球元素装饰：足球纹理（用于卡片背景、按钮）、球门框（用于章节分隔线）、草坪纹理（用于进度条、加载条）、角旗（用于列表标记）。`));
children.push(p(T`（6）SVG图标：自定义足球图标（用于导航标记、地图锚点）、哨子图标（用于章节标题）、奖杯图标（用于数据高亮）。`));

children.push(h2("5.4 足球元素融入"));
children.push(p(T`（1）鼠标光标：自定义足球形状光标，悬停在可交互元素时变为球门形状。`));
children.push(p(T`（2）页面角落：右下角固定悬浮一个旋转的足球SVG，点击可快速返回顶部。`));
children.push(p(T`（3）章节分隔：每章之间使用"球门框"SVG作为视觉分隔线，配合足球飞入的Lottie动画。`));
children.push(p(T`（4）数据高亮：关键数字出现时，伴随一个足球从左侧飞入、撞击数字后数字变为金色的动画。`));
children.push(p(T`（5）加载状态：所有加载等待状态使用足球旋转动画，而非传统spinner。`));
children.push(p(T`（6）背景纹理：页面背景叠加微弱的足球场草坪纹理（repeating-linear-gradient模拟草皮条纹），透明度控制在3%以内，避免干扰阅读。`));

// Section 6
children.push(h1("六、技术实现方案"));
children.push(h2("6.1 前端框架"));
children.push(p(T`（1）基础框架：原生HTML5 + CSS3 + ES6+，不依赖重型前端框架（如React/Vue），以确保页面加载速度和SEO友好性。`));
children.push(p(T`（2）构建工具：Vite 作为构建工具，支持热更新、CSS预处理器（Sass/SCSS）、资源优化。`));
children.push(p(T`（3）滚动动画库：GSAP（GreenSock Animation Platform）+ ScrollTrigger插件，用于滚动驱动动画、视差效果、时间轴控制。`));
children.push(p(T`（4）图表库：ECharts 5.5.0（中国地图、世界地图、折线图、柱状图、雷达图、桑基图），D3.js 7.x（力导向图、自定义拓扑图）。`));
children.push(p(T`（5）地图数据：中国地图使用阿里DataV GeoJSON（https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json），世界地图使用ECharts内置world.js或 Natural Earth TopoJSON。`));

children.push(h2("6.2 地图技术"));
children.push(p(T`中国热度扩散地图：`));
children.push(p(T`（1）底图加载：fetch异步加载DataV GeoJSON → echarts.registerMap('china', geoJSON)注册 → series.type:'map'渲染底图。`));
children.push(p(T`（2）数据叠加：series.type:'scatter'叠加热力点（coordinateSystem:'geo'），series.type:'lines'叠加扩散飞线（effect开启箭头动画）。`));
children.push(p(T`（3）交互配置：geo.roam=true支持缩放拖拽，tooltip.formatter自定义提示框内容，emphasis.itemStyle配置高亮状态。`));
children.push(p(T`（4）性能优化：地图数据预加载，使用Web Worker处理GeoJSON解析；大分辨率屏幕使用LOD（Level of Detail）简化边界数据。`));
children.push(p(T`世界交流网络地图：`));
children.push(p(T`（1）底图选择：ECharts world map（精度足够）或 Three.js + D3-geo 3D地球（更震撼）。考虑到性能，推荐ECharts world map + 自定义投影。`));
children.push(p(T`（2）粒子效果：使用ECharts effectScatter实现国家节点脉冲效果，lines系列实现弧线交流路径，symbol:'arrow'配合trailLength实现流动效果。`));
children.push(p(T`（3）交互配置：支持地球旋转（autoRotate）、鼠标拖拽旋转、滚轮缩放，点击国家节点触发下钻面板。`));

children.push(h2("6.3 动画与动效"));
children.push(p(T`（1）滚动动画：使用GSAP ScrollTrigger，每个章节设置触发点（trigger），动画元素（数字、图表、图片）在进入视口80%时触发。`));
children.push(p(T`（2）数字动画：自定义NumberCounter类，使用requestAnimationFrame实现平滑递增，支持缓动函数（easeOutExpo）。`));
children.push(p(T`（3）SVG路径动画：使用GSAP DrawSVG插件或CSS stroke-dasharray/stroke-dashoffset实现足球飞行轨迹、球门框绘制动画。`));
children.push(p(T`（4）Lottie动画：封面足球旋转、章节过渡等复杂动画使用Lottie JSON，文件体积控制在50KB以内。`));
children.push(p(T`（5）CSS动画：悬停效果、卡片浮动、按钮发光等使用CSS transitions/keyframes，避免JavaScript动画的性能开销。`));

children.push(h2("6.4 性能优化"));
children.push(p(T`（1）懒加载：所有图片使用IntersectionObserver懒加载，首屏仅加载封面背景和第一章内容，后续章节滚动时异步加载。`));
children.push(p(T`（2）代码分割：按章节分割JS代码，使用Vite动态导入（import()），减少首屏bundle体积。`));
children.push(p(T`（3）资源压缩：图片使用WebP格式（质量85%），SVG使用svgo压缩，JSON数据使用gzip压缩。`));
children.push(p(T`（4）缓存策略：静态资源使用Service Worker缓存，GeoJSON数据缓存至IndexedDB，避免重复网络请求。`));
children.push(p(T`（5）目标性能指标：首屏加载时间（LCP）< 2.5秒，累积布局偏移（CLS）< 0.1，交互响应时间（FID）< 100ms。`));

children.push(h2("6.5 响应式适配"));
children.push(p(T`（1）桌面端（>=1200px）：完整布局，左侧固定导航+右侧内容区，地图占满视口宽度，图表并排展示。`));
children.push(p(T`（2）平板端（768px-1199px）：导航栏收缩为图标+悬浮展开，地图高度降低至50vh，图表改为单列堆叠。`));
children.push(p(T`（3）移动端（<768px）：导航栏隐藏为底部标签栏，地图改为横向滑动（不支持缩放），人物卡片改为全宽单列，弹窗改为底部抽屉（bottom sheet）。`));
children.push(p(T`（4）触摸适配：所有悬停效果在移动端转为点击触发，地图支持双指缩放，滚动动画阈值降低（避免小屏幕过度动画）。`));

// Section 7
children.push(h1("七、制作流程与分工"));
children.push(h2("7.1 阶段划分"));
const phaseWidths = [1600, 2400, 2000, 1600];
const phaseTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: phaseWidths,
  rows: [
    new TableRow({ children: [headerCell("阶段", phaseWidths[0]), headerCell("任务内容", phaseWidths[1]), headerCell("交付物", phaseWidths[2]), headerCell("周期", phaseWidths[3])] }),
    new TableRow({ children: [cell("策划阶段"), cell("内容架构确定、数据梳理、故事线设计"), cell("策划文档、数据清单"), cell("1周")] }),
    new TableRow({ children: [cell("设计阶段"), cell("视觉设计、UI稿、交互原型、动效设计"), cell("Figma稿、动效Demo"), cell("2周")] }),
    new TableRow({ children: [cell("开发阶段"), cell("前端开发、图表实现、地图集成、动画开发"), cell("可运行网页、代码仓库"), cell("3周")] }),
    new TableRow({ children: [cell("内容阶段"), cell("文本撰写、图片处理、视频剪辑、音频录制"), cell("内容素材包"), cell("2周")] }),
    new TableRow({ children: [cell("测试阶段"), cell("功能测试、兼容性测试、性能优化、内容校对"), cell("测试报告、修复清单"), cell("1周")] }),
    new TableRow({ children: [cell("上线阶段"), cell("部署上线、CDN配置、SEO优化、社交媒体预热"), cell("上线版本、推广素材"), cell("1周")] }),
  ],
});
children.push(phaseTable);

children.push(h2("7.2 人员分工"));
const roleWidths = [2000, 2600, 2600];
const roleTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: roleWidths,
  rows: [
    new TableRow({ children: [headerCell("角色", roleWidths[0]), headerCell("职责", roleWidths[1]), headerCell("产出", roleWidths[2])] }),
    new TableRow({ children: [cell("项目负责人"), cell("统筹进度、协调资源、质量把控、客户沟通"), cell("项目时间表、周报")] }),
    new TableRow({ children: [cell("数据编辑"), cell("数据清洗、核对、图表数据准备、数据源对接"), cell("数据清单、JSON数据包")] }),
    new TableRow({ children: [cell("内容编辑"), cell("文本撰写、故事线打磨、人物采访稿整理"), cell("章节文本、人物故事稿")] }),
    new TableRow({ children: [cell("视觉设计师"), cell("UI设计、配色方案、图标绘制、图片处理"), cell("Figma设计稿、切图资源")] }),
    new TableRow({ children: [cell("交互设计师"), cell("交互原型、动画规格、用户体验优化"), cell("Axure/Principle原型、动效Spec")] }),
    new TableRow({ children: [cell("前端工程师"), cell("页面开发、图表实现、地图集成、动画编码"), cell("HTML/CSS/JS代码、Git仓库")] }),
    new TableRow({ children: [cell("多媒体编辑"), cell("图片精修、视频剪辑、音频处理、Lottie制作"), cell("媒体素材包、Lottie JSON")] }),
  ],
});
children.push(roleTable);

children.push(h2("7.3 时间节点"));
children.push(p(T`总周期：10周（约2.5个月）。`));
children.push(p(T`第1周：策划定稿，数据全部到位，故事线确认。`));
children.push(p(T`第2-3周：视觉设计完成（封面、章节页、地图、图表、人物卡片），交互原型评审通过。`));
children.push(p(T`第4-6周：前端开发（核心页面、地图、图表、动画），每周迭代demo。`));
children.push(p(T`第7-8周：内容填充（文本、图片、视频、音频），人物故事卡内容制作。`));
children.push(p(T`第9周：测试优化（跨浏览器、跨设备、性能调优）。`));
children.push(p(T`第10周：上线发布，推广素材制作，社交媒体同步。`));

children.push(para(run(T`—— 方案完 ——`, { bold: true, size: 24, color: palette.light }), { alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 } }));

const doc = new Document({
  features: { updateFields: true },
  sections: [{
    properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    headers: { default: new Header({ children: [para(run(T`踢出"超"时代——数据新闻制作方案`, { bold: true, color: palette.primary }), { alignment: AlignmentType.CENTER })] }) },
    footers: { default: new Footer({ children: [para(new TextRun({ children: [PageNumber.CURRENT] }), { alignment: AlignmentType.CENTER })] }) },
    children,
  }],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outputPath, buffer);
