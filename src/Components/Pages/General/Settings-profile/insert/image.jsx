import React, { useState } from 'react';


function image() {
    const [image, setimage] = useState("")
  return (
    <div>

        <div className="profile_img Text-center P-4">
         <div className='flex flex-column justify-content-center align-items-center'></div>
                <inputText 
                type="file"
                onChange={(e) => setimage(e.target.files[0])}
                accept='/Image/*'
                />
                <h3>change photo</h3>
        </div>
    </div>
  )
}

export default image