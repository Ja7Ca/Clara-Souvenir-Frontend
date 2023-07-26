import "../../assets/css/menu.css";

const BtnMenu = (props) => {
    let { color, title, karyawan, image } = props;
    return (
        <div className="btn-menu" style={{ backgroundColor: `${color}` }}>
            <p className="btnmenu-title">{title}</p>
            <p className="btnmenu-karyawan">{karyawan}</p>
            <div className="btnmenu-image">
                <img src={image} alt="" />
            </div>
        </div>
    );
};

export default BtnMenu;
