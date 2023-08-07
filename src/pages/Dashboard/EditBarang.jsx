import { useEffect, useState } from "react";
import {
    useGetOneBarangQuery,
    useUpdateBarangMutation,
} from "../../store/features/barang/barangSlice";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const EditBarang = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
        if (form.nama && form.harga) {
            update({ ...form, id }).then((result) => {
                navigate("/dashboard/barang");
                Swal.fire({
                    icon: "success",
                    title: "Update Berhasil",
                    text: "Update Barang Berhasil",
                });
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Form Error",
                text: "Form tidak boleh kosong",
            });
        }
    };

    const { data: barang } = useGetOneBarangQuery(id);
    const [update] = useUpdateBarangMutation();

    useEffect(() => {
        if (barang) {
            setForm({
                nama: barang.data.nama,
                harga: barang.data.harga,
            });
        }
    }, [barang]);

    return (
        <div className="container">
            <div className="wrap-form-employe">
                <h1>Edit Barang</h1>
                <form style={{ marginTop: "2em" }} onSubmit={handleSubmit}>
                    <label for="nama">Nama</label>
                    <input
                        type="text"
                        name="nama"
                        placeholder="Nama"
                        onChange={handleChange}
                        value={form.nama}
                    />
                    <label for="harga">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        placeholder="Harga"
                        onChange={handleChange}
                        value={form.harga}
                    />
                    <button type="submit">Edit Barang</button>
                </form>
            </div>
        </div>
    );
};

export default EditBarang;
