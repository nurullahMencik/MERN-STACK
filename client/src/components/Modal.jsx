import React, { useState, useRef, useEffect } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../redux/reducers/modalSlice';
import { createCourse, updateCourse } from '../redux/reducers/courseSlice';

const Modal = ({ editCourse = null }) => {
    const categories = ["Frontend", "Backend", "Full Stack", "Mobil Geliştirme", "Veri Bilimi"];
    const { auth } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const [postData, setPostData] = useState({
        user: auth.user.username || '',
        price: "",
        title: "",
        file: null,
        description: "",
        category: "",
        image: null,
    });

    useEffect(() => {
        if (editCourse) {
            setPostData({
                user: editCourse.user || auth.user.username,
                title: editCourse.title || "",
                description: editCourse.description || "",
                price: editCourse.price || "",
                category: editCourse.category || "",
                file: null,
                image: null,
            });
        } else {
            setPostData(prev => ({ ...prev, user: auth.user.username }));
        }
    }, [editCourse, auth]);

    const onChangefunc = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setPostData({ ...postData, file: e.target.files[0] });
    };

    const handleImageChange = (e) => {
        setPostData({ ...postData, image: e.target.files[0] });
    };

    const handleClose = () => {
        dispatch(setModal(false));
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', postData.title);
            formData.append('description', postData.description);
            formData.append('price', postData.price);
            formData.append('category', postData.category);
            formData.append('user', postData.user);
            if (postData.file) formData.append('file', postData.file);
            if (postData.image) formData.append('image', postData.image);

            if (editCourse) {
                await dispatch(updateCourse({ courseId: editCourse._id, updatedData: formData })).unwrap();
            } else {
                await dispatch(createCourse(formData)).unwrap();
            }

            dispatch(setModal(false));
        } catch (error) {
            console.error("Kurs işleminde hata:", error);
        }
    };

    return (
        <div className='w-full h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-50 flex items-center justify-center px-2'>
            <div className='bg-white w-full max-w-md md:w-1/3 rounded-md p-4'>
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='font-bold text-xl md:text-2xl'>Kurs {editCourse ? "Güncelle" : "Paylaş"}</h1>
                    <IoMdCloseCircleOutline
                        onClick={handleClose}
                        size={24}
                        className="cursor-pointer hover:text-red-500"
                    />
                </div>

                <div className='space-y-3'>
                    <input
                        value={postData.user}
                        name='user'
                        readOnly
                        onChange={onChangefunc}
                        className='w-full border p-2 rounded-md text-sm'
                        type="text"
                        placeholder='User'
                    />
                    <input
                        value={postData.title}
                        name='title'
                        onChange={onChangefunc}
                        className='w-full border p-2 rounded-md text-sm'
                        type="text"
                        placeholder='Title'
                    />
                    <input
                        value={postData.description}
                        name='description'
                        onChange={onChangefunc}
                        className='w-full border p-2 rounded-md text-sm'
                        type="text"
                        placeholder='Description'
                    />
                    <input
                        value={postData.price}
                        name='price'
                        onChange={onChangefunc}
                        className='w-full border p-2 rounded-md text-sm'
                        type="number"
                        placeholder='Price'
                    />
                    <select
                        name='category'
                        value={postData.category}
                        onChange={onChangefunc}
                        className='w-full border p-2 rounded-md text-sm'
                    >
                        <option value="">Kategori Seçin</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <div className='flex flex-col text-sm'>
                        <label className='mb-1'>Dosya Yükle:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className='border p-2 rounded-md'
                        />
                        {postData.file && (
                            <p className='mt-1 text-gray-600'>Seçilen dosya: {postData.file.name}</p>
                        )}
                        <label className='mt-4 mb-1'>Fotoğraf Yükle:</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className='border p-2 rounded-md'
                        />
                        {postData.image && (
                            <p className='mt-1 text-gray-600'>Seçilen fotoğraf: {postData.image.name}</p>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className='w-full mt-5 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800'
                >
                    {editCourse ? "Güncelle" : "Oluştur"}
                </button>
            </div>
        </div>
    );
};

export default Modal;
