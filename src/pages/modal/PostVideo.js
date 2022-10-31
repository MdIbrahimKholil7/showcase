import axios from 'axios';
import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import { useCookies } from 'react-cookie';

const S3_BUCKET = 'showcase28';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIAQFXX4ZU3AHYZQUFH';
const SECRET_ACCESS_KEY = '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';


const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const PostVideo = ({ openModal, setOpenModal,userId }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [video, setVideo] = useState('')
    const [formData, setFormData] = useState({
        email:'',
        description:'',
        price:'',
        category:'',
        productType:'',
        productBrand:'',
        companyName:'',
        link:'',
        userId

    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        videError:''
    })

    const videoHandler = (event) => {
        setLoading(true)
        /* if (event.target.files && event.target.files[0]) {
            setVideo(URL.createObjectURL(event.target.files[0]));
        }
 */
        window.Buffer = window.Buffer || require("buffer").Buffer;
        uploadFile(event.target.files[0], config)
            .then(data => {
                setLoading(false)
                // setFormData({...formData,link:data?.location,userId})
                return setVideo(data?.location)

            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            }
            )

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)

        if (cookies?.token) {

        if(!video){
            return setError({...error,videError:'Please select a video'})
        }
        
        setError({...formData,videError:''})
            fetch(`http://localhost:5000/admin/products`, {
                method: "POST",
                headers: {
                    'Authorization': cookies?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: formData,
                    video,
                    userId
                })
            })
                .then(res => res.json())
                .then(data => console.log(data))

        }
    }
    console.log(formData)
    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-[800px]">
                    <h5 className='text-center my-10 text-2xl font-bold'>Post Your Video</h5>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className='text-center mb-8 '>
                                <input
                                    onChange={videoHandler}
                                    className='hidden'
                                    type="file"
                                    id="video"
                                    disabled={loading ? true : false}
                                    
                                />
                                <label
                                    className='btn bg-[#858A89] rounded-full px-9 py-2 capitalize text-white' htmlFor="video">
                                    {loading ? 'Uploading Video' : 'Choose Video'}
                                </label>
                            </div >
                            {
                                video && <div className='flex justify-center mb-7'>
                                    <video
                                        className=''
                                        src={video}
                                        autoPlay={true}
                                        muted={true}
                                        width='220px'
                                        height={'140px'}
                                        loop={true}
                                    ></video>
                                </div>
                            }
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Company Name</span>
                                </label>
                                <input
                                    value={formData.companyName}
                                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                    type="text"
                                    className="input input-bordered"
                                    required
                                    autoComplete='off'
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    type="email"
                                    className="input input-bordered"
                                    required
                                    autoComplete='off'
                                />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Brand(with Model)</span>
                                </label>
                                <input
                                    value={formData.productBrand}
                                    onChange={e => setFormData({ ...formData, productBrand: e.target.value })}
                                    type="text"
                                    className="input input-bordered"
                                    autoComplete='off'
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Type</span>
                                </label>
                                <select
                                    required
                                    value={formData.productType}
                                    onChange={e => setFormData({ ...formData, productType: e.target.value })}
                                    className="select select-bordered w-full " >
                                    <option value="">Select a product type</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                    <option value="Home&Kitchen">Home&Kitchen</option>
                                </select>
                               
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value || null })}
                                    className="select select-bordered w-full " >
                                    <option value="">Select a category</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Whoose">Whoose</option>
                                    <option value="Watch">Watch</option>
                                    <option value="Casual Shirt">Casual Shirt</option>
                                    <option value="Cutton Pants">Cutton Pants</option>
                                    <option value="Jeans Shirt">Jeans Shirt</option>
                                    <option value="Kurtas">Kurtas</option>
                                    <option value="Jeans Top">Jeans Top</option>
                                    <option value="Kurti">Kurti</option>
                                    <option value="Knife">Knife</option>
                                    <option value="Faurniture">Faurniture</option>
                                    <option value="Bed Sheet">Bed Sheet</option>
                                    <option value="Blancket">Blancket</option>
                                </select>
                               
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product price</span>
                                </label>
                                <input
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    type="number"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="textarea textarea-bordered"
                                    required
                                >
                                </textarea>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Post</button>
                            </div>
                            {
                                error?.videError && <p className='text-red-500 py-3 text-[14px]'>{error?.videError}</p>
                            }
                        </form>
                    </div>

                    <div className="modal-action ">
                        <label onClick={() => setOpenModal(null)} htmlFor="my-modal-6 " className="btn bg-red-500 text-white">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PostVideo;