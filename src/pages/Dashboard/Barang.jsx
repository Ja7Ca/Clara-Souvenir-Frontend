import { Link } from "react-router-dom";
import { useGetAllBarangQuery } from "../../store/features/barang/barangSlice";
import { useWhoamiQuery } from "../../store/features/user/userSlice";

const Barang = () => {
    const { data: barang } = useGetAllBarangQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );
    const { data: user } = useWhoamiQuery();

    return (
        <div className="container">
            <h1>Barang</h1>
            {user ? (
                user.data.role == "Admin" ? (
                    <Link
                        to={"/dashboard/barang/add"}
                        className="text-decoration-none">
                        <button className="btn-employe">+Add</button>
                    </Link>
                ) : (
                    ""
                )
            ) : (
                ""
            )}
            <table style={{ marginTop: "2em" }}>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                </tr>
                {barang
                    ? barang.data.map((el, index) => (
                          <tr>
                              <td>{index + 1}</td>
                              <td>{el.nama}</td>
                              <td>{el.harga}</td>
                              <td>
                                  <Link
                                      to={`/dashboard/barang/${el.id}`}
                                      className="btn-aksi-employe green">
                                      Edit
                                  </Link>
                              </td>
                          </tr>
                      ))
                    : ""}
            </table>
        </div>
    );
};

export default Barang;
