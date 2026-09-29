export const textField = (id, label, hint = "") => ({ id, label, hint, type: "textarea" });
export const shortField = (id, label, inputType = "text") => ({ id, label, type: "text", inputType });
export const choices = (id, label, options) => ({ id, label, type: "choices", options });
export const listField = (id, label, count = 3, hint = "") => ({ id, label, count, hint, type: "list" });
export const section = (id, title, fields, description = "") => ({ id, title, fields, description });
