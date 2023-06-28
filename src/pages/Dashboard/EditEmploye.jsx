import { useState } from "react";

import {
    useGetOnePegawaiQuery,
    useEditPegawaiMutation,
} from "../../store/features/pegawai/pegawaiSlice";
import { useWhoamiQuery } from "../../store/features/user/userSlice";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";

const EditEmploye = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: pegawai, isSuccess } = useGetOnePegawaiQuery(id, {
        refetchOnMountOrArgChange: true,
    });
    const { data: user } = useWhoamiQuery();

    const regexNohp = /^[0-9]*$/;
    const regexNama = /^[a-zA-Z]*$/;
    const [form, setForm] = useState({
        nama: "",
        noHp: "",
        alamat: "",
        email: "",
        password: "",
        changePass: false,
    });

    const [edit] = useEditPegawaiMutation();

    if (pegawai && !form.nama && !form.no && !form.alamat && !form.email) {
        setForm({
            ...form,
            nama: pegawai.data.nama,
            noHp: pegawai.data.no_hp,
            alamat: pegawai.data.alamat,
            email: pegawai.data.user.email,
        });
    }

    const [msgError, setError] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === "password") {
            if (e.target.value == "") {
                setForm({
                    ...form,
                    changePass: true,
                    [e.target.name]: e.target.value,
                });
            } else {
                setForm({
                    ...form,
                    changePass: false,
                    [e.target.name]: e.target.value,
                });
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
        console.log(form, e.target.name, e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nama && !form.noHp && !form.alamat && !form.email) {
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
                    confirmButtonText: "Edit",
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        edit({ form, id })
                            .unwrap()
                            .then((result) => {
                                Swal.fire("Saved!", "", "success");
                                navigate("/dashboard/employe");
                                window.location.reload(true);
                            })
                            .catch((error) => {
                                console.log(error.message);
                            });
                    }
                });
            }
        }
    };

    useEffect(() => {
        if (user) {
            if (user.data.role != "Admin") {
                if (user.data.product[0].id != id) {
                    navigate("/dashboard");
                }
            }
        }
    }, [user]);

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
                    <label for="alamat">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={handleChange}
                        value={form.email}
                        required></input>
                    <label for="password">New Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Kosongi jika tidak ingin ganti"
                        onChange={handleChange}
                        value={form.password}></input>
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
