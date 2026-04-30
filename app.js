// 這裡放你剛剛複製的三條 CSV 連結
const CONFIG = {
    girlsUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=0&single=true&output=csv",
    matchesUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=452623159&single=true&output=csv",
    scheduleUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZH16XqadNV3U1RnxqnX8vPaYVrR_oSci2R8QzZqcfhgTRuyNDkNbAUu6BCWiVPB8AVPpaqHmJVBQg/pub?gid=715298933&single=true&output=csv"
};

// 1. 處理 2H56M 換算成總分鐘 (避免負值與非數字)
function parseDuration(timeStr) {
    if (!timeStr || timeStr === "-") return 0;
    const match = timeStr.match(/(\d+)H(\d+)M/i);
    if (match) {
        const h = parseInt(match[1]);
        const m = parseInt(match[2]);
        const total = (h * 60) + m;
        return total > 0 ? total : 0; // 確保不會出現負值
    }
    return 0;
}

// 2. 拆解 "03/28(一三三)" 這種格式
function parseWorkingDate(dateStr) {
    // 移除空白並用逗號拆分
    const entries = dateStr.split(',').map(s => s.trim());
    return entries.map(entry => {
        const match = entry.match(/(\d+\/\d+)\((.*)\)/);
        return match ? { date: match[1], position: match[2] } : null;
    }).filter(e => e !== null);
}

// 3. 計算勝率 (防呆：避免分母為0)
function calculateWinRate(win, loss) {
    const total = win + loss;
    if (total === 0) return 0;
    const rate = (win / total) * 100;
    return rate.toFixed(1); // 回傳如 66.7
}
