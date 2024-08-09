import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().min(2).max(20).matches(/^[A-Za-z\s]+$/, "Alphabets & spaces are allowed").required('Enter your first name'),
  lastName: Yup.string().min(2).max(20).matches(/^[A-Za-z\s]+$/, "Alphabets & spaces are allowed").required('Enter your last name'),
  email: Yup.string().email('Invalid email address').required('Enter your email'),
  mobileNo: Yup.string().matches(/^[0-9]+$/, "Numbers only").min(10).max(10).required('Enter mobile number'),
  nickName: Yup.string().required('Enter nickname')
});

function Update() {
  const { id } = useParams();
  const [allcontact, setallcontact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios({
        method: 'get',
        url: 'https://service.apikeeda.com/api/v1/contact-book',
        headers: {
          "x-apikeeda-key": "v1723184277282xdw585326115lg"
        }
      });
      setallcontact(response.data);
    };
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: allcontact || {
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        nickName: '',
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const response = await axios({
          method: "patch",
          url: `https://service.apikeeda.com/api/v1/contact-book/${id}`,
          data: values,
          headers: {
            "x-apikeeda-key": "v1723184277282xdw585326115lg"
          }
        });
        console.log(response.data);
      },
    });

  return (
    <Container>
      <div className="container d-flex justify-content-center">
        <div className="box">
          <div className="title">
            <h1>Update Contact</h1>
          </div>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
              {errors.firstName && touched.firstName && (
                <span className="error text-danger">{errors.firstName}</span>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
              {errors.lastName && touched.lastName && (
                <span className="error text-danger">{errors.lastName}</span>
              )}
            </div>
            <div className="col-md-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
              {errors.email && touched.email && (
                <span className="error text-danger">{errors.email}</span>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
              <input type="text" className="form-control" id="mobileNo" name="mobileNo" value={values.mobileNo} onChange={handleChange} onBlur={handleBlur} />
              {errors.mobileNo && touched.mobileNo && (
                <span className="error text-danger">{errors.mobileNo}</span>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="nickName" className="form-label">Nickname</label>
              <input type="text" className="form-control" id="nickName" name="nickName" value={values.nickName} onChange={handleChange} onBlur={handleBlur} />
              {errors.nickName && touched.nickName && (
                <span className="error text-danger">{errors.nickName}</span>
              )}
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success w-25 add_btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Update;
