
import { BsGithub } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { CiLink } from "react-icons/ci";
import Tilt from "react-parallax-tilt";
function ProjectCard({ name, about, image, edit, code, note, visit }) {
  return (
    <section className="text-gray-200 body-font  rounded-lg">
      <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <Tilt>
            <img
              className="object-cover object-center rounded"
              alt="project"
              src={image}
            />
          </Tilt>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center ">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            {name}
          </h1>
          <p className="mb-8 leading-relaxed lg:pr-28">{about}</p>
          {note && (
            <p className="mb-5 leading-relaxed lg:pr-28 text-red-700 text-sm font-medium">
              {note}{" "}
             
            </p>
          )}
          <div className="flex justify-center">
            {edit && (
              <a href={edit} target="_blank" rel="noreferrer">
                <button className="inline-flex text-white bg-cyan-700 border-0 py-2 px-5 focus:outline-none font-medium items-center justify-center gap-1 hover:bg-purple-500  rounded text-lg">
                  edit <BiLinkExternal />
                </button>
              </a>
            )}
            <a href={code} target="_blank" rel="noreferrer">
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-5 focus:outline-none font-medium items-center justify-center gap-1 hover:bg-gray-200 rounded text-lg">
                Code <BsGithub />
              </button>
            </a>
            <a href={visit} target="_blank" rel="noreferrer">
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-5 focus:outline-none font-medium items-center justify-center gap-1 hover:bg-gray-200 rounded text-lg">
                visit <CiLink />

              </button>
            </a>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectCard;
