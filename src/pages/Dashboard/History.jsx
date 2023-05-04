import { useState } from "react";
import {
    useGetAllJobQuery,
    useDeleteJobMutation,
} from "../../store/features/job/jobSlice";
import Swal from "sweetalert2";

const History = () => {
    const { data: job, isSuccess } = useGetAllJobQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );
    const [hapus] = useDeleteJobMutation();

    return (
        <div className="container">
            <h1>History</h1>
            <table style={{ marginTop: "2em" }}>
                <tr>
                    <th>No</th>
                    <th>Pegawai</th>
                    <th>Barang</th>
                    <th>Jumlah</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                </tr>
                {job
                    ? job.data.map((el, index) => (
                          <tr>
                              <td>{index + 1}</td>
                              <td>{el.pegawai.nama}</td>
                              <td>{el.barang.nama}</td>
                              <td>{el.jumlah}</td>
                              <td>{el.tanggal}</td>
                              <td>
                                  <button
                                      className="btn-aksi-employe red"
                                      onClick={() => {
                                          Swal.fire({
                                              icon: "question",
                                              title: "Hapus Job",
                                              text: "Yakin untuk menghapus job?",
                                              confirmButtonColor: "red",
                                              confirmButtonText: "Yakin",
                                              showCancelButton: true,
                                          }).then((result) => {
                                              if (result.isConfirmed) {
                                                  hapus(el.id).then(
                                                      (result) => {
                                                          Swal.fire({
                                                              icon: "success",
                                                              title: `Berhasil Menghapus`,
                                                              confirmButtonText:
                                                                  "Saved",
                                                          }).then((result) => {
                                                              if (
                                                                  result.isConfirmed
                                                              ) {
                                                                  window.location.reload(
                                                                      false
                                                                  );
                                                              }
                                                          });
                                                      }
                                                  );
                                              }
                                          });
                                      }}>
                                      Hapus
                                  </button>
                              </td>
                          </tr>
                      ))
                    : ""}
            </table>
        </div>
    );
};

export default History;
