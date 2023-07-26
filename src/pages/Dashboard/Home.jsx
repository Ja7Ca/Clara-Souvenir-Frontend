import "../../assets/css/index.css";

import reportSvg from "../../assets/img/btnmenu-report.svg";
import pembayaranSvg from "../../assets/img/btnmenu-pembayaran.svg";

import BtnMenu from "../../component/menu/BtnMenu";
import { Link } from "react-router-dom";
import Table from "../../component/Table";

import {
    useWhoamiQuery,
    useDashboardQuery,
} from "../../store/features/user/userSlice";

const Home = () => {
    document.title = "Clara Souvenir - Dashboard";

    const { data: user } = useWhoamiQuery();
    const { data: dashboard } = useDashboardQuery();

    return (
        <div className="container">
            <div className="wrap-btnmenu">
                <Link to={"/dashboard/employe"}>
                    <BtnMenu
                        title="Report"
                        color="#F56954"
                        karyawan={
                            dashboard ? `${dashboard.data.job} report` : ""
                        }
                        image={pembayaranSvg}
                    />
                </Link>
                <Link to={"/dashboard/gaji"}>
                    <BtnMenu
                        title="Karyawan"
                        color="#00A65A"
                        karyawan={
                            dashboard
                                ? `${dashboard.data.user - 1} karyawan`
                                : ""
                        }
                        image={reportSvg}
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
