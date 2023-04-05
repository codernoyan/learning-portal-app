export default function RankedStudent({ user }) {
  const {
    id, name, totalAssignmentMark, totalQuizMark, totalMark, index,
  } = user || {};

  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">{index + 1}</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">{totalQuizMark}</td>
      <td className="table-td text-center">{totalAssignmentMark}</td>
      <td className="table-td text-center">{totalMark}</td>
    </tr>
  );
}
