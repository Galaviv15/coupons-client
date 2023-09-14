import React from "react";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer(){

    let currentYear = new Date().getFullYear();

    function scrollToTop() {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }

        return (
          <div className='footer-container'>
            <section className='footer-subscription'>
              <p className='footer-subscription-heading'>
                Subscribe to Coupons4U to receive our best coupon deals
              </p>
              <p className='footer-subscription-text'>
                You can unsubscribe at any time.
              </p>
              <div className='input-areas'>
                <form>
                  <input
                    className='footer-input'
                    type='email'
                    placeholder='Your Email'
                  />
                  <button className="subscribe-btn">Subscribe</button>
                  {/*<Button buttonStyle='btn--outline' type={undefined} onClick={undefined} buttonSize={undefined}>Subscribe</Button>*/}
                </form>
              </div>
            </section>
            <div className='footer-links'>
              <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                  <h2>Contact Us</h2>
                  <Link to='/'>Contact</Link>
                  <Link to='/'>Support</Link>
                  <Link to='/'>Donate</Link>
                  <Link to='/'>Sponsorships</Link>
                </div>
              </div>
              <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                  <h2>Social Media</h2>
                  <Link to='/'>Instagram</Link>
                  <Link to='/'>Facebook</Link>
                  <Link to='/'>Youtube</Link>
                  <Link to='/'>Twitter</Link>
                </div>
              </div>
            </div>
            <section className='social-media'>
              <div className='social-media-wrap'>
                <div className='footer-logo'>
                  <Link to='/' className='social-logo' onClick={scrollToTop}>
                    Coupons4U
                    <TbShoppingCartDiscount/>
                  </Link>
                </div>
                <small className='website-rights'>G.A © {currentYear} </small>
                <div className='social-icons'>
                  <Link
                    className='social-icon-link facebook'
                    to='https://www.facebook.com/'
                    target='_blank'
                    aria-label='Facebook'
                  >
                    <i className='fab fa-facebook-f' />
                  </Link>
                  <Link
                    className='social-icon-link instagram'
                    to='https://www.instagram.com/'
                    target='_blank'
                    aria-label='Instagram'
                  >
                    <i className='fab fa-instagram' />
                  </Link>
                  <Link
                    className='social-icon-link youtube'
                    to='https://www.youtube.com/'
                    target='_blank'
                    aria-label='Youtube'
                  >
                    <i className='fab fa-youtube' />
                  </Link>
                  <Link
                    className='social-icon-link twitter'
                    to='https://twitter.com/'
                    target='_blank'
                    aria-label='Twitter'
                  >
                    <i className='fab fa-twitter' />
                  </Link>
                  <Link
                    className='social-icon-link linkedin'
                    to='https://www.linkedin.com/in/gal-aviv-profile/'
                    target='_blank'
                    aria-label='LinkedIn'
                  >
                    <i className='fab fa-linkedin' />
                  </Link>
                </div>
              </div>
            </section>
          </div>
    );
}


export default Footer;