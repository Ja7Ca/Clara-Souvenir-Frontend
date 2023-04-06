import { useState } from "react";

import {
    useGetOnePegawaiQuery,
    useEditPegawaiMutation,
} from "../../store/features/pegawai/pegawaiSlice";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";

const EditEmploye = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const { data: pegawai, isSuccess } = useGetOnePegawaiQuery(id);

    const regexNohp = /^[0-9]*$/;
    const regexNama = /^[a-zA-Z]*$/;
    const [form, setForm] = useState({
        nama: "",
        noHp: "",
        alamat: "",
    });

    const [edit] = useEditPegawaiMutation();

    if (pegawai && !form.nama && !form.no && !form.alamat) {
        setForm({
            nama: pegawai.data.nama,
            noHp: pegawai.data.no_hp,
            alamat: pegawai.data.alamat,
        });
    }

    const [msgError, setError] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        if (!form.nama && !form.noHp && !form.alamat) {
            setError("Tidak boleh ada yang kosong");
        } else {
            setError("");
        }
        if (!msgError) {
            if (!regexNama.test(form.nama)) {
                setError("Nama tidak boleh mengandung karakter special");
            } else if (!regexNohp.test(form.noHp)) {
                setError("No HP hanya boleh berupa angka");
            } else {
                Swal.fire({
                    icon: "question",
                    title: `Yakin untuk mengubah data?`,
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                }).then((result) => {
                    console.log(id);
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        edit({ form, id })
                            .unwrap()
                            .then((result) => {
                                Swal.fire("Saved!", "", "success");
                                navigate("/dashboard/employe");
                            })
                            .catch((error) => {
                                console.log(error.message);
                            });
                    }
                });
            }
        }
    };
    return (
        <div className="container">
            <div className="wrap-form-employe">
                <form method="post" onSubmit={handleSubmit}>
                    <h1>Edit Pegawai</h1>
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
                    <button type="submit">Edit Pegawai</button>
                </form>
            </div>
        </div>
    );
};

export default EditEmploye;
