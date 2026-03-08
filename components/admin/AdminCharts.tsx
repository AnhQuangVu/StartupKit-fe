interface SeriesItem {
  label: string;
  value: number;
}

interface ChartBlock {
  title: string;
  series: SeriesItem[];
}

interface AdminChartsProps {
  charts: ChartBlock[];
}

export default function AdminCharts({ charts }: AdminChartsProps) {
  const max = Math.max(...charts.flatMap((chart) => chart.series.map((item) => item.value)), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {charts.map((chart) => (
        <div key={chart.title} className="bg-white border border-[#EAEAEA] rounded-xl p-4">
          <h3 className="text-[13px] font-bold text-[#111111] mb-4">{chart.title}</h3>
          <div className="space-y-3">
            {chart.series.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-[#555555]">{item.label}</span>
                  <span className="font-semibold text-[#111111]">{item.value}</span>
                </div>
                <div className="h-2 bg-[#F1F1F1] rounded-full">
                  <div className="h-full bg-[#FFD600] rounded-full" style={{ width: `${(item.value / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
