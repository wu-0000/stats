/* app.js：正式版完整資料
 * 使用方式：
 * 1. 你的 index.html 需有：<script src="app.js" defer></script>
 * 2. HTML 裡不要再寫 onclick
 * 3. 表格 tbody id 需要是 girlTableBody
 * 4. modal id 需要是 girlModal / modalGirlName / modalContent / modalOverlay / modalClose
 */

'use strict';

const girlRoster = [
    { id: "00", name: "琳妲" }, { id: "3", name: "穆又甯" }, { id: "6", name: "宋宋" },
    { id: "7", name: "筠熹" }, { id: "8", name: "貝佳頤" }, { id: "9", name: "高橋佳帆" },
    { id: "10", name: "卉妮" }, { id: "12", name: "穎樂" }, { id: "15", name: "孟潔" },
    { id: "17", name: "笑笑" }, { id: "18", name: "熊霓" }, { id: "19", name: "KIRA" },
    { id: "20", name: "MIKA" }, { id: "22", name: "河智媛" }, { id: "24", name: "廉世彬" },
    { id: "25", name: "禹洙漢" }, { id: "26", name: "高佳彬" }, { id: "27", name: "若潼" },
    { id: "33", name: "言梓璇" }, { id: "34", name: "金佳垠" }, { id: "36", name: "禹菡" },
    { id: "66", name: "岱縈" }, { id: "67", name: "崔荷潾" }, { id: "77", name: "曲曲" },
    { id: "87", name: "彭彭" }, { id: "88", name: "沈珈妤" }, { id: "97", name: "溫妮" }
];

const games = [
    { date: "2026-03-28", opp: "中信兄弟", res: "W", score: "2:3", info: { no: "001", location: "台北大巨蛋", time: "2H56M", audience: "40,000", wp: "陳冠宇", lp: "江忠誠", mvp: "陳晨威" } },
    { date: "2026-03-29", opp: "味全龍", res: "L", score: "3:2", info: { no: "003", location: "台北大巨蛋", time: "2H49M", audience: "17,329", wp: "梅賽鍶", lp: "艾菩樂", sv: "林凱威", mvp: "曾聖安" } },
    { date: "2026-03-31", opp: "台鋼雄鷹", res: "L", score: "3:1" },
    { date: "2026-04-01", opp: "台鋼雄鷹", res: "L", score: "6:1" },
    { date: "2026-04-10", opp: "中信兄弟", res: "W", score: "2:4" },
    { date: "2026-04-11", opp: "中信兄弟", res: "W", score: "1:2" },
    { date: "2026-04-12", opp: "中信兄弟", res: "L", score: "14:4" },
    { date: "2026-04-15", opp: "統一獅", res: "L", score: "5:1" },
    { date: "2026-04-16", opp: "統一獅", res: "L", score: "7:3" },
    { date: "2026-04-21", opp: "富邦悍將", res: "W", score: "1:6" },
    { date: "2026-04-22", opp: "富邦悍將", res: "W", score: "2:4" },
    { date: "2026-04-24", opp: "味全龍", res: "延賽", score: "-" },
    { date: "2026-04-25", opp: "味全龍", res: "L", score: "4:1" },
    { date: "2026-04-26", opp: "味全龍", res: "W", score: "2:3" },
    { date: "2026-05-08", opp: "統一獅", res: "-", score: "" },
    { date: "2026-05-09", opp: "統一獅", res: "-", score: "" },
    { date: "2026-05-10", opp: "統一獅", res: "-", score: "" },
    { date: "2026-05-20", opp: "中信兄弟", res: "-", score: "" },
    { date: "2026-05-22", opp: "富邦悍將", res: "-", score: "" },
    { date: "2026-05-23", opp: "富邦悍將", res: "-", score: "" },
    { date: "2026-05-24", opp: "富邦悍將", res: "-", score: "" },
    { date: "2026-05-29", opp: "台鋼雄鷹", res: "-", score: "" },
    { date: "2026-05-30", opp: "台鋼雄鷹", res: "-", score: "" },
    { date: "2026-05-31", opp: "台鋼雄鷹", res: "-", score: "" }
];

