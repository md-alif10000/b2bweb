import styles from "../../../styles/components/ui/ui.module.css";
import { BsChevronDoubleUp } from "react-icons/bs";

const Input = ({type,onChange,label,placeholder,width}) => {
  return (
    <div className={styles.inputContainer} >
      <label htmlFor="" className={styles.inputLabel} >{label}</label>
      <input   className={styles.input}  type={type} onChange={onChange} placeholder={placeholder}  style={{width:width ? width:""}} />
    </div>
  );
};


const FloatingButton=()=>{
  return <a href="#header"  className={styles.floatingButton}>
    <BsChevronDoubleUp size={32} />


  </a>
}

export  { Input ,FloatingButton};
