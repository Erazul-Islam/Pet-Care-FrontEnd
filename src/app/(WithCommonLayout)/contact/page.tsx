/* eslint-disable prettier/prettier */



export default function BlogPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 ">
        <h1 className="text-5xl font-extrabold text-center text-teal-600 mb-6">
          Get in Touch
        </h1>
        <p className="text-lg mb-8 text-center text-gray-700 dark:text-gray-300">
          We’d love to hear from you! Fill out the form below for any inquiries
          or support.
        </p>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg w-full">
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                required
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                id="name"
                placeholder="Your Name"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                required
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                id="email"
                placeholder="Your Email"
                type="email"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                required
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                id="subject"
                placeholder="Subject"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                required
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                id="message"
                placeholder="Your Message"
              />
            </div>

            <button
              className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-500 transition duration-200"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
