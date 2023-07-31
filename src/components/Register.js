import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerUser } from '../helpers/helper';
import convertToBase64 from '../helpers/convert';

import styles from '../styles/Username.module.css';

export default function Register() {

    const [file, setFile] = useState();

    const formik = useFormik({
        initialValues: {
            email: 'example@example.com',
            username: 'example123',
            password: 'admin123@123'
        },
        validate: registerUser,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || '' });
            console.log(values);
        }
    })


    /**file uploading handler */
    const onUpload = async event => {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64);
    }

    return (
        <div className='container mx-auto'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen'>
                <div className={styles.glass} style={{ width: "45%" }}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'> Register</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-5'>
                            Happy to join you...
                        </span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <label htmlFor="profile">
                                <img src={file || avatar} className={styles.profile_img} alt='avatar' />
                            </label>

                            <input onChange={onUpload} type='file' id='profile' />

                        </div>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <input {...formik.getFieldProps('email')} className={styles.textbox} type='text' placeholder='Email*' />
                            <input {...formik.getFieldProps('username')} className={styles.textbox} type='text' placeholder='Username*' />
                            <input {...formik.getFieldProps('password')} className={styles.textbox} type='password' placeholder='Password*' />
                            <button className='bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded' type='submit'>Register</button>
                        </div>

                        <div className='text-center py-4'>
                            <span className='text-gray-500'>Already a Member? <Link className='text-red-500' to='/'>Login in Now</Link></span>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
