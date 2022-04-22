// import React from "react";
import React, { Fragment } from "react";
import { Container, } from "react-bootstrap";
import { useEffect, useState } from "react";

const Profil = () => {
  const [DataPimpinan, setDataPimpinan] = useState([]);
  const axios = require("axios");

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/10")
      .then(function (pimpinan) {
        setDataPimpinan(pimpinan.data.data);
        console.log("console kepala: " + pimpinan.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
  
    <Fragment>
      <div>
    <div className="utama-Profil">
      <div className="row mb-5">
        <div className="col-md-4 Foto">
          <img
            src={DataPimpinan.foto_kepala}
            width={"100%"}
            className="foto-kepala"
            alt="Foto Kepala"
          />
        </div>
        <div className="col-md-8 rest">
          <h2 className="nama-instansi">{DataPimpinan.nama_instansi}</h2>
          <br />{" "}
          <div className="nama-kepala">
            <h1 className="bagian_nama">  <strong>
              Kepala</strong>  {DataPimpinan.nama_instansi}</h1>
            <h2 className="kepala-dinas">{DataPimpinan.nama_kepala}</h2>
          </div>
          <p>Tentang Instansi</p>
          <p>{DataPimpinan.tentang}</p>
        </div>
      </div>
    </div>
    </div>
 
    </Fragment>
  );
};

export default Profil;
