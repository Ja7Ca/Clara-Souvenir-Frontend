import { useState } from "react";
import { useGetPegawaiQuery } from "../../store/features/pegawai/pegawaiSlice";
import { useGetBarangQuery } from "../../store/features/barang/barangSlice";
import Swal from "sweetalert2";
import { useAddJobMutation } from "../../store/features/job/jobSlice";
import { useNavigate } from "react-router";

const AddJob = () => {
    const { data: pegawai, isSuccess } = useGetPegawaiQuery();
    const { data: barang } = useGetBarangQuery();
    const [tambah] = useAddJobMutation();

    const [form, setForm] = useState({
        pegawai_id: "",
        barang_id: "",
        jumlah: 0,
        tanggal: "",
    });

    const navigate = useNavigate();
    const [msgError, setMsgError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log(form);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.pegawai_id && form.barang_id && form.jumlah && form.tanggal) {
            Swal.fire({
                icon: "question",
                title: "Tambah Job",
                text: "Apakah yakin menambah job?",
                confirmButtonColor: "green",
                confirmButtonText: "Yakin",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    tambah(form).then((response) => {
                        navigate("/dashboard/history");
                    });
                }
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Something is wrong",
                text: "Form harus terisi dengan benar",
            });
        }
    };

    return (
        <div className="container">
            <div className="wrap-form-employe">
                <form method="post" onSubmit={handleSubmit}>
                    <h1>Tambah Job</h1>
                    <label for="pegawai">Pegawai</label>
                    <select
                        onChange={handleChange}
                        class="input-select"
                        name="pegawai_id">
                        <option value="" pegawaiId="">
                            Pilih Pegawai
                        </option>
                        {isSuccess
                            ? pegawai.data.map((el) => (
                                  <option value={el.user_id} pegawaiId={el.id}>
                                      {el.nama}
                                  </option>
                              ))
                            : ""}
                    </select>
                    <label for="noHp">Barang</label>
                    <select
                        onChange={handleChange}
                        class="input-select"
                        name="barang_id">
                        <option value="" barangId="">
                            Pilih Barang
                        </option>
                        {barang
                            ? barang.data.map((el) => (
                                  <option value={el.id} barangId={el.id}>
                                      {el.nama}
                                  </option>
                              ))
                            : ""}
                    </select>
                    <label for="jumlah">Jumlah</label>
                    <input
                        type="number"
                        name="jumlah"
                        placeholder="jumlah"
                        max="2000"
                        onChange={handleChange}></input>
                    <label for="tanggal">Tanggal</label>
                    <input
                        type="date"
                        name="tanggal"
                        placeholder="tanggal"
                        onChange={handleChange}></input>
                    <p style={{ textAlign: "center", color: "red" }}>
                        {msgError}
                    </p>
                    <button type="submit">Tambah Job</button>
                </form>
            </div>
        </div>
    );
};

export default AddJob;
