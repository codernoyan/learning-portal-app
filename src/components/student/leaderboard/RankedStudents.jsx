import { selectAuth } from 'features/auth/authSelector';
import { useGetUsersQuery } from 'features/users/usersApi';
import { useSelector } from 'react-redux';
import Error from 'ui/Error';
import Loading from 'ui/Loading';
import RankedStudent from './RankedStudent';

export default function RankedStudents() {
  const { user: { email } } = useSelector(selectAuth) || {};

  const {
    data: users, isLoading, isError, error,
  } = useGetUsersQuery(email);

  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && users?.length === 0) {
    content = <Error message="No videos found!" />;
  } else if (!isLoading && !isError && users?.length > 0) {
    content = users.map((user, i) => <RankedStudent key={user.id} user={user} />);
  }

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Top 20 Result</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr className="border-b border-slate-600/50">
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>
    </div>
  );
}
