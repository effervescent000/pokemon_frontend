import React, { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import { Modal, ModalBody } from "reactstrap";

import TextInput from "../form-components/text-input";
import PasswordInput from "../form-components/password-input";
import { UserContext } from "../user-context";

const LoginModal = ({ isOpen, toggle }) => {
    const { toggleLogin } = useContext(UserContext);

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalBody>
                <Formik initialValues={{ username: "", password: "" }}>
                    <Form>
                        <TextInput label="Username" name="username" />
                        <PasswordInput label="Password" name="password" />
                        <button type="submit">Login</button>
                    </Form>
                </Formik>
            </ModalBody>
        </Modal>
    );
};

export default LoginModal;
