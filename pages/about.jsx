import React from 'react';
import Footer from '../src/components/Footer';
import PrimaryHeader from '../src/components/PrimaryHeader';
import styles from '../styles/About.module.css'
import {BsFacebook,BsLinkedin,BsPinterest,BsInstagram,BsTwitter} from 'react-icons/bs'

const About = () => {
  return <>
  <PrimaryHeader/>
  <div className={styles.container} >
    <div className={styles.top} >
      <div>
        <h2>About Us</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nemo nihil dolore sunt reprehenderit incidunt architecto aliquam alias, officia dignissimos suscipit eum consequuntur excepturi, quasi iure impedit blanditiis! Accusantium, officia?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ut enim suscipit delectus praesentium doloremque illo quas cum eaque dignissimos eligendi ex cumque accusamus iste esse totam eveniet nihil a perspiciatis, quis laborum corporis excepturi. Doloremque eum voluptas aspernatur ipsum.
        </p>

      </div>

      <div className={styles.imgContainer} >
        <img src="/images/home_bg.png" alt="" />
        <div>
          <h2>Follow us on</h2>
          <div className={styles.iconsContainer} >
          <span> <BsFacebook/> </span>
          <span> <BsInstagram/> </span>
          <span> <BsTwitter/> </span>
          <span> <BsPinterest/> </span>
          <span><BsLinkedin/> </span>

          </div>
         
          
        </div>
      </div>




    </div>

  </div>

  <Footer/>
  

  </>;
};

export default About;
