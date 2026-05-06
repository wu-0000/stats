// ====== 1. CSV 連結 ======
const CONFIG = {
    girlsUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=0&single=true&output=csv",
    matchesUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=452623159&single=true&output=csv",
    scheduleUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=715298933&single=true&output=csv"
};

// ====== 2. 共用資料獲取工具 (終極防護版) ======
async function fetchCSV(url) {
    try {
        const response = await fetch(url);
        let data = await response.text();
        
        // 🔥 核心修復：清除 Google Sheets 第一格的隱形炸彈 (UTF-8 BOM)
        data = data.replace(/^\uFEFF/, '');
        
        const rows = data.split(/\r?\n/).map(row => row.trim()).filter(row => row);
        if (rows.length === 0) return []; // 避免空表格報錯
        
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

        // 強制清洗所有標題名稱，確保乾淨無暇
        const headers = parseCSVRow(rows[0]).map(h => h.trim());
        
        let parsedData = rows.slice(1).map(row => {
            const values = parseCSVRow(row);
            let obj = {};
            headers.forEach((h, i) => { 
                obj[h] = values[i] ? values[i] : ""; 
            });
            return obj;
        });

        // 💡 智慧翻譯：檢查是否為網格班表
        if (parsedData.length > 0 && parsedData[0].hasOwnProperty('girl_name') && !parsedData[0].hasOwnProperty('working_dates')) {
            return parsedData.map(row => {
                let workingDatesArray = [];
                Object.keys(row).forEach(key => {
                    if (key !== 'year' && key !== 'girl_name' && key !== 'team' && row[key] && row[key].toString().trim() !== "") {
                        workingDatesArray.push(`${key}(${row[key].toString().trim()})`);
                    }
                });
                return {
                    year: row.year || '',
                    girl_name: row.girl_name || '',
                    team: row.team || '',
                    working_dates: workingDatesArray.join(',')
                };
            });
        }

        return parsedData;
    } catch (error) {
        console.error("CSV 讀取錯誤:", error);
        return []; 
    }
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
