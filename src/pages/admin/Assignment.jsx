import AssignmentList from 'components/admin/assignment/AssignmentList';

export default function Assginment() {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        {/* all assignments */}
        <AssignmentList />
      </div>
    </section>
  );
}
