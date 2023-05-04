import { useGetPegawaiQuery } from "../../store/features/pegawai/pegawaiSlice";
import { useLazyGetJobDateQuery } from "../../store/features/job/jobSlice";
import { useState, useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import easyinvoice from "easyinvoice";

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

    const handleChangeInput = (e) => {
        setDate({
            ...inputDate,
            [e.target.name]: e.target.value,
        });
    };

    const getData = async () => {
        console.log(job, pegawai, pegawai.data);
        if (!_.isEmpty(job.data) && !_.isEmpty(pegawai)) {
            let dataPdf = {
                images: {
                    logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
                    // background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg'
                },
                sender: {
                    company: "Clara Souvenir",
                    address: "Pakis, Klaten",
                    zip: "57171",
                    city: "Jawa Tengah",
                    country: "Indonesia",
                },
                client: {
                    company: "",
                    address: "",
                    zip: "57171",
                    city: "Jawa Tengah",
                    country: "Indonesia",
                },
                information: {
                    number: "2021.0001",
                    date: inputDate.start,
                    "end-date": inputDate.end,
                },
                products: [],
                "bottom-notice": "Have a nice day",
            };
            job.data.map(async (el) => {
                await dataPdf.products.push({
                    quantity: el.jumlah,
                    description: el.barang.nama,
                    "tax-rate": 0,
                    price: el.barang.harga,
                });
            });
            pegawai.data.map(async (el) => {
                if (el.user_id == pegawaiActive) {
                    dataPdf.client.company = el.nama;
                    dataPdf.client.address = el.alamat;
                }
            });
            return await dataPdf;
        } else {
            return false;
        }
    };

    const downloadInvoice = async () => {
        console.log(getData());
        const dataPdf = await getData();
        const result = await easyinvoice.createInvoice(dataPdf);
        easyinvoice.download("myInvoice.pdf", result.pdf);
        //	you can download like this as well:
        //	easyinvoice.download();
        //	easyinvoice.download('myInvoice.pdf');
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
            <div
                onClick={downloadInvoice}
                to={"/dashboard/print/employe"}
                className="text-decoration-none">
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
                              <td>
                                  {formatRupiah(String(el.barang.harga), "Rp")}
                              </td>
                              <td>{el.jumlah}</td>
                              <td>
                                  {formatRupiah(
                                      String(el.barang.harga * el.jumlah),
                                      "Rp"
                                  )}
                              </td>
                          </tr>
                      ))
                    : ""}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total</td>
                    <td>{formatRupiah(String(job.total), "Rp")}</td>
                </tr>
            </table>
        </>
    );
};

export default Gaji;
