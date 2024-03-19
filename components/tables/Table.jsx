export default function Table({ cols, data }) {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg border border-odtheme/10">
      <table className="w-full text-sm text-left text-odtheme">
        <thead className="text-xs text-odtheme uppercase bg-odtheme/20">
          <tr>
            {cols.map((col) => (
              <th
                key={col.title}
                scope="col"
                className="px-6 py-3 last:text-center"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.slug} className="bg-theme even:bg-odtheme/5">
              {cols.map((col) => (
                <td key={col.title} className="px-6 py-4 last:text-center">
                  {col.renderer ? col.renderer(row) : row[col.dataField]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
