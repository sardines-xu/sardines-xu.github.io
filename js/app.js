// 显示错误信息
function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
    errorContainer.style.display = 'block';
    console.error(message);
}

// 检查Chart.js是否加载成功
function checkChartJSAvailability() {
    if (typeof Chart === 'undefined') {
        showError('Chart.js库加载失败，请检查网络连接或CDN可用性');
        return false;
    }
    return true;
}

// 创建备用显示
function createFallbackDisplay(container, title) {
    container.innerHTML = `
        <div class="chart-fallback">
            <p>📊 图表加载失败</p>
            <p><strong>${title}</strong></p>
            <p>请检查：</p>
            <p>1. 网络连接</p>
            <p>2. 浏览器控制台错误信息</p>
            <p>3. 刷新页面重试</p>
        </div>
    `;
}

// 模拟数据库中的20组数据
const databaseData = [
    { id: 1, category: "电子产品", sales: 120, profit: 35, rating: 4.5, month: "1月" },
    { id: 2, category: "服装", sales: 85, profit: 22, rating: 4.2, month: "1月" },
    { id: 3, category: "家居用品", sales: 65, profit: 18, rating: 4.3, month: "1月" },
    { id: 4, category: "食品", sales: 110, profit: 28, rating: 4.6, month: "1月" },
    { id: 5, category: "电子产品", sales: 135, profit: 42, rating: 4.4, month: "2月" },
    { id: 6, category: "服装", sales: 95, profit: 26, rating: 4.1, month: "2月" },
    { id: 7, category: "家居用品", sales: 70, profit: 20, rating: 4.2, month: "2月" },
    { id: 8, category: "食品", sales: 125, profit: 32, rating: 4.5, month: "2月" },
    { id: 9, category: "电子产品", sales: 150, profit: 48, rating: 4.7, month: "3月" },
    { id: 10, category: "服装", sales: 105, profit: 30, rating: 4.3, month: "3月" },
    { id: 11, category: "家居用品", sales: 80, profit: 24, rating: 4.4, month: "3月" },
    { id: 12, category: "食品", sales: 140, profit: 38, rating: 4.6, month: "3月" },
    { id: 13, category: "电子产品", sales: 165, profit: 55, rating: 4.8, month: "4月" },
    { id: 14, category: "服装", sales: 115, profit: 34, rating: 4.5, month: "4月" },
    { id: 15, category: "家居用品", sales: 90, profit: 28, rating: 4.3, month: "4月" },
    { id: 16, category: "食品", sales: 155, profit: 42, rating: 4.7, month: "4月" },
    { id: 17, category: "电子产品", sales: 180, profit: 62, rating: 4.9, month: "5月" },
    { id: 18, category: "服装", sales: 125, profit: 38, rating: 4.6, month: "5月" },
    { id: 19, category: "家居用品", sales: 100, profit: 32, rating: 4.5, month: "5月" },
    { id: 20, category: "食品", sales: 170, profit: 48, rating: 4.8, month: "5月" }
];

// 确保DOM完全加载后再初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载，开始初始化...');
    
    // 检查Chart.js是否可用
    if (!checkChartJSAvailability()) {
        // 如果Chart.js不可用，为所有图表创建备用显示
        document.querySelectorAll('.chart-container').forEach(container => {
            const title = container.querySelector('.chart-title').textContent;
            const wrapper = container.querySelector('.chart-wrapper');
            createFallbackDisplay(wrapper, title);
        });
        return;
    }
    
    try {
        // 填充数据表格
        populateDataTable();
        
        // 模拟图表加载延迟
        setTimeout(initializeCharts, 800);
    } catch (error) {
        showError('初始化过程中出错: ' + error.message);
        console.error('初始化错误:', error);
    }
});

// 其余的函数保持不变（populateDataTable, processMonthlyData等）
// ... [这里包含之前的所有数据处理和图表创建函数]