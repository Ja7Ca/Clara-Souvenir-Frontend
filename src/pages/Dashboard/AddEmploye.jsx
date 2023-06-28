import { useEffect, useState } from "react";

import { useAddPegawaiMutation } from "../../store/features/pegawai/pegawaiSlice";
import { useWhoamiQuery } from "../../store/features/user/userSlice";

import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddEmploye = () => {
    const navigate = useNavigate();

    const regexNohp = /^[0-9]*$/;
    const regexNama = /^[a-z A-Z]*$/;
    const [form, setForm] = useState({
        username: "",
        email: "",
        nama: "",
        noHp: "",
        alamat: "",
        password: "",
    });

    const [msgError, setError] = useState("");

    const { data: user } = useWhoamiQuery();
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
                        if (result.success) {
                            navigate("/dashboard/employe");
                        } else {
                            Swal.fire({
                                title: result.message,
                                text: "Tambah Gagal",
                                icon: "error",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            }
        }
    };

    useEffect(() => {
        if (user) {
            if (user.data.role != "Admin") {
                navigate("/dashboard");
            }
        }
    }, [user]);

    return (
        <div className="container">
            <div className="wrap-form-employe">
                <form method="post" onSubmit={handleSubmit}>
                    <h1>Tambah Pegawai</h1>
                    <label for="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={form.username}></input>
                    <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={form.email}></input>
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
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        value={form.password}></input>
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
