import axios from "axios";
import { useState, useEffect } from "react";
import { BsArchive, BsFile } from "react-icons/bs";
import { toast } from "react-toastify";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import styles from "../../../styles/admin/Facility.module.css";
import { Input, Loader } from ".././../../src/components/ui/ui";

const Term = () => {
  const [loading, setloading] = useState(false);

  const [termName, setTermName] = useState("");
  const [terms, setTerms] = useState([]);

  const addTerm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/term", {
        name: termName,
      });
      if (res.status == 201) {
        toast.success("Successfully submitted your quotation");
        setloading(false);

        getTerms();
      }
    } catch (error) {
      setloading(false);

      toast.error("Something went wrong");
    }
  };

  const getTerms = async () => {
    setloading(true);
    const res = await axios.get("/api/term");
    if (res.status == 200) {
      setTerms(res.data.terms);
    }

    setloading(false);
  };

  const deleteTerm = async (id) => {
    try {
      const res = await axios.delete(`/api/term/${id}`);
      setTerms(terms.filter((item) => item._id !== id));
      toast.success("Successfully deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getTerms();
  }, []);

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className={styles.wrapper}>
        <h1>Terms</h1>
        <div className={styles.addItem}>
          <Input
            label={"Name"}
            onChange={(e) => setTermName(e.target.value)}
            value={termName}
          />

          <button className={styles.button} onClick={addTerm}>
            Add Term
          </button>
        </div>
        <div className={styles.items}>
          {terms.map((item, index) => (
            <div className={styles.item} key={index}>
              <p>{item.name}</p>

              <div>
                <span onClick={() => deleteTerm(item._id)}>
                  <BsArchive />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Term;
