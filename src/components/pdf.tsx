import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import path from "path";


const user = [
    {
        image: "",
        name: "",
        section: ""
    },
];


const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'flex',
        height: '100%',
        width: '100%',
    },
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

const background = path.join(process.cwd(), "public", "background.jpeg");


const Pdf = () => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <Image src={background} style={styles.background}/>

            <View style={styles.section}>

                    <View style={styles.person}>
                        <Image src={background} style={styles.personImage}/>
                        <Text style={{ fontWeight: "bold" }}>Nick Gah</Text>
                        <Text>Informaticien</Text>
                        <Text>éléve</Text>
                        <Text>niga@gmail.com</Text>
                        <Text>0123456789</Text>
                    </View>
                {/* {Array(1).map(() => (
                ))} */}

            </View>

        </Page>
    </Document>
);

export default Pdf;