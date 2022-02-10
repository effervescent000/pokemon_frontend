import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import SelectField from "../form-components/select-field";

const PokemonForm = ({ setFilters }) => {
    return (
        <div className="filter-wrapper">
            <Formik
                initialValues={{
                    type: "",
                    color: "",
                }}
                onSubmit={(values) => {
                    setFilters(values);
                }}
            >
                {(props) => (
                    <Form>
                        <SelectField label="Type" name="type">
                            <option value="">---</option>
                            <option value="normal">Normal</option>
                            <option value="ground">Ground</option>
                            <option value="grass">Grass</option>
                            <option value="poison">Poison</option>
                            <option value="water">Water</option>
                        </SelectField>
                        <SelectField label="Color" name="color">
                            <option value="">---</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="blue">Blue</option>
                        </SelectField>
                        <button type="submit">Search</button>
                        <button
                            type="reset"
                            onClick={() => {
                                props.handleReset();
                                setFilters({});
                            }}
                        >
                            Reset
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PokemonForm;
