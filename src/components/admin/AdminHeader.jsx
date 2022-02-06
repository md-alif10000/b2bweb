import styles from '../../../styles/admin/AdminHeader.module.css'
import { BsArrowRightCircle } from "react-icons/bs";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {logout} from '../../../src/components/redux/actions/authAction'

const AdminHeader = () => {


 const dispatch= useDispatch()




  return <div className={styles.header} >

    <div></div>

    <div>
      <Link href={"/"}   >
      <a>
        Home
      </a>
      </Link>
    </div>

    <div onClick={()=>dispatch(logout())} >
      <span>Logout </span>
      <span> <BsArrowRightCircle/> </span>
    </div>

  </div>;
};

export default AdminHeader;
