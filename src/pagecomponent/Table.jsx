import axios from 'axios';
import React ,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom';

function Table() {
    const [course, setcourse]=useState([]);
    const getdata = () => {
      try {
        axios
          .get("https://hubmainback.hubit.com.np/courses")
          .then((res) => {
            console.log(res);
            setcourse([...res.data.data])
          })
          .catch((error)=>{
              console.log(error);
          })
  
      } catch (error) {
        console.log(error);
      }
    };
  
    
  
   useEffect(()=>{
    getdata()
   },[]
   )
  return (
    <table className='w-full h-full '>
<thead className='bg-blue-900 gap-0 text-center text-white'>
  <tr >
    <th className='py-3  px-3  '>S.NO</th>
    <th className='py-3  px-3  bg-yellow-600'>Title</th>
    <th className='py-3 px-3  '>Duration</th>
    <th className='py-3 px-3   bg-yellow-600 '>Instructor</th>
    <th className='py-3 px-3 '>Course Category</th>
    <th className='py-3 px-3  bg-yellow-600 '>Actions</th>
  </tr>

</thead>

<tbody>
  {
    course.map((val,i)=>{
      return(
        <tr className={`${(i%2)!==0?'bg-gray-200':''}`}>
          <td className='px-3 py-3 border-2  border-gray-500 hover:bg-blue-300 '>{i+1}</td>
          <td className=' py-3 px-5 text-center border-2 border-gray-500 hover:bg-yellow-100 '>
            <Link to={`/Course/${val.id}`}>
            {val?.title}
            
            </Link>
            
            </td>
          <td className='px-3 text-center py-3 border-2  border-gray-500 hover:bg-blue-300 '>{val?.duration}</td>
          <td className='px-3 py-3 text-center border-2  border-gray-500  hover:bg-yellow-100  '>
            <ol type="1">
              {val.instructor.map((item,ind)=>{
                return(
                  <li>{item.name}</li>
                )
              })}
            </ol>
          </td>

          <td    className='px-3 py-3 text-center border-2  border-gray-600  hover:bg-blue-300'>{val?.category.name}</td>
          <td className='px-3 py-3 border-2  border-gray-500 '>
            <div className='flex gap-4 justify-center '>
            <button className='text-white capitalize bg-green-600 px-6 py-2 rounded-full text-sm'>edit</button>
            <button className='text-white capitalize bg-red-700 px-6 py-2 rounded-full text-sm'>delete</button>
            </div>
          </td>
          </tr>
      )
    })
  }
</tbody>
</table>
    
    
  )
}


export default Table