import styles from "../../../styles/components/ui/ui.module.css";
import { BsChevronDoubleUp } from "react-icons/bs";

const Input = ({ type, onChange, label, placeholder, width }) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ width: width ? width : "" }}
    >
      <label htmlFor="" className={styles.inputLabel}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

const FloatingButton = () => {
  return (
    <a href="#hero" className={styles.floatingButton}  onClick={()=>window.pageYOffset===0} >
      <BsChevronDoubleUp size={32} />
    </a>
  );
};

const QuantityInput = ({ placeholder, onChange ,onUnitChange}) => {
  return (
    <div className={styles.quantityInput}>
      <input type="text" placeholder={placeholder} onChange={onChange} onUnitChange={onUnitChange}/>
      <select name="" id="">
        <option value="">UNIT</option>
        <option value="">kg</option>
        <option value="">Pcs</option>
        <option value="">Gm</option>
      </select>
    </div>
  );
};

const BudgetInput = ({ placeholder, onChange }) => {
  return (
    <div className={styles.budgetInput}>
      <input type="text" placeholder={placeholder} onChange={onChange} />
      <span>$</span>
    </div>
  );
};

export { Input, FloatingButton, QuantityInput, BudgetInput };
