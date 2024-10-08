import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  const handleRandomClick = () => {
    router.push("/randomJoke");
  };

  const handleSearchJokesClick = () => {
    router.push("/search");
  };

  return (
    <div
      className="h-screen text-white"
      style={{
        background:
          "linear-gradient(90deg, rgba(131, 126, 226, 1) 24%, rgba(114, 114, 226, 1) 58%, rgba(0, 212, 255, 1) 100%)",
      }}
    >
      <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <Image width="128" height="128" src="/dad.png" alt="dad-logo" />
        <div class="text-center lg:w-5/12 w-full">
          <div className="flex items-center justify-center">
            <h1 className="text-white my-5 mb-10 text-3xl font-bold leading-tight">
              Lack of Dad Jokes?
            </h1>
          </div>

          <div className="flex items-center justify-center mt-5 mb-10">
            <p className="text-white text-2xl mb-8 mr-5 font-bold">
              No Worries! I am here to help!
            </p>
          </div>
          <div className="flex justify-center mx-auto">
            <button
              onClick={handleRandomClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full py-4 px-8 mr-10 transition-transform duration-200 transform hover:-translate-y-1 shadow-lg"
            >
              Random Joke
            </button>
            <button
              onClick={handleSearchJokesClick}
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full py-4 px-8 transition-transform duration-200 transform hover:-translate-y-1 shadow-lg"
            >
              Search Jokes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
