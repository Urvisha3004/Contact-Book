import React, { useEffect, useState } from 'react';
import { IoAdd } from "react-icons/io5";
import img from '../Image/img3.png';
import Button from 'react-bootstrap/Button';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Container, Table } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  mobileNo: '',
  nickName: ''
};

const validationSchema = Yup.object({
  firstName: Yup.string().min(2).max(20).matches(/^[A-Za-z\s]+$/, "Alphabets & spaces are allowed").required('Enter your first name'),
  lastName: Yup.string().min(2).max(20).matches(/^[A-Za-z\s]+$/, "Alphabets & spaces are allowed").required('Enter your last name'),
  email: Yup.string().email('Invalid email address').required('Enter your email'),
  mobileNo: Yup.string().matches(/^[0-9]+$/, "Numbers only").min(10).max(10).required('Enter mobile number'),
  nickName: Yup.string().required('Enter nickname')
});

function Home() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      axios.post('https://service.apikeeda.com/api/v1/contact-book', values, {
        headers: {
          "x-apikeeda-key": "v1723184277282xdw585326115lg"
        }
      })
        .then(response => {
          setData([...data, response.data]);
          handleClose();
        })
        .catch(error => console.error(error));
    }
  });

  useEffect(() => {
    axios.get('https://service.apikeeda.com/api/v1/contact-book', {
      headers: {
        "x-apikeeda-key": "v1723184277282xdw585326115lg"
      }
    })
      .then(response => setData(response.data.data))
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    axios.get(`https://service.apikeeda.com/api/v1/contact-book/search?search=${e.target.value}`, {
      headers: {
        "x-apikeeda-key": "v1723184277282xdw585326115lg"
      }
    })
      .then(response => setData(response.data.data))
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`https://service.apikeeda.com/api/v1/contact-book/${id}`, {
      headers: {
        "x-apikeeda-key": "v1723184277282xdw585326115lg"
      }
    })
      .then(() => {
        setData(data.filter(item => item._id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <Container>
        <div>
          <div className='d-flex justify-content-center align-items-center'>
            <img src={img} alt="" width={80} />
            <h1 className='fw-bold ps-2'>Contact App</h1>
          </div>
          <div className='d-flex justify-content-center align-items-center pt-4'>
            <Button className='add_btn w-50 fw-bold' onClick={handleShow}>
              <IoAdd className='add_icon' /> Add Contact
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: '#1B1A55' }}>Add Contact</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" name='firstName' value={values.firstName} onBlur={handleBlur} onChange={handleChange} />
                    {errors.firstName && touched.firstName ? (<span className="text-danger">{errors.firstName}</span>) : null}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name='lastName' value={values.lastName} onBlur={handleBlur} onChange={handleChange} />
                    {errors.lastName && touched.lastName ? (<span className="text-danger">{errors.lastName}</span>) : null}
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} />
                    {errors.email && touched.email ? (<span className="text-danger">{errors.email}</span>) : null}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="mobileNo" className="form-label">Mobile No</label>
                    <input type="text" className="form-control" name='mobileNo' value={values.mobileNo} onBlur={handleBlur} onChange={handleChange} />
                    {errors.mobileNo && touched.mobileNo ? (<span className="text-danger">{errors.mobileNo}</span>) : null}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="nickName" className="form-label">Nick Name</label>
                    <input type="text" className="form-control" name='nickName' value={values.nickName} onBlur={handleBlur} onChange={handleChange} />
                    {errors.nickName && touched.nickName ? (<span className="text-danger">{errors.nickName}</span>) : null}
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" className='w-25 add_close' onClick={handleClose}>
                      Close
                    </Button>
                    <Button type="submit" className='w-50 add_btn'>
                      Add Contact
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Body>
            </Modal>
          </div>

          <div className='w-100 py-4 d-flex justify-content-center align-items-center'>
            <input type="text" placeholder='Search your Contact...' className='w-50 Search ps-3' onChange={handleSearch} value={search} />
          </div>

          <div className='contact_book'>
            <div className='name_list'>
              <h3>My Contacts</h3>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Nick Name</th>
                    <th className='icons'><FaRegEdit /></th>
                    <th className='icons'><MdOutlineDeleteOutline /></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.mobileNo}</td>
                      <td>{item.nickName}</td>
                      <td className='icons '>
                        <Link to={`/update/${item._id}`} ><FaRegEdit style={{ color: 'black' }} /></Link>
                      </td>
                      <td className='icons' onClick={() => handleDelete(item._id)}><MdOutlineDeleteOutline /></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
