import VideoDescription from './VideoDescription';
import VideoPlayer from './VideoPlayer';

export default function Video() {
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <VideoPlayer />
      <VideoDescription />
    </div>
  );
}
