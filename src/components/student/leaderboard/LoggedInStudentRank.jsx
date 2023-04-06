export default function LoggedInStudentRank({ loggedInStudentData }) {
  const {
    index, name, totalQuizMark, totalAssignmentMark, totalMark,
  } = loggedInStudentData || {};

  return (
    <tr className="border-2 border-cyan">
      <td className="table-td text-center font-bold">{index}</td>
      <td className="table-td text-center font-bold">{name}</td>
      <td className="table-td text-center font-bold">{totalQuizMark}</td>
      <td className="table-td text-center font-bold">{totalAssignmentMark}</td>
      <td className="table-td text-center font-bold">{totalMark}</td>
    </tr>
  );
}
