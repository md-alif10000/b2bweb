import React from "react";
import Footer from "../src/components/Footer";
import PrimaryHeader from "../src/components/PrimaryHeader";
import styles from "../styles/Terms.module.css";

const Terms = () => {
  return (
    <>
      <PrimaryHeader />
      <div className={styles.container}>
        <h1>Our terms & Conditions</h1>
        <hr />
        <div className={styles.forImporters}>
          <h2>For Importers</h2>
          <ul>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
          </ul>
        </div>

        <div className={styles.forExporters}>
          <h2>For Exporters</h2>
          <ul>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quasi dicta aliquam facere explicabo?
            </li>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Terms;
