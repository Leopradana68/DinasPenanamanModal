import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";

const Sosmed = () => {
  const [DataSosmed, setDataSosmed] = useState([]);

  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/10")
      .then(function (Sosmed) {
        setDataSosmed(Sosmed.data.data);
        console.log("console Sosmed: " + Sosmed.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div id='fixed-social'>
      <div>
        <a href={DataSosmed.facebook} className='fixed-facebook' target='_blank'>
          <i className='fab fa-facebook' />
          <FaFacebook />
        </a>
      </div>
      <div>
        <a href={DataSosmed.youtube} className='fixed-youtube' target='_blank'>
          <i className='fab fa-youtube' />
          <FaYoutube/>
        </a>
      </div>
      <div>
        <a href='#' className='fixed-twitter' target='_blank'>
          <i className='fab fa-twitter' />
          <FaTwitter/>
        </a>
      </div>
      <div>
        <a
          href={DataSosmed.instagram}
          className='fixed-instagrem'
          target='_blank'>
          <i className='fab fa-instagram' />
          <FaInstagram/>
        </a>
      </div>
    </div>
  );
};

export default Sosmed;
