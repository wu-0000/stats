// ====== 1. 請在這裡貼上你的 CSV 連結 ======
const CONFIG = {
    girlsUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=0&single=true&output=csv",
    matchesUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=452623159&single=true&output=csv",
    scheduleUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=715298933&single=true&output=csv"
};

// ====== 2. 共用資料獲取工具 (融合網格翻譯魔法) ======
async function fetchCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.split(/\r?\n/).map(row => row.trim()).filter(row => row);
    
    // 專門處理 CSV 引號陷阱的切菜刀
    function parseCSVRow(rowStr) {
        let result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < rowStr.length; i++) {
            let char = rowStr[i];
            if (char === '"') {
                inQuotes = !inQuotes; 
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim()); 
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }

    const headers = parseCSVRow(rows[0]);
    
    let parsedData = rows.slice(1).map(row => {
        const values = parseCSVRow(row);
        let obj = {};
        headers.forEach((h, i) => {
            obj[h] = values[i] ? values[i] : "";
        });
        return obj;
    });

    // ✨ 魔法發生在這裡：偵測是否為「月曆網格」格式
    if (parsedData.length > 0 && parsedData[0].hasOwnProperty('girl_name') && !parsedData[0].hasOwnProperty('working_dates')) {
        console.log("偵測到月曆網格格式，啟動自動翻譯機...🚀");
        
        parsedData = parsedData.map(row => {
            let workingDatesArray = [];
            
            // 掃描這一行所有的格子
            Object.keys(row).forEach(key => {
                // 跳過基本資訊欄位，剩下的都是日期 (例如 04/01)
                if (key !== 'year' && key !== 'girl_name' && key !== 'team' && row[key]) {
                    const position = row[key].toString().trim();
                    if (position !== "") {
                        // 把格子裡的內容包成 04/01(站位) 的格式
                        workingDatesArray.push(`${key}(${position})`);
                    }
                }
            });

            // 回傳網頁原本需要的格式
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

// ====== 3. 欄位解析與換算工具 ======
function parseDuration(timeStr) {
    if (!timeStr || timeStr === "-" || timeStr === "無") return 0;
    const match = timeStr.match(/(\d+)H(\d+)M/i);
    if (match) {
        const total = (parseInt(match[1]) * 60) + parseInt(match[2]);
        return total > 0 ? total : 0;
    }
    return 0;
}

function formatMinutes(totalMinutes) {
    if (totalMinutes === 0) return "0H0M";
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}H${m}M`;
}

function parseWorkingDate(dateStr) {
    if (!dateStr) return [];
    const entries = dateStr.split(',').map(s => s.trim());
    return entries.map(entry => {
        const match = entry.match(/(\d+\/\d+)\((.*)\)/);
        return match ? { date: match[1], position: match[2] } : { date: entry, position: "-" };
    });
}

function calculateWinRate(win, loss) {
    const total = win + loss;
    if (total === 0) return "0.0";
    return ((win / total) * 100).toFixed(1);
}

// ====== 4. 比分解析工具 (超級幸運女神計算機) ======
function parseScoreForTeam(scoreStr, result) {
    if (!scoreStr || !result || result.includes('延賽')) return { scored: 0, allowed: 0 };
    
    const parts = scoreStr.split(':');
    if (parts.length !== 2) return { scored: 0, allowed: 0 };
    
    const num1 = parseInt(parts[0].trim());
    const num2 = parseInt(parts[1].trim());
    if (isNaN(num1) || isNaN(num2)) return { scored: 0, allowed: 0 };

    const max = Math.max(num1, num2);
    const min = Math.min(num1, num2);

    if (result.includes('勝')) {
        return { scored: max, allowed: min }; 
    } else if (result.includes('敗')) {
        return { scored: min, allowed: max }; 
    } else {
        return { scored: num1, allowed: num2 }; 
    }
}

// =========================================
// 🌙 全域夜間模式切換魔法 (自動生成按鈕)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. 讀取瀏覽器記憶的模式 (預設日間)
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 2. 自動在畫面右下角加入浮動按鈕
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle-fab';
    themeBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    
    // 按鈕的高級質感 CSS
    themeBtn.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; z-index: 9999;
        width: 50px; height: 50px; border-radius: 50%;
        background: var(--card-bg); border: 2px solid var(--theme-main);
        font-size: 24px; cursor: pointer; color: var(--text-main);
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex; justify-content: center; align-items: center;
        transition: all 0.3s ease;
    `;
    
    // 3. 點擊切換邏輯
    themeBtn.onclick = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // 永久記憶
        themeBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    };

    document.body.appendChild(themeBtn);
});
