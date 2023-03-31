import { useGetVideoQuery } from 'features/videos/videosApi';
import { useParams } from 'react-router-dom';
import Error from 'ui/Error';
import Loading from 'ui/Loading';
import VideoDescription from './VideoDescription';
import VideoPlayer from './VideoPlayer';

export default function Video() {
  const { videoId } = useParams();
  const {
    data: video, isLoading, isError, error,
  } = useGetVideoQuery(videoId);

  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && Object.keys(video)?.length === 0) {
    content = <Error message="No videos found!" />;
  } else if (!isLoading && !isError && Object.keys(video)?.length > 0) {
    content = (
      <>
        <VideoPlayer link={video.url} title={video.title} />
        <VideoDescription video={video} />
      </>
    );
  }

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {content}
    </div>
  );
}
