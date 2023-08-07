import { useEffect, useState } from "react";
import {
    useLazyGetAllJobQuery,
    useDeleteJobMutation,
} from "../../store/features/job/jobSlice";
import Swal from "sweetalert2";

const History = () => {
    let newDate = new Date();
    let date =
        newDate.getDate() < 10
            ? "0" + String(newDate.getDate())
            : newDate.getDate();
    let month =
        newDate.getMonth() + 1 < 10
            ? "0" + String(newDate.getMonth() + 1)
            : newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const [inputDate, setDate] = useState({
        start: year + "-" + month + "-" + date,
        end: year + "-" + month + "-" + date,
    });

    const [getJob, result] = useLazyGetAllJobQuery();
    const [job, setJob] = useState("");
    const [hapus] = useDeleteJobMutation();

    const handleChangeInput = (e) => {
        setDate({
            ...inputDate,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        getJob(inputDate)
            .unwrap()
            .then((res) => {
                setJob(res.data);
            });
    }, [inputDate]);

    return (
        <div className="container">
            <h1>History</h1>
            <div className="wrap-input-date" style={{ marginTop: "2em" }}>
                <div className="input-date">
                    <p>Start Date</p>
                    <input
                        type="date"
                        name="start"
                        value={inputDate.start}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="input-date">
                    <p>End Date</p>
                    <input
                        type="date"
                        name="end"
                        value={inputDate.end}
                        onChange={handleChangeInput}
                    />
                </div>
            </div>

            <table style={{ marginTop: "2em" }}>
                <tr>
                    <th>No</th>
                    <th>Pegawai</th>
                    <th>Barang</th>
                    <th>Jumlah</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                </tr>
                {console.log(job)}
                {job.length > 0
                    ? job.map((el, index) => (
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
