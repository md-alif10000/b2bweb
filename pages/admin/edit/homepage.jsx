import React from "react";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import { Input } from "../../../src/components/ui/ui";
import styles from "../../../styles/admin/edit/HomePage.module.css";

const homepage = () => {
  return (
    <AdminLayout>
      <form action="" className={styles.form}>
        <div className={styles.hero}>
          <h2>Hero section</h2>
          <div>
            <Input label={"Heading"} />
            <Input label={"Short paragraph"} />
            <Input label={"Email box headnig"} />
            <Input />
          </div>
        </div>
        <div className={styles.signIn}>
          <h2>Sign In section</h2>
          <div>
            <Input label={"Paragraph"} />
            <Input />
            <Input />
            <Input />
          </div>
        </div>

        <div className={styles.facilities}>
          <h2>Facilities section</h2>
          <div>
            <Input label={"Short paragraph"} />
            <Input />
            <Input />
            <Input />
          </div>
        </div>

        <div className={styles.quote}>
          <h2>Quote section</h2>
          <div>
            <Input />
            <Input />
            <Input />
            <Input />
          </div>
        </div>

        <div className={styles.success}>
          <h2>Success section</h2>
          <div>
            <Input label={"Heading"} />
            <div className={styles.inputGroup} >
            <Input label={"Testimonial videos link"} />
            <button className={styles.button} >Add link</button>

            </div>
           
            <Input />
          </div>
        </div>
        <div className={styles.contact}>
          <h2>Contact section</h2>
          <div>
            <div className={styles.inputGroup}>
              <Input label={"Contact 1 title"} />
              <Input label={"Contact 1 address"} />
            </div>
            <div className={styles.inputGroup}>
              <Input label={"Contact 1 title"} />
              <Input label={"Contact 1 address"} />
            </div>
            <div className={styles.inputGroup}>
              <Input label={"Contact 1 title"} />
              <Input label={"Contact 1 address"} />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <h2>Footer section</h2>
          <div>
            <div className={styles.inputGroup}>
              <Input label={"Spcial media icon link"} />
              <Input label={"Social link"} />
              <button className={styles.button} >Add social link</button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default homepage;
1;
