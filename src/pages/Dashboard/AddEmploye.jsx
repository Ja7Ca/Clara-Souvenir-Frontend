import { useState } from "react";

import { useAddPegawaiMutation } from "../../store/features/pegawai/pegawaiSlice";
import { useNavigate } from "react-router";

const AddEmploye = () => {
    const navigate = useNavigate();

    const regexNohp = /^[0-9]*$/;
    const regexNama = /^[a-zA-Z]*$/;
    const [form, setForm] = useState({
        nama: "",
        noHp: "",
        alamat: "",
    });

    const [msgError, setError] = useState("");

    const [tambahPegawai, { isLoading }] = useAddPegawaiMutation();

    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nama && !form.noHp && !form.alamat) {
            setError("Tidak boleh ada yang kosong");
        } else {
            setError("");
        }
        if (!msgError) {
            console.log(!regexNama.test(form.nama), !regexNohp.test(form.noHp));
            if (!regexNama.test(form.nama)) {
                setError("Nama tidak boleh mengandung karakter special");
            } else if (!regexNohp.test(form.noHp)) {
                setError("No HP hanya boleh berupa angka");
            } else {
                await tambahPegawai(form)
                    .unwrap()
                    .then((result) => {
                        console.log(result);
                        navigate("/dashboard/employe");
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            }
        }
    };
    return (
        <div className="container">
            <div className="wrap-form-employe">
                <form method="post" onSubmit={handleSubmit}>
                    <h1>Tambah Pegawai</h1>
                    <label for="nama">Nama</label>
                    <input
                        type="text"
                        name="nama"
                        placeholder="Nama"
                        onChange={handleChange}
                        value={form.nama}></input>
                    <label for="noHp">NO HP</label>
                    <input
                        type="text"
                        name="noHp"
                        placeholder="No Hp"
                        onChange={handleChange}
                        value={form.noHp}></input>
                    <label for="alamat">Alamat</label>
                    <input
                        type="text"
                        name="alamat"
                        placeholder="alamat"
                        onChange={handleChange}
                        value={form.alamat}></input>
                    <p style={{ textAlign: "center", color: "red" }}>
                        {msgError}
                    </p>
                    <button type="submit">Tambah Pegawai</button>
                </form>
            </div>
        </div>
    );
};

export default AddEmploye;
