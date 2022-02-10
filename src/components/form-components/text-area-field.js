import React from "react";
import { useField } from "formik";

const TextAreaField = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className={props.divclass}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea
                className={`text-input${meta.error && meta.touched ? " error" : ""}`}
                id={props.name}
                {...field}
                {...props}
            />

            {meta.touched && meta.error ? <div className="error-msg">{meta.error}</div> : null}
        </div>
    );
};

export default TextAreaField;
