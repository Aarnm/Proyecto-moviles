import axios from "../services/axiosInstance";

export async function getProductoMasVendido() {
    const url = `http://localhost:4000/api/producto-mas-vendido`;
    const { data } = await axios.get(url);
    return data;
}
