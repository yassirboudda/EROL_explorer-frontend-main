<script lang="ts">
	import type { ChartConfiguration, TooltipItem } from 'chart.js';
	import {
		CategoryScale,
		Chart,
		LinearScale,
		LineController,
		LineElement,
		PointElement,
		Tooltip
	} from 'chart.js';
	import { onDestroy, onMount, tick } from 'svelte';
	import numeral from 'numeral';

	Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Tooltip);

	let canvas: HTMLCanvasElement;
	let myChart: Chart<'line'> | null = null;
	let updateInterval: NodeJS.Timeout | null = null;
	let dateKeys: string[] = [];

	async function fetchChartData() {
		try {
			const response = await fetch('/api/get-tx-chart');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Error fetching chart data:', error);
			return [];
		}
	}

	function processChartData(rawData: any[]) {
		const dataMap = new Map<string, number>();
		rawData.forEach((item) => {
			dataMap.set(item.date, item.count);
		});

		const today = new Date();
		const labels: string[] = [];
		const chartData: number[] = [];
		const newDateKeys: string[] = [];

		for (let i = 29; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			const dateStr = date.toISOString().substring(0, 10);

			const label = date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric'
			});

			labels.push(label);
			chartData.push(dataMap.get(dateStr) ?? 0);
			newDateKeys.push(dateStr);
		}

		dateKeys = newDateKeys;
		return { labels, chartData };
	}

	function createChart(labels: string[], chartData: number[]) {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'line'> = {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Transaction Count',
						data: chartData,
						borderColor: '#3B82F6',
						borderWidth: 2,
						fill: false,
						pointRadius: 0,
						pointHoverRadius: 4,
						tension: 0.1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						display: true,
						offset: false,
						grid: {
							display: false
						},
						ticks: {
							maxRotation: 0,
							minRotation: 0,
							font: {
								size: 11
							},
							color: '#6B7280',
							autoSkip: false,
							callback: function (val, index) {
								if (index === 0) return '';
								const numericValue = typeof val === 'string' ? Number(val) : val;
								return index % 3 === 0 ? this.getLabelForValue(numericValue) : '';
							}
						},
						border: {
							display: false
						}
					},
					y: {
						display: false
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true,
						mode: 'index',
						intersect: false,
						displayColors: false,
						callbacks: {
							title: (tooltipItems) => {
								const index = tooltipItems[0].dataIndex;
								const dateKey = dateKeys[index];
								const date = new Date(dateKey);
								return date.toLocaleDateString('en-US', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								});
							},
							label: (context: TooltipItem<'line'>) => {
								const count = context.parsed.y;
								return `${numeral(count).format('0,0')} transactions`;
							}
						},
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						titleColor: '#fff',
						bodyColor: '#fff',
						borderWidth: 0
					}
				},
				elements: {
					point: {
						radius: 0,
						hoverRadius: 4
					}
				},
				interaction: {
					intersect: false,
					mode: 'index'
				}
			}
		};

		myChart = new Chart(ctx, config);
	}

	function updateChart(rawData: any[]) {
		if (!myChart) return;

		const { labels, chartData } = processChartData(rawData);

		myChart.data.labels = labels;
		myChart.data.datasets[0].data = chartData;
		myChart.update('none');
	}

	async function initializeChart() {
		// Ensure DOM is ready
		await tick();

		if (!canvas) {
			console.error('Canvas element not found');
			return;
		}

		// Fetch initial data
		const initialData = await fetchChartData();

		// Process the data
		const { labels, chartData } = processChartData(initialData);

		// Create chart with actual data
		createChart(labels, chartData);

		// Set up periodic updates
		updateInterval = setInterval(async () => {
			const newData = await fetchChartData();
			updateChart(newData);
		}, 5000);
	}

	onMount(() => {
		initializeChart();
	});

	onDestroy(() => {
		if (updateInterval) {
			clearInterval(updateInterval);
		}
		if (myChart) {
			myChart.destroy();
		}
	});
</script>

<div class="h-full w-full rounded-xl bg-base-100">
	<canvas bind:this={canvas} width="400" height="200"></canvas>
</div>
