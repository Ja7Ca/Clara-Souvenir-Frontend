import ReactModal from "react-modal";
import Table from "../../component/Table";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    useGetPegawaiQuery,
    useDeletePegawaiMutation,
} from "../../store/features/pegawai/pegawaiSlice";
import Swal from "sweetalert2";

const Employe = () => {
    const [modalDelete, setModalDelete] = useState(false);
    const [hapus] = useDeletePegawaiMutation();

    const { data: pegawai } = useGetPegawaiQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );
    console.log(pegawai);

    useEffect(() => {
        document.title = "Clara Souvenir - Employe";
    }, pegawai);
    return (
        <div className="container">
            <div className="wrap-btn-employe">
                <Link
                    to={"/dashboard/employe/add"}
                    className="text-decoration-none">
                    <button className="btn-employe">+Add</button>
                </Link>
                <Link to={"/"} className="text-decoration-none">
                    <button className="btn-employe">
                        <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 5V2H6V5H4V0H16V5H14ZM2 7H18H4H2ZM16 9.5C16.2833 9.5 16.5207 9.404 16.712 9.212C16.904 9.02067 17 8.78333 17 8.5C17 8.21667 16.904 7.979 16.712 7.787C16.5207 7.59567 16.2833 7.5 16 7.5C15.7167 7.5 15.4793 7.59567 15.288 7.787C15.096 7.979 15 8.21667 15 8.5C15 8.78333 15.096 9.02067 15.288 9.212C15.4793 9.404 15.7167 9.5 16 9.5ZM14 16V12H6V16H14ZM16 18H4V14H0V8C0 7.15 0.291667 6.43767 0.875 5.863C1.45833 5.28767 2.16667 5 3 5H17C17.85 5 18.5627 5.28767 19.138 5.863C19.7127 6.43767 20 7.15 20 8V14H16V18ZM18 12V8C18 7.71667 17.904 7.479 17.712 7.287C17.5207 7.09567 17.2833 7 17 7H3C2.71667 7 2.479 7.09567 2.287 7.287C2.09567 7.479 2 7.71667 2 8V12H4V10H16V12H18Z"
                                fill="white"
                            />
                        </svg>
                        Cetak
                    </button>
                </Link>
            </div>
            <table>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Nomor Hp</th>
                    <th>Alamat</th>
                    <th>Total</th>
                    <th>Aksi</th>
                </tr>
                {pegawai
                    ? pegawai.data.map((el, i) => (
                          <tr>
                              <td>{i + 1}.</td>
                              <td>{el.nama}</td>
                              <td>{el.no_hp}</td>
                              <td>{el.alamat}</td>
                              <td>5000</td>
                              <td>
                                  <div className="wrap-aksi-employe">
                                      <Link
                                          to={`/dashboard/employe/${el.id}`}
                                          className="btn-aksi-employe green">
                                          Edit
                                      </Link>
                                      <button
                                          className="btn-aksi-employe red"
                                          onClick={() =>
                                              Swal.fire({
                                                  icon: "warning",
                                                  title: `Yakin untuk menghapus ${el.nama}`,
                                                  showCancelButton: true,
                                                  confirmButtonText: "Delete",
                                                  confirmButtonColor: "red",
                                              }).then((result) => {
                                                  if (result.isConfirmed) {
                                                      hapus(el.id)
                                                          .unwrap()
                                                          .then((result) => {
                                                              Swal.fire({
                                                                  icon: "success",
                                                                  title: `Berhasil Menghapus`,
                                                                  confirmButtonText:
                                                                      "Saved",
                                                              }).then(
                                                                  (result) => {
                                                                      if (
                                                                          result.isConfirmed
                                                                      ) {
                                                                          window.location.reload(
                                                                              false
                                                                          );
                                                                      }
                                                                  }
                                                              );
                                                          });
                                                  }
                                              })
                                          }>
                                          Hapus
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))
                    : ""}
            </table>
            <ReactModal
                isOpen={modalDelete}
                style={{ zIndex: "2", position: "relative" }}>
                <h1 className="text-danger">
                    Apakah Anda Yakin Untuk Menghapus?
                </h1>
                <div className="wrap-btn-modal">
                    <button
                        className="btn-aksi-employe green"
                        onClick={() => setModalDelete(false)}>
                        Batal
                    </button>
                    <button
                        className="btn-aksi-employe red"
                        onClick={() => setModalDelete(false)}>
                        Hapus
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default Employe;
