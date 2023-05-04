import "../../assets/css/index.css";

import reportSvg from "../../assets/img/btnmenu-report.svg";
import pembayaranSvg from "../../assets/img/btnmenu-pembayaran.svg";

import BtnMenu from "../../component/menu/BtnMenu";
import { Link } from "react-router-dom";
import Table from "../../component/Table";

const Home = () => {
    document.title = "Clara Souvenir - Dashboard";
    return (
        <div className="container">
            <div className="wrap-btnmenu">
                <Link to={"/dashboard/employe"}>
                    <BtnMenu
                        title="Report"
                        color="#F56954"
                        karyawan="12"
                        image={reportSvg}
                    />
                </Link>
                <Link to={"/dashboard/gaji"}>
                    <BtnMenu
                        title="Pembayaran"
                        color="#00A65A"
                        karyawan="24"
                        image={pembayaranSvg}
                    />
                </Link>
            </div>
            <div className="banner">
                <p>Karyawan</p>
            </div>
            <Table />
        </div>
    );
};

export default Home;
