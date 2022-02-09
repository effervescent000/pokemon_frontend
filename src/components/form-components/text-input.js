import React from "react";
import { useField } from "formik";
import { Popover, PopoverBody } from "reactstrap";

const NumberInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className={props.divclass}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input
                className={`text-input${meta.error && meta.touched ? " error" : ""}`}
                id={props.name}
                type="text"
                {...field}
                {...props}
            />

            {meta.touched && meta.error ? (
                <div className="error-msg">
                    <Popover placement="bottom" target={props.name} isOpen>
                        <PopoverBody>{meta.error}</PopoverBody>
                    </Popover>
                </div>
            ) : null}
        </div>
    );
};

export default NumberInput;
