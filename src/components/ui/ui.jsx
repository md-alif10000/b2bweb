import styles from "../../../styles/components/ui/ui.module.css";
import { BsChevronDoubleUp } from "react-icons/bs";

const Input = ({ type, onChange, label, placeholder, width, value }) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ width: width ? width : "" }}
    >
      <label htmlFor="" className={styles.inputLabel}>
        {label}
      </label>
      <input
        value={value}
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
    <a
      href="#hero"
      className={styles.floatingButton}
      onClick={() => window.pageYOffset === 0}
    >
      <BsChevronDoubleUp size={32} />
    </a>
  );
};

const QuantityInput = ({
  placeholder,
  onChange,
  onUnitChange,
  options = [],
}) => {
  return (
    <div className={styles.quantityInput}>
      <input
        type="number"
        placeholder={placeholder}
        onChange={onChange}
        onUnitChange={onUnitChange}
      />
      <select name="" id="">
        {options.map((option, index) => (
          <option value={option.name}>{option.name}</option>
        ))}
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

const CategorySelect = ({ onChange, options, children ,label}) => {
  console.log(options);
  return (
    <div className={styles.categorySelect}>
      <select onChange={onChange}>
        {label && <option>{label}</option>}
        {children}
        {options.map((opt, index) => (
          <option key={index} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const Loader = () => {
  return <div className={styles.loader}> </div>;
};

export {
  Input,
  FloatingButton,
  QuantityInput,
  BudgetInput,
  CategorySelect,
  Loader,
};
