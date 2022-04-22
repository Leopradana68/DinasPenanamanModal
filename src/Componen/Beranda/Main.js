
import NewsBeranda from "./Berita/NewsBeranda";
import Carousels from "./Corousel/Carousels";
import Profil from "./Profil/Profil";
import BerandaGaleri from "./BerandaGaleri/BerandaGaleri";
import ArtikelBeranda from "./Artikel/ArtikelBeranda";

const Main = () => {
  return (
    <div className="main">
      {/* <Carousels /> */}
      <Profil />
      <NewsBeranda />
      <ArtikelBeranda/>
      <BerandaGaleri />
    </div>
  );
};

export default Main;