const stationData = {
    "3/28": { "琳妲":"一 三 三", "穆又甯":"三 一 一", "宋宋":"一 三 三", "筠熹":"三 一 一", "貝佳頤":"二 一 一", "高橋佳帆":"一 二 二", "卉妮":"二 三 三", "穎樂":"後 後 後", "孟潔":"一 二 二", "KIRA":"二 三 三", "廉世彬":"後 後 後", "高佳彬":"一 二 二", "若潼":"三 二 二", "言梓璇":"二 三 三", "金佳垠":"一 二 二", "禹菡":"二 三 三", "岱縈":"後 後 後", "崔荷潾":"三 二 二", "曲曲":"一 二 二", "彭彭":"三 二 二", "沈珈妤":"二 三 三", "溫妮":"一 二 二", "MIKA":"後 後 後", "熊霓":"三 二 二" },
    "3/29": { "琳妲":"三 一 一", "穆又甯":"一 三 三", "宋宋":"三 一 一", "筠熹":"一 三 三", "貝佳頤":"三 二 二", "高橋佳帆":"一 二 二", "卉妮":"二 一 一", "穎樂":"三 二 二", "孟潔":"二 一 一", "笑笑":"後 後 後", "熊霓":"一 二 二", "KIRA":"二 一 一", "廉世彬":"三 二 二", "高佳彬":"二 一 一", "若潼":"一 二 二", "言梓璇":"後 後 後", "金佳垠":"三 二 二", "禹菡":"一 二 二", "岱縈":"二 一 一", "崔荷潾":"三 二 二", "曲曲":"後 後 後", "彭彭":"一 二 二", "沈珈妤":"二 一 一", "溫妮":"三 二 二" }
};

const attendanceData = {
    "琳妲": ["2026-03-28", "2026-03-29", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-16", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"],
    "穆又甯": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-11", "2026-04-12", "2026-04-21", "2026-04-22", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"],
    "宋宋": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-11", "2026-04-12", "2026-04-21", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"],
    "筠熹": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-15", "2026-04-16", "2026-04-21", "2026-04-24", "2026-04-25", "2026-05-08", "2026-05-09", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"],
    "貝佳頤": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-15", "2026-04-16", "2026-04-21", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10"],
    "高橋佳帆": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-11", "2026-04-12", "2026-04-15", "2026-04-21", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-22", "2026-05-23", "2026-05-29", "2026-05-30", "2026-05-31"],
    "卉妮": ["2026-03-28", "2026-03-29", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-15", "2026-04-16", "2026-04-22", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-22", "2026-05-23", "2026-05-24"],
    "穎樂": ["2026-03-28", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-16", "2026-04-24", "2026-05-08", "2026-05-20", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"],
    "孟潔": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-21", "2026-04-22", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-23", "2026-05-24", "2026-05-30", "2026-05-31"],
    "笑笑": ["2026-03-29", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-15", "2026-04-22", "2026-04-24", "2026-05-08", "2026-05-09", "2026-05-10"],
    "熊霓": ["2026-03-28", "2026-03-29", "2026-04-10", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-22", "2026-05-23", "2026-05-24"],
    "KIRA": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-16", "2026-04-21", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-30", "2026-05-31"],
    "MIKA": ["2026-03-28", "2026-03-31", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-16", "2026-04-21", "2026-04-24", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"],
    "河智媛": ["2026-03-31", "2026-04-01", "2026-04-26", "2026-05-10", "2026-05-29", "2026-05-30", "2026-05-31"],
    "廉世彬": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-23"],
    "禹洙漢": ["2026-03-31", "2026-04-01", "2026-04-26", "2026-05-10", "2026-05-29", "2026-05-30", "2026-05-31"],
    "高佳彬": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-11", "2026-04-12", "2026-04-21", "2026-04-22", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-23"],
    "若潼": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-11", "2026-04-12", "2026-04-15", "2026-04-16", "2026-04-21", "2026-04-22", "2026-04-24", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-22", "2026-05-23", "2026-05-24"],
    "言梓璇": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-15", "2026-04-16", "2026-04-21", "2026-04-22", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-22", "2026-05-23"],
    "金佳垠": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-22", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"],
    "禹菡": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-21", "2026-04-22", "2026-04-24", "2026-04-25", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"],
    "岱縈": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-15", "2026-04-16", "2026-04-21", "2026-04-22", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-22", "2026-05-23", "2026-05-24"],
    "崔荷潾": ["2026-03-28", "2026-03-29", "2026-04-01", "2026-04-11", "2026-04-12", "2026-04-15", "2026-04-16", "2026-04-21", "2026-04-22", "2026-04-25", "2026-04-26", "2026-05-10", "2026-05-20", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30"],
    "曲曲": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-15", "2026-04-16", "2026-04-22", "2026-04-24", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"],
    "彭彭": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-10", "2026-04-15", "2026-04-16", "2026-04-22", "2026-04-24", "2026-04-25", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-20"],
    "沈珈妤": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-01", "2026-04-10", "2026-04-11", "2026-04-12", "2026-04-22", "2026-04-24", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-22", "2026-05-23", "2026-05-29", "2026-05-30", "2026-05-31"],
    "溫妮": ["2026-03-28", "2026-03-29", "2026-03-31", "2026-04-10", "2026-04-11", "2026-04-15", "2026-04-16", "2026-04-22", "2026-04-25", "2026-04-26", "2026-05-08", "2026-05-09", "2026-05-10", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-29", "2026-05-30", "2026-05-31"]
};

