import fs from "fs"
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from "@react-pdf/renderer";
import { Person } from "@prisma/client";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#fff",
    },
    section: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        flexWrap: "wrap",
        maxWidth: 620
    },
    person: {
        width: 200,
        height: 200,
        display: "flex",
        gap: "5px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    personImage: {
        borderRadius: "100%",
        borderWidth: "1px",
        borderColor: "white",
        width: 180,
        height: 180,
    }
});

const Pdf: React.FC<{ tromb: Person[] }> = ({ tromb }) => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={styles.section}>

                {tromb.map((e, i) => {
                    const p = e.photo ? `/uploads/photo/${e.photo}` : "default-avatar-icon.jpg";
                    const bitmap = fs.readFileSync(`${__dirname}/public/${p}`)
                    const a = Buffer.from(bitmap).toString("base64");

                    return (
                        <View key={i} style={styles.person}>
                            <Image src={`data:image/${p.split(".").at(-1)};base64, ${a}`} style={styles.personImage}/>
                            <Text style={{ fontWeight: "bold" }}>{e.name}</Text>
                            <Text>{e.email}</Text>
                            <Text>{e.tel}</Text>
                            <Text>{e.function}</Text>
                            <Text>{e.section}</Text>
                        </View>
                    )
                })}

            </View>

        </Page>
    </Document>
);

export default Pdf;