// ====== 1. 請在這裡貼上你的 CSV 連結 ======
const CONFIG = {
    girlsUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=0&single=true&output=csv",
    matchesUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=452623159&single=true&output=csv",
    scheduleUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=715298933&single=true&output=csv"
};

// ====== 2. 共用資料獲取工具 (防呆無敵版) ======
async function fetchCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    // 處理換行並過濾掉空行
    const rows = data.split(/\r?\n/).map(row => row.trim()).filter(row => row);
    
    // 專門處理 CSV 引號陷阱的切菜刀
    function parseCSVRow(rowStr) {
        let result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < rowStr.length; i++) {
            let char = rowStr[i];
            if (char === '"') {
                inQuotes = !inQuotes; // 遇到雙引號，開啟保護罩
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim()); // 只有在保護罩外面的逗號才切斷
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }

    const headers = parseCSVRow(rows[0]);
    
    return rows.slice(1).map(row => {
        const values = parseCSVRow(row);
        let obj = {};
        headers.forEach((h, i) => {
            obj[h] = values[i] ? values[i] : "";
        });
        return obj;
    });
}

// ====== 3. 欄位解析與換算工具 ======
// 將 "2H56M" 轉換為分鐘，避免錯誤或負值
function parseDuration(timeStr) {
    if (!timeStr || timeStr === "-" || timeStr === "無") return 0;
    const match = timeStr.match(/(\d+)H(\d+)M/i);
    if (match) {
        const total = (parseInt(match[1]) * 60) + parseInt(match[2]);
        return total > 0 ? total : 0;
    }
    return 0;
}

// 將分鐘轉回 "XHXQM" 顯示
function formatMinutes(totalMinutes) {
    if (totalMinutes === 0) return "0H0M";
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}H${m}M`;
}

// 拆解 "03/28(一三三)" 格式
function parseWorkingDate(dateStr) {
    if (!dateStr) return [];
    const entries = dateStr.split(',').map(s => s.trim());
    return entries.map(entry => {
        const match = entry.match(/(\d+\/\d+)\((.*)\)/);
        return match ? { date: match[1], position: match[2] } : { date: entry, position: "-" };
    });
}

// 計算勝率
function calculateWinRate(win, loss) {
    const total = win + loss;
    if (total === 0) return "0.0";
    return ((win / total) * 100).toFixed(1);
}
