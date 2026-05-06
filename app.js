// ====== 1. CSV 連結 (已自動為您填入正確網址) ======
const CONFIG = {
    girlsUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=0&single=true&output=csv",
    matchesUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=452623159&single=true&output=csv",
    scheduleUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=715298933&single=true&output=csv"
};

// ====== 2. 共用資料獲取工具 (新舊格式通吃版) ======
async function fetchCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.split(/\r?\n/).map(row => row.trim()).filter(row => row);
    
    function parseCSVRow(rowStr) {
        let result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < rowStr.length; i++) {
            let char = rowStr[i];
            if (char === '"') { inQuotes = !inQuotes; } 
            else if (char === ',' && !inQuotes) { result.push(current.trim()); current = ''; } 
            else { current += char; }
        }
        result.push(current.trim());
        return result;
    }

    const headers = parseCSVRow(rows[0]);
    let parsedData = rows.slice(1).map(row => {
        const values = parseCSVRow(row);
        let obj = {};
        headers.forEach((h, i) => { obj[h] = values[i] ? values[i] : ""; });
        return obj;
    });

    // 💡 智慧翻譯：如果沒看到 "working_dates" 欄位，就代表它是新的「月曆網格」格式
    if (parsedData.length > 0 && !parsedData[0].hasOwnProperty('working_dates')) {
        console.log("偵測到網格格式，啟動翻譯機...🚀");
        return parsedData.map(row => {
            let workingDatesArray = [];
            Object.keys(row).forEach(key => {
                // 過濾掉基礎欄位，剩下的日期格子如果有字就抓出來
                if (key !== 'year' && key !== 'girl_name' && key !== 'team' && row[key] && row[key].toString().trim() !== "") {
                    workingDatesArray.push(`${key}(${row[key].toString().trim()})`);
                }
            });
            return {
                year: row.year,
                girl_name: row.girl_name,
                team: row.team,
                working_dates: workingDatesArray.join(',')
            };
        });
    }

    return parsedData;
}

// ====== 3. 解析與工具函數 ======
function parseWorkingDate(dateStr) {
    if (!dateStr) return [];
    const entries = dateStr.split(',').map(s => s.trim());
    return entries.map(entry => {
        const match = entry.match(/(\d+\/\d+)\((.*)\)/);
        return match ? { date: match[1], position: match[2] } : { date: entry, position: "-" };
    });
}

function parseScoreForTeam(scoreStr, result) {
    if (!scoreStr || !result || result.includes('延賽')) return { scored: 0, allowed: 0 };
    const parts = scoreStr.split(':');
    if (parts.length !== 2) return { scored: 0, allowed: 0 };
    const n1 = parseInt(parts[0].trim());
    const n2 = parseInt(parts[1].trim());
    if (isNaN(n1) || isNaN(n2)) return { scored: 0, allowed: 0 };
    return result.includes('勝') ? { scored: Math.max(n1, n2), allowed: Math.min(n1, n2) } : { scored: Math.min(n1, n2), allowed: Math.max(n1, n2) };
}

// 🌙 夜間模式按鈕自動生成
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle-fab';
    themeBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    themeBtn.style.cssText = `position:fixed;bottom:20px;right:20px;z-index:9999;width:50px;height:50px;border-radius:50%;background:var(--card-bg);border:2px solid var(--theme-main);font-size:24px;cursor:pointer;color:var(--text-main);box-shadow:0 4px 15px rgba(0,0,0,0.2);display:flex;justify-content:center;align-items:center;transition:0.3s;`;
    themeBtn.onclick = () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    };
    document.body.appendChild(themeBtn);
});
