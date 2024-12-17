import React, { useState } from 'react'
import './BlogCard.css'
import { Modal } from 'react-bootstrap'


function BlogCard({ post, title }) {
    const [blogModalShow, setBlogModalShow] = useState(false);


    return (
        <div className="blog-card mb-3">
            <h5 style={{ fontSize: '15px', fontWeight: '600' }}>{post.title}</h5>
            {/* <p>{post.imageUrl}</p> */}
            {post.imageUrl ? <img className='rounded-4 mb-2' src={post.imageUrl} width={'100%'} alt='' /> : <p>Image</p>}
            <p style={{
                fontSize: "13px",
            }}>{post.preview}</p>

            <button className="read-more" onClick={() => setBlogModalShow(true)}>
                Read More
            </button>
            <Modal fullscreen={true} show={blogModalShow} onHide={() => setBlogModalShow(false)} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="container d-none d-md-block" style={{padding: '20px 200px'}}> 
                        <Modal.Title>{post.title}</Modal.Title>
                        <br />

                        <div style={{ fontFamily: 'Poppins' }} dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </div>
                    <div className="container d-block d-md-none" style={{padding: '20px 10px'}}> 
                        <Modal.Title>{post.title}</Modal.Title>
                        <br />

                        <div style={{ fontFamily: 'Poppins' }} dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </div>


                </Modal.Body>
            </Modal>
        </div>
    )
}

export default BlogCard