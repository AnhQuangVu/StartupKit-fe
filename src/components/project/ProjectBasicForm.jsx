import React from "react";

function ProjectBasicForm({ form, setForm, onCreate }) {
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        [field]: file,
        [`${field}Preview`]: URL.createObjectURL(file),
      });
    }
  };

  return (
    <form
      className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 w-full max-w-6xl mx-auto mt-4 space-y-8"
      style={{ marginTop: "0px" }}
      onSubmit={e => { e.preventDefault(); onCreate(); }}
    >
      {/* ...existing code... */}
    </form>
  );
}

export default ProjectBasicForm;
