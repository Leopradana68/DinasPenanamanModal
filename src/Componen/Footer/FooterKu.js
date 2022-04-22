import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FooterKu.css";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

const FooterKu = () => {
  const [DataFoter, setDataFoter] = useState([]);
  const [DataInstansi, setDataInstansi] = useState([]);

  const axios = require("axios");
  //====== get API for Detail Instansi======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/10")
      .then(function (footer) {
        setDataFoter(footer.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); 

  //====== get API for daftar instansi======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi")
      .then(function (instansi) {
        setDataInstansi(instansi.data.data);
        console.log("console foter: " + instansi.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-map-marker-alt" />
                  <div className="cta-text">
                    <h4>Find us</h4>
                    <span>{DataFoter.alamat}</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-phone" />
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span>{DataFoter.nomor_telepon}</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open" />
                  <div className="cta-text">
                    <h4>Mail us</h4>
                    <span>{DataFoter.email}</span>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open" />
                  <div className="cta-text">
                    <div className="footer-social-icon">
                      <h4>Follow us</h4>
                      <a href={DataFoter.facebook}>
                        <FaFacebook />
                      </a>
                      <a href={DataFoter.youtube}>
                        <FaYoutube />
                      </a>
                      <a href={DataFoter.instagram}>
                        <FaInstagram />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="/" className="a-su">
                      <img
                        src={DataFoter.logo_instansi}
                        className="img-fluid"
                        alt="logo" />
                    </a>
                  </div>
                  <h4>{DataFoter.nama_instansi}</h4>
                  <div className="footer-text">
                    <p>{DataFoter.tentang}</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h4>Maps</h4>
                    <iframe src={DataFoter.google_map} className="style-maps" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h4>Dinas Terkait</h4>
                    <div style={{ height: "300px", overflowY: "auto" }}>
                      <ul>
                        {console.log("console ini :" + DataInstansi)}
                        {DataInstansi &&
                          DataInstansi.map((item, index) => {
                            return <li>{item.nama_instansi}</li>;
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className=" text-center text-lg-left">
                <div className="copyright-text">
                  <p>
                    &copy; {new Date().getFullYear()} Copyright:{" "}
                    {DataFoter.nama_instansi}| All Rights Reserved.
                    {"-"}{" "}
                    <a href="https://instagram.com/leopradana00?utm_medium=copy_link">
                      130
                    </a>
                    {"-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FooterKu;
