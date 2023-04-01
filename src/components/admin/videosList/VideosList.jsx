import { useGetVideosQuery } from 'features/videos/videosApi';
import VideoItem from './VideoItem';

export default function VideosList() {
  const {
    data: videos, isLoading, isError, error,
  } = useGetVideosQuery();

  let content = null;
  if (isLoading) {
    content = <tr><td>Loading....</td></tr>;
  } else if (!isLoading && isError) {
    content = <tr><td>{error?.error}</td></tr>;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <tr><td>No Videos found!</td></tr>;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video, index) => <VideoItem key={video.id} video={video} index={index} />);
  }

  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Video Title</th>
          <th className="table-th">Description</th>
          <th className="table-th">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-600/50">
        {content}
      </tbody>
    </table>
  );
}
