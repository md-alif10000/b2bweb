import styles from "../../../styles/components/ui/ui.module.css";

const Input = ({type,onChange,label,placeholder,width}) => {
  return (
    <div className={styles.inputContainer} >
      <label htmlFor="" className={styles.inputLabel} >{label}</label>
      <input   className={styles.input}  type={type} onChange={onChange} placeholder={placeholder}  style={{width:width ? width:""}} />
    </div>
  );
};

export  { Input };
