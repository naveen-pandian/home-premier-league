import React from 'react';

function Contact(props) {
  return (
    <div id="contact" className="flex flex-col justify-center items-center ">
    <div className="text-center font-extrabold mt-20 my-10 md:text-4xl text-2xl loading-c  "></div>
    <div className=" bg-gray-950  rounded-2xl shadow-xl  w-full max-w-4xl p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Let's Talk</h1>
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-500 mb-2">Name:</label>
          <input type="text" id="name" name="name" className="bg-gray-500 shadow-black shadow-inner text-black px-4 py-2 rounded-md font-extrabold placeholder:text-black focus:outline-none focus:bg-[#00d2ff]" placeholder='Your Name' />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-500 mb-2">Email:</label>
          <input type="email" id="email" name="email" className="bg-gray-500 shadow-black shadow-inner text-black px-4 py-2 rounded-md font-extrabold placeholder:text-black focus:outline-none focus:bg-[#00d2ff]" placeholder='Your MailId' />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-500 mb-2">Phone:</label>
          <input type="tel" id="phone" name="phone" className="bg-gray-500 shadow-black shadow-inner text-black px-4 py-2 rounded-md font-extrabold placeholder:text-black focus:outline-none focus:bg-[#00d2ff]" placeholder='Your PhoneNumber' />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="message" className="text-gray-500 mb-2">Tell us about your project:</label>
          <textarea id="message" name="message" rows="5" className="bg-gray-500 shadow-black shadow-inner text-black px-4 py-2 rounded-md w-full font-extrabold placeholder:text-black focus:outline-none focus:bg-[#00d2ff]" placeholder='Chat with me... '></textarea>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center lg:gap-10 md:gap-7 gap-5 mt-8">
        
        <a className='text-gray-200 md:text-xl text-[15px] font-extrabold' ><ion-icon name="receipt-outline" ></ion-icon> &nbsp;{props.user?.contact?.location}
         </a> 
      
        
        <a className='text-gray-200 md:text-xl text-[15px] font-extrabold' href={`mailto:${props.user?.contact?.mailId}`}><ion-icon name="mail-unread-outline" ></ion-icon> &nbsp;{props.user?.contact?.mailId}
         </a>
        
      
        <a className='text-gray-200 md:text-xl text-[15px] font-extrabold' href={`tel:${props.user?.contact?.phoneNumber}`}><ion-icon name="call-outline" ></ion-icon> &nbsp;{props.user?.contact?.phoneNumber}
         </a>
                                          
         
        
        
      </div>
      <button className="bg-[#00d2ff] text-black font-extrabold px-4 py-2 rounded-2xl  shadow-black shadow-inner mt-4 hover:bg-yellow-500 hover:text-black ">Submit</button>
    </div>

          <div className="absolute bg-gray-950  text-center right-0 left-0 sm:left-[140px] translate-y-[600px]  ">
              <div className="">
                  <ul className="flex justify-center items-center gap-6 my-10">
                      {props.social?.map((item,index)=>(
                      <li key={index} >
                          <a href={`${item.url}`} target='_blank'>
                            <img className="h-14 animate-pulse" src={`${item.image}`} alt="footerImage"/>
                          </a>
                      </li>
                      ))}
                      
                  </ul>
              </div>
              <div className="text-white my-10">
                  <p>&copy; 2024 {props.user?.about?.name}. All Rights Reserved</p>
              </div>
          </div>
       </div>

  );
}

export default Contact;
