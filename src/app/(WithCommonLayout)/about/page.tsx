/* eslint-disable prettier/prettier */
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col p-6">
      <h1 className="text-5xl font-extrabold text-center text-teal-600 mb-6">
        Welcome to Care Press!
      </h1>
      <p className="text-lg mb-8 text-center">
        We’re not just a pet care website; we’re a community of passionate pet
        lovers dedicated to enriching the lives of our furry friends and their
        owners.
      </p>

      <div className=" md:ml-40 mb-12">
        <h2 className="text-4xl text-center font-bold mb-2">Our Mission</h2>
        <div className="md:flex">
          <img src="https://i.ibb.co.com/ftd02nr/istockphoto-167154701-612x612.jpg" alt="" />
          <p className="md:mt-32 mt-12 text-lg max-w-3xl mx-auto">
            To provide a treasure trove of resources, support, <br /> and innovative
            solutions that empower <br /> pet owners to give their pets the love and care
            they deserve.
          </p>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Our Vision</h2>
        <div className="md:flex md:mr-40">
          <p className="md:mt-32 mt-12 text-lg max-w-3xl mx-auto">
            To be the leading online platform for pet care, <br /> inspiring every pet
            owner to make <br /> informed choices for their furry companions and foster a
            loving pet community.
          </p>
          <img className="mt-12 md:mt-0" src="https://i.ibb.co.com/6wB6H52/istockphoto-690772190-612x612.jpg" alt="" />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-center text-teal-600 mb-6">
        Meet Our Passionate Team
      </h2>
      <div className="grid md:ml-40 ml-0 mr-32  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white w-[450px] dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <img
            alt="Jane Doe"
            className="w-full h-96 object-cover rounded-t-lg mb-4"
            src="https://i.ibb.co.com/t2WzvdC/Fiverr.jpg"
          />
          <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-300">
            Erazul islam
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Founder & CEO</p>
          <p className="mt-2">
            Jane, a dedicated veterinary technician, combines her love for
            animals with her expertise to create a platform that offers
            invaluable insights and resources for pet owners.
          </p>
        </div>

        <div className="bg-white w-[450px] dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <img
            src="https://i.ibb.co.com/XjqZsWh/Taosif.jpgs"
            alt="John Smith"
            className="w-full h-96 object-cover rounded-t-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-300">
            John Smith
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Co-Founder & Community Manager
          </p>
          <p className="mt-2">
            John brings his background in community outreach to the table,
            creating a warm and inviting space for pet lovers to connect and
            support each other.
          </p>
        </div>

        <div className="bg-white w-[450px] md:mr-40 dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <img
            alt="Emily Johnson"
            className="w-full h-96 object-cover rounded-t-lg mb-4"
            src="https://i.ibb.co.com/q0m4Tzh/IMG-20231217-WA0011.jpg"
          />
          <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-300">
            Emily Johnson
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Content Strategist</p>
          <p className="mt-2">
            A passionate writer with a flair for storytelling, Emily crafts
            engaging content that educates and inspires pet owners to embrace
            their journey with their pets.
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-center text-4xl mt-14 mb-12">We</h1>
        <img alt="" src="https://i.ibb.co.com/4gzSTrg/Whats-App-Image-2024-09-30-at-16-13-14-00e74ead.jpg" />
      </div>
    </div>
  );
};

export default AboutUs;
