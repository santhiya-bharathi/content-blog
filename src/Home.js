import { Footer } from "./Footer";

export function Home() {
  const INITIAL_NATURE = [{ picture: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/schwarzwald-black-forest-landscape-germany-matthias-hauser.jpg" },
  { picture: "https://images.pexels.com/photos/327394/pexels-photo-327394.jpeg" },
  { picture: "https://c4.wallpaperflare.com/wallpaper/162/564/930/flowers-hd-wallpapers-hd-images-download-7530-wallpaper-preview.jpg" },
  { picture: "https://c4.wallpaperflare.com/wallpaper/366/746/415/waterfall-krang-suri-falls-india-asia-wallpaper-preview.jpg" }];
  return (
    <div>
      <Header />
      <h1 className="welcome">Welcome to Nature in mind</h1>
      <h3 className="welcome1">We help people improve their health and well-being through mindful engagement with nature</h3>
      <p className="welcome2">Nature in mind is an educational organization that aims to help people improve their health and well-being through mindfully connecting with the natural world. We run workshops, courses, tours, and retreats in which we use a mindfulness-based approach to explore the beauty of the natural world.</p>
      <Sample INITIAL_NATURE={INITIAL_NATURE} />
      <Footer />
    </div>
  );
}
function Sample({ INITIAL_NATURE }) {
  return (

    <div className='nature-flex'>
      {INITIAL_NATURE.map(({ picture }) => (<Details
        picture={picture} />
      ))}
    </div>

  );
}
function Details({ picture }) {
  return (
    <div>
      <img className="nature-image" src={picture} alt="nature" />
    </div>
  );
}
function Header() {
  return (
    <div className='header-design'></div>
  );
}