'use strict';

const girlRoster = [
    { id: "12", name: "穎樂" },
    { id: "20", name: "MIKA" }
];

const attendanceData = {
    "穎樂": ["2026-03-28", "2026-04-01"],
    "MIKA": ["2026-03-28"]
};

const games = [
    { date: "2026-03-28", res: "W" },
    { date: "2026-04-01", res: "L" }
];

let currentTabIdx = 0;

function render() {
    const tbody = document.getElementById('girlTableBody');
    tbody.innerHTML = "";

    girlRoster.forEach(girl => {
        const tr = document.createElement('tr');

        const dates = attendanceData[girl.name] || [];

        let w = 0;
        let l = 0;

        dates.forEach(d => {
            const g = games.find(x => x.date === d);
            if (!g) return;
            if (g.res === 'W') w++;
            if (g.res === 'L') l++;
        });

        const rate = (w + l) ? ((w / (w + l)) * 100).toFixed(1) : 0;

        tr.innerHTML = `
            <td>${girl.name}</td>
            <td>${dates.length}</td>
            <td>${w}W-${l}L</td>
            <td>${rate}%</td>
        `;

        tr.addEventListener('click', () => showDetail(girl.name));

        tbody.appendChild(tr);
    });
}

function showDetail(name) {
    document.getElementById('modalGirlName').textContent = name;
    document.getElementById('modalContent').textContent = "詳細資料...";
    document.getElementById('girlModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('girlModal').classList.add('hidden');
}

document.getElementById('tabList').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    currentTabIdx = btn.dataset.tab;
    render();
});

document.getElementById('modalOverlay').addEventListener('click', closeModal);
document.getElementById('modalClose').addEventListener('click', closeModal);

render();