let currentTabIdx = 0;

function appendText(parent, tag, text, className = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = String(text ?? '');
    parent.appendChild(el);
    return el;
}

function getGamesInPeriod(idx) {
    if (idx === 0) return games.slice(0, 3);
    if (idx === 1) return games.slice(3, 14);
    if (idx === 2) return games.slice(14, 24);
    return games.slice(0, 14);
}

function render() {
    const tbody = document.getElementById('girlTableBody');
    tbody.replaceChildren();

    const statsSection = document.getElementById('statsSection');
    const introSection = document.getElementById('introSection');

    if (currentTabIdx === 4) {
        if (statsSection) statsSection.classList.add('hidden');
        if (introSection) introSection.classList.remove('hidden');
        return;
    }

    if (statsSection) statsSection.classList.remove('hidden');
    if (introSection) introSection.classList.add('hidden');

    const monthNames = ["三月", "四月", "五月", "總表統計"];
    const currentMonthLabel = document.getElementById('currentMonthLabel');
    if (currentMonthLabel) currentMonthLabel.textContent = monthNames[currentTabIdx] || '總表統計';

    const activeGames = getGamesInPeriod(currentTabIdx);
    const validGames = activeGames.filter(g => g.res !== "延賽" && g.res !== "-");

    const totalGames = document.getElementById('totalGames');
    const teamWins = document.getElementById('teamWins');
    const teamLosses = document.getElementById('teamLosses');

    if (totalGames) totalGames.textContent = validGames.length;
    if (teamWins) teamWins.textContent = validGames.filter(g => g.res === 'W').length;
    if (teamLosses) teamLosses.textContent = validGames.filter(g => g.res === 'L').length;

    girlRoster.forEach(girl => {
        const allDates = attendanceData[girl.name] || [];
        const periodDates = allDates.filter(d => activeGames.some(g => g.date === d));
        let w = 0;
        let l = 0;
        let validCount = 0;

        periodDates.forEach(d => {
            const game = activeGames.find(x => x.date === d);
            if (game && game.res !== "延賽" && game.res !== "-") {
                validCount += 1;
                if (game.res === 'W') w += 1;
                if (game.res === 'L') l += 1;
            }
        });

        const rate = validCount > 0 ? ((w / validCount) * 100).toFixed(1) : "0.0";
        const tr = document.createElement('tr');
        tr.className = "hover:bg-pink-50 transition cursor-pointer";
        tr.tabIndex = 0;
        tr.setAttribute('role', 'button');
        tr.setAttribute('aria-label', `查看${girl.name}詳細資料`);
        tr.addEventListener('click', () => showDetail(girl.name));
        tr.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showDetail(girl.name);
            }
        });

        const nameTd = document.createElement('td');
        nameTd.className = "p-4 flex items-center col-name";
        appendText(nameTd, 'span', girl.id, 'number-badge');
        appendText(nameTd, 'b', girl.name, 'text-gray-700 name-text');

        const countTd = document.createElement('td');
        countTd.className = "p-4 text-sm text-center col-count text-gray-600";
        countTd.textContent = periodDates.length;

        const recordTd = document.createElement('td');
        recordTd.className = "p-4 text-sm text-center col-record text-gray-500";
        recordTd.textContent = currentTabIdx === 2 ? '-' : `${w}W-${l}L`;

        const rateTd = document.createElement('td');
        rateTd.className = "p-4 font-bold text-center col-rate text-pink-600";
        rateTd.textContent = currentTabIdx === 2 ? '-' : `${rate}%`;

        tr.append(nameTd, countTd, recordTd, rateTd);
        tbody.appendChild(tr);
    });
}

