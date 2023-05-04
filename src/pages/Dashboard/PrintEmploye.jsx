import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
import ReactDOMServer from "react-dom/server";

import { useGetPegawaiQuery } from "../../store/features/pegawai/pegawaiSlice";
import { Html } from "react-pdf-html";

const PrintEmploye = () => {
    const { data: pegawai, isSuccess } = useGetPegawaiQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );
    const styles = StyleSheet.create({
        page: {
            // flexDirection: "coloun",
            backgroundColor: "white",
        },
        section: {
            margin: 10,
            padding: 10,
            // flexGrow: 1,
        },
    });
    const style = {
        body: {
            fontSize: 16,
        },
        table: {
            borderCollapse: "collapse",
            width: "100%",
        },
        th: {
            backgroundColor: "#8d95a03a",
            fontWeight: "bold",
            borderRight: "1px solid #ccc",
            padding: "1.25em 0",
            width: "1px",
            whiteSpace: "nowrap",
        },
        tr: {
            backgroundColor: "white",
            textAlign: "center",
        },
        [".table-data"]: {
            borderRight: "1px solid #ccc",
            padding: "1.25em 0",
            fontWeight: "regular",
        },
        [".last"]: {
            border: 0,
        },
        [".no"]: {
            width: "10%",
        },
    };

    const element = (
        <body>
            <h4 style={{ textAlign: "center" }}>
                Daftar Pegawai Clara Souvenir
            </h4>
            <table style={styles.table}>
                <tr style={styles.tr}>
                    <th
                        className="table-head no"
                        id="no"
                        style={{ width: "30px" }}>
                        No
                    </th>
                    <th className="table-head" id="nama">
                        Nama
                    </th>
                    <th className="table-head" id="hp">
                        Nomor Hp
                    </th>
                    <th className="table-head last" id="alamat">
                        Alamat
                    </th>
                </tr>
                {pegawai
                    ? pegawai.data.map((el, i) => (
                          <tr
                              className={
                                  i == pegawai.data.length ? "last" : ""
                              }>
                              <td className="table-data">{i + 1}</td>
                              <td className="table-data">{el.nama}</td>
                              <td className="table-data">{el.no_hp}</td>
                              <td className="table-data last">{el.alamat}</td>
                          </tr>
                      ))
                    : ""}
            </table>
            <table>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <div style={{ float: "left" }}>
                            <h6 style={{ margin: "0", textAlign: "left" }}>
                                Klaten, 29 April 2022
                                <br />
                                CEO Clara Souvenir
                                <br />
                                <br />
                                <br />
                                Clara Sekar Desanti H
                            </h6>
                        </div>
                    </td>
                </tr>
            </table>
        </body>
    );

    const html = ReactDOMServer.renderToStaticMarkup(element);

    if (pegawai) {
        return (
            <PDFViewer style={{ width: "100vw", height: "100vh" }}>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Html stylesheet={style}>{html}</Html>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        );
    }
};

export default PrintEmploye;
