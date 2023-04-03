import QuizList from 'components/admin/quizList/QuizList';

export default function Quizzes() {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <QuizList />
      </div>
    </section>
  );
}
