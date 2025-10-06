import React from "react";
import { TwitterOutlined,FacebookOutlined,InstagramOutlined } from "@ant-design/icons";
import { AiOutlinePinterest } from "react-icons/ai";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <h2>MY BLOG</h2>
        </div>

        <div className="footer__about">
          <h4>About</h4>
          <h5>Reactblocks</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dictum aliquet accumsan porta. Aliquam in felis sit amet augue.
          </p>
        </div>

        <div className="footer__links">
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>Help</h4>
          <ul>
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>Resources</h4>
          <ul>
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How-to Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>

      <div className="footer__social">
        <TwitterOutlined />
        <FacebookOutlined />
        <InstagramOutlined />
        <AiOutlinePinterest />
      </div>
    </footer>
  );
}

export default Footer;
