import axios from "axios";
import { useState, useEffect } from "react";
import { BsArchive, BsFile } from "react-icons/bs";
import { toast } from "react-toastify";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import styles from "../../../styles/admin/Facility.module.css";
import { Input, Loader } from ".././../../src/components/ui/ui";

const Unit = () => {
  const [loading, setloading] = useState(false);

  const [unitName, setunitName] = useState("");
  const [units, setunits] = useState([]);

  const addUnit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/unit", {
        name: unitName,
      });
      if (res.status == 201) {
        toast.success("Successfully submitted your quotation");
        setloading(false);

        getUnits();
      }
    } catch (error) {
      setloading(false);

      toast.error("Something went wrong");
    }
  };

  const getUnits = async () => {
    setloading(true);
    const res = await axios.get("/api/unit");
    if (res.status == 200) {
      setunits(res.data.units);
    }

    setloading(false);
  };

  const deleteUnit = async (id) => {
    try {
      const res = await axios.delete(`/api/unit/${id}`);
      setunits(units.filter((item) => item._id !== id));
      toast.success("Successfully deleted");
    } catch (error) {
        console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className={styles.wrapper}>
        <h1>Units</h1>
        <div className={styles.addItem}>
          <Input label={"Name"} onChange={(e) => setunitName(e.target.value)} />

          <button className={styles.button} onClick={addUnit}>
            Add Unit
          </button>
        </div>
        <div className={styles.items}>
          {units.map((item, index) => (
            <div className={styles.item} key={index}>
              <p>{item.name}</p>
              
              <div>
                <span onClick={() => deleteUnit(item._id)}>
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

export default Unit;
