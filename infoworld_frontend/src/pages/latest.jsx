import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import aiImage from "../assets/artificial-intelligence.jpg";
import climage from "../assets/cloud-computing.webp";
import csimage from "../assets/cybersecurity.avif";

// Example author avatars URLs
const authorAvatars = {
  "Jane Doe": "https://i.pravatar.cc/40?u=janedoe",
  "John Smith": "https://i.pravatar.cc/40?u=johnsmith",
  "Alice Lee": "https://i.pravatar.cc/40?u=alicelee",
};

const featuredNews = [
  {
    id: 1,
    title: "AI Revolutionizes Tech Industry",
    summary:
      "Artificial Intelligence is transforming the way businesses operate and innovate.",
    image: aiImage,
    author: "Jane Doe",
    date: "2024-06-01",
    category: "Artificial Intelligence",
    content:
      "AI is not just a buzzword anymore. From automating mundane tasks to providing deep insights, AI is at the forefront of technological innovation. Companies are leveraging AI to gain a competitive edge and improve efficiency across various sectors.",
  },
  {
    id: 2,
    title: "Cloud Computing Trends in 2024",
    summary: "Cloud adoption continues to grow with new trends emerging in 2024.",
    image: climage,
    author: "John Smith",
    date: "2024-05-28",
    category: "Cloud Computing",
    content:
      "The cloud landscape is evolving rapidly. Hybrid and multi-cloud strategies are becoming mainstream, and organizations are focusing on security, scalability, and cost optimization. Serverless computing and edge cloud are also gaining traction.",
  },
  {
    id: 3,
    title: "Cybersecurity: What to Watch",
    summary: "Stay ahead with the latest in cybersecurity threats and solutions.",
    image: csimage,
    author: "Alice Lee",
    date: "2024-05-25",
    category: "Cybersecurity",
    content:
      "Cyber threats are more sophisticated than ever. Businesses must adopt a proactive approach to security, including zero-trust architectures, regular audits, and employee training. The rise of AI-driven attacks is a key concern for 2024.",
  },
];

const Latest = () => {
  const [news, setNews] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setNews(featuredNews);
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
        <div className="text-5xl font-extrabold text-center pb-[20px] pt-[20px] mb-20 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 animate-text-gradient">
          Latest Technology News & Articles
        </div>


        {news.length === 0 ? (
          <p className="text-center text-gray-500 animate-pulse">Loading news...</p>
        ) : (
          <div className="flex flex-col gap-20">
            {news.map((item) => (
              <article
                key={item.id}
                className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="md:w-1/3 h-56 md:h-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <header>
                    <h2
                      onClick={() => toggleExpand(item.id)}
                      className="text-3xl font-extrabold text-cyan-700 cursor-pointer hover:text-cyan-900 flex items-center gap-2 select-none"
                      title="Click to expand/collapse"
                    >
                      {item.title}
                      <svg
                        className={`w-6 h-6 text-cyan-500 transition-transform duration-300 ${expandedId === item.id ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </h2>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-cyan-700 text-sm">
                      <Author author={item.author} avatar={authorAvatars[item.author]} />
                      <SeparatorDot />
                      <DateTime date={item.date} />
                      <SeparatorDot />
                      <Category category={item.category} />
                    </div>
                  </header>

                  <p className="mt-6 font-semibold text-lg text-cyan-800">{item.summary}</p>

                  <div
                    className={`mt-5 text-cyan-800 leading-relaxed tracking-wide whitespace-pre-line transition-max-height duration-500 ease-in-out overflow-hidden ${expandedId === item.id ? "max-h-screen" : "max-h-0"
                      }`}
                  >
                    <p>{item.content}</p>
                  </div>

                  <button
                    className="mt-6 inline-flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-900 focus:outline-none select-none"
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={expandedId === item.id}
                  >
                    {expandedId === item.id ? "Show Less" : "Read More"}
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${expandedId === item.id ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

function Author({ author, avatar }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={avatar || "https://i.pravatar.cc/40"}
        alt={author}
        className="w-8 h-8 rounded-full object-cover border-2 border-cyan-500"
      />
      <span className="font-medium">{author}</span>
    </div>
  );
}

function SeparatorDot() {
  return <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full mx-2" />;
}

function DateTime({ date }) {
  return (
    <div className="flex items-center gap-1">
      <svg
        className="w-4 h-4 text-cyan-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />
      </svg>
      <time>{new Date(date).toLocaleDateString(undefined, { dateStyle: "medium" })}</time>
    </div>
  );
}

function Category({ category }) {
  return (
    <div className="flex items-center gap-1 italic text-cyan-700 font-semibold">
      <svg
        className="w-4 h-4 text-cyan-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
      </svg>
      <span>{category}</span>
    </div>
  );
}

export default Latest;
