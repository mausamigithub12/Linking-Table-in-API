import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from "react-router-dom";

function Course() {
  const [Show, setShow] = useState('CourseInfo');
  const [course, setcourse] = useState([]);

  const params=useParams()
  const getdata = (id) => {
    try {
      axios
        .get(
          `https://hubmainback.hubit.com.np/courses/${id}`
        )
        .then((res) => {
          console.log(res);
          setcourse([res.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(params&&params.id){
      getdata(params.id);
    }
  }, [params]);

  return (
    <div className="bg-gray-200 w-full h-full overflow-scroll pb-10 ">
      {console.log(course)}
      <div className="grid grid-cols-2  w-full">
      <div
            onClick={() => {
              setShow("CourseInfo");
            }}
            className={` cursor-pointer  h-8 ${Show==='CourseInfo'?"text-black bg-white":""} text-center hover:text-red-500`}
          >
            Course Info
          </div>
          <div
            onClick={() => {
              setShow("Syllabus");
            }}
            className={` cursor-pointer  h-8 ${Show!=='CourseInfo'?"text-black bg-white":""} text-center hover:text-red-500`}

          >
            Syllabus
          </div>
      </div>
  {
    Show==='CourseInfo'?
    <div className="grid grid-cols-2 gap-7 ">
    <div className="flex flex-col ml-3">
   
      <div className="bg-white h-fit my-5 rounded-2xl ">
        {course?.map((val, i) => {
          let image = `https://hubmainback.hubit.com.np/public/${val.image}`;
          return (
            <div className=" my-12 ">
              <img
                src={image}
                alt="/"
                className="h-44 object-cover w-72 rounded-2xl ml-12"
              />
              <div className=" grid grid-cols-2">
                <div className=" mx-14 my-5 text-xl">
                  <div className=" pt-4 ">Course Title</div>

                  <div className=" line-clamp-3 text-base font-semibold uppercase py-2">
                    {val.title}
                  </div>
                  <div className=" pt-4 ">Instructor</div>
                  <div className="  font-bold text-center mr-3  ">
                    <div className=" w-fit text-center  h-fit rounded-2xl grid gap-3 text-xs  py-1">
                        {val.instructor.map((item, ind) => {
                          return <div className="bg-blue-200 py-3 text-center px-5  rounded-2xl">{item.name}</div>;
                        })}
                    </div>
                  </div>
                  <div className=" pt-5">Reviews</div>
                  <div className=" font-semibold">0</div>
                </div>

                <div className=" my-5">
                  <div className=" text-xl pt-4">Course Duration</div>
                  <div className=" text-base font-semibold py-2 uppercase">
                    {" "}
                    {val.duration}
                  </div>

                  <div className="pt-4 text-lg">Students</div>
                  <div className=" font-semibold">0</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <div className="flex flex-col mr-3">
   
      <div className="bg-white my-5 h-full  rounded-2xl">
        <div className="font-semibold text-center text-2xl pt-7  capitalize  ">About this field</div>
        {course.map((val, i) => {
          return (
            <div>
              {val.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: val.description }}
                  className="line-clamp-5 text-base px-2 py-1 font-normal   "
                />
              ) : (
                <div className="line-clamp-3 text-sm py-1  font-normal px-2">
                  is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard
                  dummy text ever since the 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s
                  with the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>:<div className="w-10/12 mx-auto grid gap-6 mt-5  ">
    {
      course.map((val,i)=>{
        return val.syllabus.map((item,ind)=>{
          return(
            <Accordion key={i} >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              
            >
              <Typography className="font-semibold hover:text-red-800 ">{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              <div dangerouslySetInnerHTML={{__html:item.description}}   />
              </Typography>
            </AccordionDetails>
          </Accordion>
    
          )
        })
      })
    }
  </div>
  }
    </div>
  );
}

export default Course;
