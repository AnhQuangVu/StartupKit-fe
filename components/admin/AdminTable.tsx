interface AdminTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  rows: T[];
  emptyText?: string;
}

export default function AdminTable<T>({ columns, rows, emptyText = "No data found." }: AdminTableProps<T>) {
  return (
    <div className="bg-white border border-[#EAEAEA] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#FAFAFA] border-b border-[#EAEAEA]">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-[11px] uppercase font-bold text-[#666666]">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-[13px] text-[#888888]" colSpan={columns.length}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index} className="border-b border-[#F2F2F2] last:border-0">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-[13px] text-[#111111]">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
