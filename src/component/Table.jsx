import "../assets/css/table.css";

import { useGetPegawaiQuery } from "../store/features/pegawai/pegawaiSlice";
import { useLazyGetJobQuery } from "../store/features/job/jobSlice";
import { useEffect, useState } from "react";

import _ from "lodash";

const Table = () => {
    const [trigger, setTrigger] = useState(false);
    const [job, setJob] = useState("");
    const [getJob, result] = useLazyGetJobQuery();
    const { data: pegawai, isSuccess } = useGetPegawaiQuery();
    const [pegawaiActive, setPegawaiActive] = useState("");

    useEffect(() => {
        if (pegawaiActive) {
            getJob(pegawaiActive);
        } else {
            getJob(2);
        }
        console.log(result.data);
        if (result.isSuccess) {
            setJob(result.data.data);
        }
        console.log(job);
    }, [result.data, job, trigger]);

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

    function formatRupiah(angka, prefix) {
        var number_string = angka.replace(/[^,\d]/g, "").toString(),
            split = number_string.split(","),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            let separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
        }

        rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
        return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    }

    const handleChange = async (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setPegawaiActive(e.target.value);
        setTrigger(!trigger);
    };

    return (
        <table>
            <tr>
                <th>Nama</th>
                <th>Type</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Gaji</th>
            </tr>
            {!_.isEmpty(job)
                ? job.map((el, index) => (
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
                          <td>Rp {formatRupiah(String(el.barang.harga))}</td>
                          <td>{el.jumlah}</td>
                          <td>
                              Rp{" "}
                              {formatRupiah(
                                  String(el.barang.harga * el.jumlah)
                              )}
                          </td>
                      </tr>
                  ))
                : ""}
        </table>
    );
};

export default Table;
