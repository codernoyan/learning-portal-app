export default function VideoPlayer({ link, title }) {
  return (
    <iframe width="100%" className="aspect-video" src={`${link}?autoplay=1`} title={title} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
  );
}
