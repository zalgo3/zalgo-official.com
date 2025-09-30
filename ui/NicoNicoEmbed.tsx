type NicoNicoEmbedProps = {
  videoId: string;
  title: string;
};

const NicoNicoEmbed = ({ videoId, title }: NicoNicoEmbedProps) => {
  if (!videoId) return null;

  return (
    <iframe
      width="312"
      height="176"
      src={`https://ext.nicovideo.jp/thumb/${videoId}`}
      scrolling="no"
      style={{ border: 'solid 1px #ccc' }}
      frameBorder="0"
      allowFullScreen
    >
      <a href={`https://www.nicovideo.jp/watch/${videoId}`}>{title}</a>
    </iframe>
  );
};

export default NicoNicoEmbed;
