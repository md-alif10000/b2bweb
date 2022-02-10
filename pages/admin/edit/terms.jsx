import { useState, useEffect } from "react";
import { BsArchive } from "react-icons/bs";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import styles from "../../../styles/admin/edit/Terms.module.css";
import { Input } from "../../../src/components/ui/ui";
import axios from "axios";
import { toast } from "react-toastify";
const Terms = () => {
  const [importersTerms, setimportersTerms] = useState([]);
  const [exportersTerms, setexportersTerms] = useState([]);
  const [termText, settermText] = useState("");

  const [loading, setloading] = useState(false);
  const getTerms = async () => {
    setloading(true);
    const res = await axios.get("/api/terms");
    if (res.status == 200) {
      setimportersTerms(res.data.importersTerms);
    }

    setloading(false);
  };

  const addTerm = async (For) => {
    try {
      const res = await axios.post(`/api/terms`, { text: termText, For });
      toast.success("Successfully added");
      settermText("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const deleteTerm = async (id, For) => {
    try {
      const res = await axios.delete(`/api/terms/${id}`);

      if (For == "importers") {
        setimportersTerms(importersTerms.filter((item) => item._id !== id));
      }

      setexportersTerms(exportersTerms.filter((item) => item._id !== id));
      toast.success("Successfully deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getTerms();
  }, []);

  return (
    <>
      <AdminLayout>
        <div className={styles.container}>
          <div className={styles.addTerms}>
            <div className={styles.inputGroup}>
              <Input onChange={(e) => settermText(e.target.value)} />
              <button
                className={styles.button}
                onClick={() => addTerm("importers")}
              >
                Add terms for Importers
              </button>
            </div>

            <div className={styles.inputGroup}>
              <Input onChange={(e) => settermText(e.target.value)} />

              <button
                className={styles.button}
                onClick={() => addTerm("exporters")}
              >
                Add terms for Exporters
              </button>
            </div>
          </div>

          <div className={styles.termsWrapper}>
            <h2>Terms for Importers</h2>

            <div className={styles.terms}>
              {importersTerms?.map((item, index) => (
                <div className={styles.term} key={index}>
                  <p>{item.text}</p>
                  <span onClick={() => deleteTerm(item._id, "importers")}>
                    <BsArchive />
                  </span>
                </div>
              ))}
            </div>

            <h2>Terms for Exporters</h2>

            <div className={styles.terms}>
              {importersTerms?.map((item, index) => (
                <div className={styles.term} key={index}>
                  <p>{item.text}</p>
                  <span onClick={() => deleteTerm(item._id, "exporters")}>
                    <BsArchive />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Terms;
