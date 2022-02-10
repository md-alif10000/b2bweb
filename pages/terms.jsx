import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../src/components/Footer";
import PrimaryHeader from "../src/components/PrimaryHeader";
import styles from "../styles/Terms.module.css";

const Terms = () => {
  const [exportersTerms, setexportersTerms] = useState([]);
  const [importersTerms, setimportersTerms] = useState([]);

  const getTerms = async () => {
    const res = await axios.get("/api/terms");
    const { importersTerms, exportersTerms } = res.data;
    setexportersTerms(exportersTerms);
    setimportersTerms(importersTerms);
  };

  useEffect(() => {
    getTerms();
  }, []);

  return (
    <>
      <PrimaryHeader />
      <div className={styles.container}>
        <h1>Our terms & Conditions</h1>
        <hr />
        <div className={styles.forImporters}>
          <h2>For Importers</h2>
          <ul>
            {importersTerms.map((term, index) => (
              <li key={index} >{term.text}</li>
            ))}
          </ul>
        </div>

        <div className={styles.forExporters}>
          <h2>For Exporters</h2>
          <ul>
            {exportersTerms.map((term, index) => (
              <li key={index} >{term.text}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Terms;
