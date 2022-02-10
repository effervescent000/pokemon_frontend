import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import { Modal, ModalBody } from "reactstrap";

import TextInput from "../form-components/text-input";
import PasswordInput from "../form-components/password-input";
import { UserContext } from "../user-context";

const LoginModal = ({ isOpen, toggle }) => {
    const [error, setError] = useState("");
    const { toggleLogin, setUser } = useContext(UserContext);

    const handleSubmit = (values) => {
        setError("");
        axios
            .post(`${process.env.REACT_APP_DOMAIN}/auth/login`, values, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                toggleLogin();
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response.data === "Invalid username/password") {
                    setError(error.response.data);
                }
            });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalBody>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Form>
                        <TextInput label="Username" name="username" />
                        <PasswordInput label="Password" name="password" />
                        <div className="error-msg">{error}</div>
                        <button type="submit">Login</button>
                    </Form>
                </Formik>
            </ModalBody>
        </Modal>
    );
};

export default LoginModal;
