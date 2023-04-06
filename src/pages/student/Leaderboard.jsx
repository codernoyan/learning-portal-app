import LoggedInStudent from 'components/student/leaderboard/LoggedInStudent';
import RankedStudents from 'components/student/leaderboard/RankedStudents';

export default function Leaderboard() {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        {/* logged in student position */}
        <LoggedInStudent />
        {/* top 20 students position */}
        <RankedStudents />
      </div>
    </section>
  );
}
