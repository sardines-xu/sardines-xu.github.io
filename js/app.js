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
    // 填充数据表格
    populateDataTable();
    
    // 模拟图表加载延迟
    setTimeout(initializeCharts, 800);
});

// 填充数据表格
function populateDataTable() {
    const tableBody = document.getElementById('tableBody');
    
    databaseData.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.category}</td>
            <td>${item.sales}</td>
            <td>${item.profit}</td>
            <td>${item.rating}</td>
            <td>${item.month}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// 处理数据并初始化图表
function initializeCharts() {
    // 隐藏所有加载指示器
    document.querySelectorAll('.loading-indicator').forEach(indicator => {
        indicator.style.display = 'none';
    });
    
    // 处理数据用于图表
    const monthlyData = processMonthlyData();
    const categoryData = processCategoryData();
    const ratingData = processRatingData();
    
    // 初始化所有图表
    createBarChart(monthlyData);
    createLineChart(monthlyData);
    createPieChart(categoryData);
    createRadarChart(ratingData);
    createScatterChart();
    createDoughnutChart(categoryData);
}

// 处理月度数据
function processMonthlyData() {
    const months = ['1月', '2月', '3月', '4月', '5月'];
    const monthlySales = Array(5).fill(0);
    const monthlyProfit = Array(5).fill(0);
    
    databaseData.forEach(item => {
        const monthIndex = months.indexOf(item.month);
        if (monthIndex !== -1) {
            monthlySales[monthIndex] += item.sales;
            monthlyProfit[monthIndex] += item.profit;
        }
    });
    
    return {
        months: months,
        sales: monthlySales,
        profit: monthlyProfit
    };
}

// 处理类别数据
function processCategoryData() {
    const categories = {};
    
    databaseData.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = {
                sales: 0,
                profit: 0,
                count: 0
            };
        }
        
        categories[item.category].sales += item.sales;
        categories[item.category].profit += item.profit;
        categories[item.category].count += 1;
    });
    
    return categories;
}

// 处理评分数据
function processRatingData() {
    const categories = ['电子产品', '服装', '家居用品', '食品'];
    const avgRatings = Array(4).fill(0);
    const ratingCounts = Array(4).fill(0);
    
    databaseData.forEach(item => {
        const categoryIndex = categories.indexOf(item.category);
        if (categoryIndex !== -1) {
            avgRatings[categoryIndex] += item.rating;
            ratingCounts[categoryIndex] += 1;
        }
    });
    
    // 计算平均评分
    for (let i = 0; i < avgRatings.length; i++) {
        avgRatings[i] = avgRatings[i] / ratingCounts[i];
    }
    
    return {
        categories: categories,
        ratings: avgRatings
    };
}

// 创建柱状图
function createBarChart(monthlyData) {
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: monthlyData.months,
            datasets: [{
                label: '销售额(万元)',
                data: monthlyData.sales,
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }, {
                label: '利润(万元)',
                data: monthlyData.profit,
                backgroundColor: 'rgba(46, 204, 113, 0.7)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// 创建折线图
function createLineChart(monthlyData) {
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: monthlyData.months,
            datasets: [{
                label: '销售额趋势',
                data: monthlyData.sales,
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: '利润趋势',
                data: monthlyData.profit,
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// 创建饼图
function createPieChart(categoryData) {
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const categories = Object.keys(categoryData);
    const salesData = categories.map(cat => categoryData[cat].sales);
    
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: salesData,
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// 创建雷达图
function createRadarChart(ratingData) {
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ratingData.categories,
            datasets: [{
                label: '平均用户评分',
                data: ratingData.ratings,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    min: 4,
                    max: 5
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// 创建散点图
function createScatterChart() {
    const scatterCtx = document.getElementById('scatterChart').getContext('2d');
    
    // 准备散点图数据
    const scatterData = databaseData.map(item => ({
        x: item.sales,
        y: item.profit
    }));
    
    new Chart(scatterCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '销售额 vs 利润',
                data: scatterData,
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = scatterData[context.dataIndex];
                            return `销售额: ${point.x}万, 利润: ${point.y}万`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '销售额(万元)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '利润(万元)'
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// 创建环形图
function createDoughnutChart(categoryData) {
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    const categories = Object.keys(categoryData);
    const profitData = categories.map(cat => categoryData[cat].profit);
    
    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: profitData,
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}