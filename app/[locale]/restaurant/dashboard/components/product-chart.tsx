'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  title: {
    label: 'Product',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function ProductStat({
  data,
}: {
  data: { title: string; count: number }[]
}) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Number of ordered products for the last 3 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
              top: 0,
            }}
          >
            <YAxis
              dataKey="title"
              type="category"
              tickLine={false}
              tickMargin={8}
              tickSize={0}
              name="Product"
              width={108}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <XAxis dataKey="count" type="number" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="count"
              layout="vertical"
              fill="var(--color-title)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
