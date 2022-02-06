import { useState, useEffect } from "react";
import AdminLayout from "../../src/components/admin/AdminLayout";
import styles from "../../styles/admin/Categories.module.css";
import { Input } from "../../src/components/ui/ui";
import { FaEdit } from "react-icons/fa";
import { BsArchive } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const Category = () => {
  const [category, setcategory] = useState("");
  const [categories, setcategories] = useState([]);
  const [categoryUpdate, setcategoryUpdate] = useState(null);

  const getCategories = async () => {
    try {
      const res = await axios.get("/api/category");

      if (res.status == 200) {
        setcategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    if (!category) return toast.error("Category name is required");

    try {
      const res = await axios.post("/api/category", { category });

      if (res.status == 201) {
        toast.success("Successfully created new category");
        setcategories([...categories, { name: category }]);
        setcategory("");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`);

      if (res.status == 200) {
        toast.success("Successfully deleted  category");
        setcategories(categories.filter((cat) => cat._id !== id));
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    getCategories();
  };

  const updateCategory = async () => {

    console.log(categoryUpdate)
    try {
      const res = await axios.put(`/api/category/${categoryUpdate._id}`, {
        category: categoryUpdate.name,
      });

      if (res.status == 200) {
        toast.success("Successfully updated  category");
    
        getCategories()
        setcategoryUpdate(null)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }


  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <AdminLayout>
      <div className={styles.wrapper}>
        <div className={styles.addCategory}>
          <Input
            placeholder={"Enter category name"}
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          />
          <button onClick={createCategory}>Add new Category</button>
        </div>
        {categoryUpdate && (
          <div className={styles.addCategory}>
            <Input
              placeholder={"Enter category name"}
              value={categoryUpdate.name}
              onChange={(e) =>
                setcategoryUpdate({ ...categoryUpdate, name: e.target.value })
              }
            />
            <button onClick={updateCategory}>Update Category</button>
          </div>
        )}

        <div className={styles.categories}>
          {categories.map((cat, index) => (
            <div className={styles.category} key={index}>
              <span>{cat.name}</span>
              <div>
                <span onClick={() => deleteCategory(cat._id)}>
                  <BsArchive />{" "}
                </span>
                <span onClick={() => setcategoryUpdate(cat)}>
                  <FaEdit />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Category;
