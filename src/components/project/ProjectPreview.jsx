import React from "react";
import { Document, Page, Text, Image, StyleSheet } from '@react-pdf/renderer';

function ProjectPreview({ form, setForm, onBack }) {
  const styles = StyleSheet.create({
    page: { padding: 32, fontSize: 12 },
    section: { marginBottom: 12 },
    label: { fontWeight: 'bold' },
    image: { width: 80, height: 80, marginBottom: 8, borderRadius: 8 },
  });

  function ProjectPDF({ form }) {
    return (
      <Document>
        <Page style={styles.page}>

        </Page>
      </Document>
    );
  }

  // ...existing code...
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-12 w-full max-w-5xl mx-auto mt-4 space-y-8" style={{ marginTop: "0px" }}>
      {/* ...existing code... */}
    </div>
  );
}

export default ProjectPreview;
