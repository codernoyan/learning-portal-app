import { useGetVideosQuery } from 'features/videos/videosApi';
import Error from 'ui/Error';
import Loading from 'ui/Loading';
import VideoItem from './VideoItem';

export default function VideoList() {
  const {
    data: videos, isLoading, isError, error,
  } = useGetVideosQuery();

  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <Error message="No videos found!" />;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => <VideoItem key={video.id} video={video} />);
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}
