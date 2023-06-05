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
            </div>
            <table>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Nomor Hp</th>
                    <th>Alamat</th>
                    <th>Aksi</th>
                </tr>
                {pegawai
                    ? pegawai.data.map((el, i) => (
                          <tr>
                              <td>{i + 1}.</td>
                              <td>{el.nama}</td>
                              <td>{el.no_hp}</td>
                              <td>{el.alamat}</td>
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
