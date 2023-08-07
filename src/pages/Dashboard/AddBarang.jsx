import { useState } from "react";
import { useAddBarangMutation } from "../../store/features/barang/barangSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddBarang = () => {
    const navigate = useNavigate();

    const [tambah] = useAddBarangMutation();

    const [form, setForm] = useState({
        nama: "",
        harga: "",
    });

    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if (form.nama && form.harga) {
            tambah(form)
                .unwrap()
                .then((result) => {
                    if (result.success) {
                        navigate("/dashboard/barang");
                        Swal.fire({
                            icon: "success",
                            title: "Success Tambah",
                            text: "Berhasil Tambah Barang",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Server Error",
                            text: "Internal Server Error",
                        });
                    }
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Form Error",
                text: "Form Harus Terisi",
            });
        }
    };

    return (
        <div className="container">
            <div className="wrap-form-employe">
                <form>
                    <h1>Tambah Barang</h1>
                    <label for="nama">Type</label>
                    <input
                        type="text"
                        name="nama"
                        placeholder="Nama"
                        onChange={handleChange}
                        value={form.nama}
                        required></input>
                    <label for="harga">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        placeholder="Harga"
                        onChange={handleChange}
                        value={form.harga}
                        required></input>
                    <button type="submit" onClick={handleSubmit}>
                        Tambah Barang
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBarang;
