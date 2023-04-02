import VideosList from 'components/admin/videosList/VideosList';

export default function Videos() {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <VideosList />
      </div>
    </section>
  );
}
