import React from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import Cookies from "js-cookie";

import TextAreaField from "../form-components/text-area-field";
import Checkbox from "../form-components/checkbox";

const NoteForm = ({ id, notes, setNotes }) => {
    const handleSubmit = (values) => {
        axios
            .post(
                `${process.env.REACT_APP_DOMAIN}/note/add`,
                { pokemon: id, content: values.content, private: values.private },
                {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                }
            )
            .then((response) => {
                setNotes([...notes, response.data]);
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <div className="note-form-wrapper">
            <Formik
                initialValues={{ content: "", private: false }}
                onSubmit={(values) => handleSubmit(values)}
            >
                <Form>
                    <TextAreaField
                        label=""
                        name="content"
                        divclass="textarea-wrapper"
                        placeholder="Add a note here"
                    />
                    <div className="bottom-wrapper">
                        <Checkbox label="Private?" name="private" />
                        <button type="submit">Save</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default NoteForm;
