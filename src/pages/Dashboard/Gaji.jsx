import { useGetPegawaiQuery } from "../../store/features/pegawai/pegawaiSlice";
import { useLazyGetJobDateQuery } from "../../store/features/job/jobSlice";
import { useState, useEffect } from "react";
import _ from "lodash";

const Gaji = () => {
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

    const [trigger, setTrigger] = useState(false);
    const [job, setJob] = useState("");
    const [getJob, result] = useLazyGetJobDateQuery();
    const { data: pegawai, isSuccess } = useGetPegawaiQuery();
    const [pegawaiActive, setPegawaiActive] = useState("");

    const [inputDate, setDate] = useState({
        start: year + "-" + month + "-" + date,
        end: year + "-" + month + "-" + date,
    });

    useEffect(() => {
        document.title = "Clara Souvenir - Gaji";
        if (pegawaiActive) {
            getJob({
                pegawai_id: pegawaiActive,
                start: inputDate.start,
                end: inputDate.end,
            });
        } else {
            getJob({
                pegawai_id: 2,
                start: inputDate.start,
                end: inputDate.end,
            });
        }
        console.log(result.data);
        if (result.isSuccess) {
            setJob(result.data);
        }
    }, [result.data, job, trigger, inputDate]);

    const toRp = (angka) => {
        let rp = "";
        let count = 3;
        for (let i = 0; i < String(angka).length; i++) {
            if (
                i == String(angka).length % 3 &&
                String(angka).length % 3 !== 0 &&
                i <= String(angka).length % 3
            ) {
                rp += `.${String(angka)[i]}`;
            } else if (count == 1) {
                rp += `.${String(angka)[i]}`;
                count = 3;
            } else if (i >= String(angka).length % 3) {
                rp += `${String(angka)[i]}`;
                count--;
            } else {
                rp += `${String(angka)[i]}`;
            }
        }
        return rp;
    };

    const handleChange = async (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setPegawaiActive(e.target.value);
        setTrigger(!trigger);
    };

    const handleChangeInput = (e) => {
        setDate({
            ...inputDate,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            <div className="wrap-input-date">
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
            <table>
                <tr>
                    <th>Nama</th>
                    <th>Type</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Gaji</th>
                </tr>
                {!_.isEmpty(job.data)
                    ? job.data.map((el, index) => (
                          <tr>
                              <td>
                                  {index == 0 ? (
                                      <select
                                          onChange={handleChange}
                                          style={{
                                              width: "6.750em",
                                              border: "0",
                                          }}>
                                          {isSuccess
                                              ? pegawai.data.map((el) => (
                                                    <option
                                                        value={el.user_id}
                                                        pegawaiId={el.id}
                                                        selected={
                                                            pegawaiActive ===
                                                            el.user_id
                                                                ? "selected"
                                                                : ""
                                                        }>
                                                        {el.nama}
                                                    </option>
                                                ))
                                              : ""}
                                      </select>
                                  ) : (
                                      ""
                                  )}
                              </td>
                              <td>{el.barang.nama}</td>
                              <td>Rp {toRp(el.barang.harga)}</td>
                              <td>{el.jumlah}</td>
                              <td>Rp {toRp(el.barang.harga * el.jumlah)}</td>
                          </tr>
                      ))
                    : ""}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total</td>
                    <td>Rp {toRp(job.total)}</td>
                </tr>
            </table>
        </>
    );
};

export default Gaji;
