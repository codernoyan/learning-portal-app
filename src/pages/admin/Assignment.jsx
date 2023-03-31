import Assignments from 'components/admin/assignment/Assignments';

export default function Assginment() {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button type="button" className="btn ml-auto">Add Assignment</button>
          </div>
          {/* all assignments */}
          <Assignments />
        </div>
      </div>
    </section>
  );
}
