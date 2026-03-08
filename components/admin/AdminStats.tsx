interface AdminStatItem {
  label: string;
  value: string;
  delta?: string;
}

interface AdminStatsProps {
  items: AdminStatItem[];
}

export default function AdminStats({ items }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.label} className="bg-white border border-[#EAEAEA] rounded-xl p-4">
          <p className="text-[11px] font-bold text-[#888888] uppercase mb-1">{item.label}</p>
          <p className="text-[28px] font-black text-[#111111] leading-none">{item.value}</p>
          {item.delta ? <p className="text-[11px] mt-1 text-[#555555]">{item.delta}</p> : null}
        </div>
      ))}
    </div>
  );
}
