import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./Componen/Beranda/Main";
import ArtikelBeranda from "./Componen/Beranda/Artikel/ArtikelBeranda";
import DataArtikel from "./Componen/Artikel/DetailArtikel";
import Sosmed from "./Componen/Sosmed/Sosmed";
import DetailNews from "./Componen/Berita/DetailNews";
import Navbars from "./Componen/Header/Navbar/Navbar";
import Dokumen from "./Componen/Dokumen/Dokumen";
import VideoL from "./Componen/Video/VideoL";
import Foto from "./Componen/Foto/Foto";
import HeaderAtas from "./Componen/Header/HeaderAtas/HeaderAtas";
import { PdfDok } from "./Componen/Dokumen/PdfDok";
import FooterKu from "./Componen/Footer/FooterKu";
import Artikelku from "./Componen/Artikel/Artikel";
import Berita from "./Componen/Berita/Berita";
import HalamanStatis from "./Componen/HalamanStatis/HalamanStatis";


function App() {
  return (
    <div className="home">
      <HeaderAtas />
     <Navbars/>
      <Sosmed />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/beranda" element={<Main />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/artikel" element={<Artikelku />} />
        <Route path="/Beranda/DetailArtikel/:id" element={<DataArtikel />} />
        <Route path="/Beranda/DetailNews/:id" element={<DetailNews />} />
        <Route path="/dokumen" element={<Dokumen />} />
        <Route path="/pdf/:slug/:filename" element={<PdfDok />} />
        <Route path="/Video" element={<VideoL />} />
        <Route path="/Foto" element={<Foto />} />
        <Route exact path="/static/:id" element={<HalamanStatis/>} />
        <Route path="/tohome" element={<Main/>} />
      </Routes>
      <FooterKu />
    </div>
  );
}
export default App;