function showDetail(name) {
    const girl = girlRoster.find(g => g.name === name);
    if (!girl) return;

    const allDates = attendanceData[name] || [];
    const activeGames = getGamesInPeriod(currentTabIdx);
    const displayDates = allDates.filter(d => activeGames.some(g => g.date === d));

    const modalGirlName = document.getElementById('modalGirlName');
    const content = document.getElementById('modalContent');
    if (!modalGirlName || !content) return;

    modalGirlName.textContent = `${girl.id} ${name}`;
    content.replaceChildren();

    displayDates.slice().reverse().forEach(d => {
        const game = games.find(x => x.date === d);
        if (!game) return;

        const div = document.createElement('div');
        let color = "border-gray-200";
        let tag = game.res;
        let text = "text-gray-400";

        if (game.res === 'W') {
            color = "border-green-400";
            text = "text-green-500";
        } else if (game.res === 'L') {
            color = "border-red-300";
            text = "text-red-400";
        } else if (game.res === '延賽') {
            color = "border-blue-300";
            tag = "⛈️ 延賽";
            text = "text-blue-500";
        }

        div.className = `p-3 bg-white rounded-lg border-l-4 shadow-sm ${color}`;

        const top = document.createElement('div');
        top.className = "flex justify-between items-center mb-1";

        const left = document.createElement('div');
        appendText(left, 'p', d, 'text-[10px] text-gray-400');
        appendText(left, 'p', `vs ${game.opp}`, 'font-bold text-sm');

        const right = document.createElement('div');
        right.className = "text-right";
        appendText(right, 'p', game.score || '-', 'text-sm font-bold text-gray-600');
        appendText(right, 'p', tag, `text-xs font-bold ${text}`);

        top.append(left, right);
        div.appendChild(top);

        const simpleDate = d.split('-').slice(1).join('/').replace(/^0/, '');
        if (stationData[simpleDate] && stationData[simpleDate][name]) {
            appendText(div, 'div', `📍 站位：${stationData[simpleDate][name]}`, 'text-[11px] text-pink-500 font-bold bg-pink-50 px-2 py-1 rounded inline-block mt-1');
        }

        if (game.info) {
            div.appendChild(createInfoBox(game.info));
        }

        content.appendChild(div);
    });

    document.getElementById('girlModal')?.classList.remove('opacity-0', 'pointer-events-none', 'hidden');
    document.body.classList.add('modal-active');
}

function createInfoBox(info) {
    const infoBox = document.createElement('div');
    infoBox.className = "mt-2 p-2 bg-pink-50 rounded text-[11px] text-gray-600 border border-pink-100";

    appendText(infoBox, 'div', `場次: ${info.no || '-'} | ${info.location || '-'}`, 'font-bold text-gray-800 border-b border-pink-200 pb-1 mb-1 text-center text-[10px]');

    const grid = document.createElement('div');
    grid.className = "grid grid-cols-[125px_110px_auto] gap-y-1";
    appendText(grid, 'div', `⏱️ 時間: ${info.time || '-'}`, 'truncate');
    appendText(grid, 'div', `👥 觀眾: ${info.audience || '-'}`, 'truncate');
    appendText(grid, 'div', '', '');
    appendText(grid, 'div', `勝投: ${info.wp || '-'}`, 'truncate');
    appendText(grid, 'div', `敗投: ${info.lp || '-'}`, 'truncate');
    appendText(grid, 'div', info.sv ? `救援成功: ${info.sv}` : '', 'truncate font-bold');
    appendText(grid, 'div', `🏆 MVP: ${info.mvp || '-'}`, 'col-span-3 text-pink-600 font-bold mt-1 border-t border-pink-100 pt-1');

    infoBox.appendChild(grid);
    return infoBox;
}

function closeModal() {
    document.getElementById('girlModal')?.classList.add('opacity-0', 'pointer-events-none', 'hidden');
    document.body.classList.remove('modal-active');
}

function switchTab(i) {
    currentTabIdx = Number(i);
    [0, 1, 2, 3, 4].forEach(idx => document.getElementById(`tab${idx}`)?.classList.remove('tab-active'));
    document.getElementById(`tab${currentTabIdx}`)?.classList.add('tab-active');
    render();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tabList')?.addEventListener('click', event => {
        const button = event.target.closest('button[data-tab]');
        if (!button) return;
        switchTab(button.dataset.tab);
    });

    document.getElementById('modalOverlay')?.addEventListener('click', closeModal);
    document.getElementById('modalClose')?.addEventListener('click', closeModal);

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeModal();
    });

    render();
});
