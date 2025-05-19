import React from "react";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-slate-950 via-green-950 to-blue-950 flex pt-32 p-4 gap-4 justify-center lg:items-start flex-wrap">
        <div className="flex flex-col gap-4 w-full lg:w-auto">
          <div
            id="vision"
            className="bg-white/10 backdrop-blur-xl rounded-md flex flex-col p-4"
          >
            <div className="font-light text-2xl text-white">Why Portolio?</div>
            <div className="text-white mt-4 font-light max-w-xl">
              This project was built to primarily test ImageKit, which is an
              online media storage platform. The main goal was to be able to
              upload and retrieve images from ImageKit, and display them.
            </div>
            <div className="text-white mt-4 font-light max-w-md">
              Once the core objectives were fulfilled, I worked on the UI, and
              also added more features like the ability to make images 'public'.
              The list of features is endless. I might work on adding some more
              features in the future.
            </div>
          </div>
          <div
            id="features"
            className="bg-white/10 backdrop-blur-xl rounded-md flex flex-col p-4"
          >
            <div className="font-light text-2xl text-white">Key Features</div>
            <div className="text-white mt-4 font-light max-w-xl">
              <div>1. Securely signup or signin.</div>
              <div>
                2. Upload images, add captions, and choose which images to make
                'public'.
              </div>
              <div>3. View 'all' and 'your' images.</div>
              <div>4. Delete your images in case you don't like them.</div>
            </div>
          </div>
          <div
            id="dev"
            className="bg-white/10 backdrop-blur-xl rounded-md flex flex-col p-4"
          >
            <div className="font-light text-2xl text-white">
              About the Dev - Yash Barve
            </div>
            <div className="text-white mt-4 font-light max-w-xl">
              <div>
                - 4th year Computer Science student at University of Waterloo
              </div>
              <div>
                - 4th year Business student at Wilfrid Laurier University
              </div>
              <div>- 3 years of software development experience.</div>
              <div>
                - 1 year work experience as a full-stack software developer.
              </div>
              <div>
                - Checkout Yash's{" "}
                <a
                  className="font-semibold italic hover:text-green-400"
                  href="https://yashbarve.vercel.app"
                >
                  webpage.
                </a>
              </div>
            </div>
          </div>
          <div
            id="dev"
            className="bg-white/10 backdrop-blur-xl rounded-md flex flex-col p-4"
          >
            <div className="font-light text-2xl text-white">
              Connect with Yash
            </div>
            <div className="text-white mt-4 font-light max-w-xl">
              <div>
                - Email:{" "}
                <a
                  href="mailto:yhbarve@uwaterloo.ca"
                  className="font-semibold italic hover:text-green-400"
                >
                  yhbarve@uwaterloo.ca
                </a>
              </div>
              <div>
                - Instagram:{" "}
                <a
                  href="https://www.instagram.com/yhbarve/"
                  className="font-semibold italic hover:text-green-400"
                >
                  @yhbarve
                </a>
              </div>
              <div>
                - Twitter:{" "}
                <a
                  href="https://x.com/yhbarve"
                  className="font-semibold italic hover:text-green-400"
                >
                  @yhbarve
                </a>
              </div>
              <div>
                - Github:{" "}
                <a
                  href="https://github.com/yhbarve"
                  className="font-semibold italic hover:text-green-400"
                >
                  @yhbarve
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-auto">
          <div
            id="tech-stack"
            className="bg-white/10 backdrop-blur-xl rounded-md flex flex-col p-4"
          >
            <div className="font-light text-2xl text-white">Tech Stack</div>
            <div className="text-white mt-4 font-light max-w-xl">
              Frontend:
              <div className="pl-4">- React via Vite</div>
              <div className="pl-4">- React Router DOM</div>
              <div className="pl-4">- React Hook Form + Zod</div>
              <div className="pl-4">- Axios</div>
              <div className="pl-4">- TailwindCSS</div>
              <div className="pl-4">- ImageKitIO</div>
              <div className="pl-4">- Lucide React</div>
            </div>
            <div className="text-white mt-4 font-light max-w-xl">
              Backend:
              <div className="pl-4">- Node.js</div>
              <div className="pl-4">- Express</div>
              <div className="pl-4">- MongoDB Atlas via Mongoose</div>
              <div className="pl-4">- Zod</div>
              <div className="pl-4">- JWT based Authentication</div>
              <div className="pl-4">- Bcrypt</div>
              <div className="pl-4">- ImageKit SDK</div>
            </div>
          </div>

          <div
            id="future"
            className="bg-white/10 backdrop-blur-xl rounded-md flex flex-col p-4"
          >
            <div className="font-light text-2xl text-white">Future Scope</div>
            <div className="text-white mt-4 font-light max-w-xl">
              <div>1. 3rd party sign-in like Google, Github, etc.</div>
              <div>2. Likes and Comments on images.</div>
              <div>3. Edit image caption.</div>
              <div>4. Profile page for users.</div>
              <div className="italic mt-2 text-gray-400">
                If you'd like to contribute, please reach out.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
