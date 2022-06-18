const Splash = () => {
  return (
    <div>
      <div className="splash-text-rel">

      <div className="splash-text-div">
        <h1>Imagine a place...</h1>
        <p>
          ... where you can connect with like-minded, passionate artists, share
          musical concepts or ideas with multiple peers at once, and have a
          space to play music together, remotely.
        </p>
      </div>
      </div>
      <video id="video-dj" autoPlay muted loop>
        <source src="https://res.cloudinary.com/dmtap2h65/video/upload/v1655278059/mixkit-dj-mixing-acetate-discs-4127_pz6tdg.mp4"></source>
      </video>
      <div className='splash-violin-div'>
        <video autoPlay muted loop id="video-violin">
          <source src="https://res.cloudinary.com/dmtap2h65/video/upload/v1655278935/AdobeStock_371646570_reduced_dmnv3q.mov"></source>
        </video>
        <h2>
          Create an invite-only place for your musical friends
        </h2>
      </div>
    </div>
  );
};

export default Splash;
