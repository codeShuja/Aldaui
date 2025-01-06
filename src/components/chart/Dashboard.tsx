import { LineChart } from './LineChart'
import { DonutChart } from './DonutChart'
import { BarChart } from './BarChart'
import { AreaChart } from './AreaChart'
import { Button } from '../ui/button'
import { GitHubIcon } from '../icons/icon'

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const lineChartData = {
    labels: monthLabels,
    datasets: [
        {
            label: 'Visitors',
            data: [30, 45, 57, 42, 38, 40, 45, 50, 55, 48, 52, 56],
            color: '#14b8a6',
        },
        {
            label: 'Page Views',
            data: [25, 35, 30, 45, 35, 40, 42, 47, 50, 45, 48, 52],
            color: '#f97316',
        },
    ],
}

const barChartData = {
    labels: monthLabels,
    datasets: [
        {
            label: 'New Users',
            data: [20, 30, 25, 15, 25, 25, 28, 32, 35, 30, 33, 35],
            color: '#14b8a6',
        },
        {
            label: 'Returning Users',
            data: [15, 20, 15, 10, 15, 15, 18, 20, 22, 19, 21, 23],
            color: '#f97316',
        },
    ],
}

const areaChartData = {
    labels: monthLabels,
    datasets: [
        {
            label: 'Desktop',
            data: [40, 50, 45, 35, 40, 45, 48, 52, 55, 50, 53, 56],
            color: '#14b8a6',
        },
        {
            label: 'Mobile',
            data: [30, 35, 30, 25, 30, 35, 38, 40, 42, 38, 40, 43],
            color: '#f97316',
        },
    ],
}

const donutChartData = [
    { label: 'Direct', value: 30, color: '#14b8a6' },
    { label: 'Social', value: 25, color: '#f97316' },
    { label: 'Organic', value: 20, color: '#0f172a' },
    { label: 'Referral', value: 15, color: '#eab308' },
]

export function Dashboard() {
    return (
        <div className="flex justify-center py-1 m-4 md:m-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                <LineChart
                    data={lineChartData}
                    title="Traffic Overview"
                    subtitle="Visitors vs Page Views"
                />
                <BarChart
                    data={barChartData}
                    title="User Types"
                    subtitle="New vs Returning Users"
                />
                <AreaChart
                    data={areaChartData}
                    title="Device Usage"
                    subtitle="Desktop vs Mobile"
                />
                <DonutChart
                    data={donutChartData}
                    title="Traffic Sources"
                    subtitle="Distribution by Channel"
                    centerText="1,125"
                    centerSubtext="Visits"
                />
            </div>
            <div className="fixed bottom-4 right-4 flex items-center">
                <Button
                    size="sm"
                    variant="outline"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-teal-600 border border-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition-all dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-500 dark:hover:text-white"
                >
                    <a
                        href="https://github.com/Gutierrez-16/Aldaui/tree/main/src/components/chart"
                        className="flex items-center"
                    >
                        <GitHubIcon className="h-6 w-6 mr-2 dark:text-white" />
                        GitHub
                    </a>
                </Button>

            </div>

        </div>

    )
}
