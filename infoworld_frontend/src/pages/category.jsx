import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const allNews = [
  {
    id: 1,
    title: "AI Revolutionizes Tech Industry",
    summary:
      "Artificial Intelligence is transforming the way businesses operate and innovate.",
    category: "technology",
    content:
      "AI is not just a buzzword anymore. From automating mundane tasks to providing deep insights, AI is at the forefront of technological innovation. Companies are leveraging AI to gain a competitive edge and improve efficiency across various sectors.",
  },
  {
    id: 2,
    title: "Wellness Tips for a Healthy Life",
    summary: "Stay fit with daily wellness tips and routines.",
    category: "health",
    content: "Wellness is key to longevity and a happy life.",
  },
  {
    id: 3,
    title: "Ultimate Sports Events to Watch in 2024",
    summary: "Stay up-to-date with the biggest sports events this year.",
    category: "sports",
    content:
      "From thrilling football matches to intense basketball tournaments, discover the top sports events happening worldwide.",
  },
  {
    id: 4,
    title: "Understanding Political Trends in 2024",
    summary:
      "Insightful analysis of the latest political developments and their impact.",
    category: "politics",
    content:
      "Explore key political changes, election updates, and policy shifts shaping the global landscape this year.",
  },
  {
    id: 5,
    title: "Online Learning Trends",
    summary: "Education adapts with new online tools and platforms.",
    category: "education",
    content:
      "Education is evolving with e-learning, breaking geographical and societal barriers with technology.",
  },
  {
    id: 6,
    title: "Entertainment Industry Updates",
    summary: "Stay tuned for the latest movies, TV shows, and events.",
    category: "entertainment",
    content:
      "Entertainment continues to adapt with streaming platforms and diverse fan cultures worldwide.",
  },
  {
    id: 7,
    title: "Renewable Energy Advances",
    summary: "New innovations are pushing renewable energy forward.",
    category: "technology",
    content:
      "Breakthroughs in solar and wind technologies are making renewable energy more affordable and efficient, accelerating global adoption.",
  },
  {
    id: 8,
    title: "Mental Health Awareness",
    summary: "Recognizing the importance of mental well-being.",
    category: "health",
    content:
      "Campaigns worldwide emphasize understanding and supporting mental health to improve quality of life for all.",
  },
  {
    id: 9,
    title: "Olympics 2024 Highlights",
    summary: "A look at top performances in the 2024 Olympics.",
    category: "sports",
    content:
      "Spectacular achievements and inspiring stories marked the games, showcasing global athletic excellence.",
  },
  {
    id: 10,
    title: "Global Political Shifts",
    summary: "How recent elections are changing the world map.",
    category: "politics",
    content:
      "Major political events are redefining alliances and policies in key regions, impacting international relations.",
  },
  {
    id: 11,
    title: "Future of Education",
    summary: "How technology is shaping classrooms of tomorrow.",
    category: "education",
    content:
      "Virtual and augmented reality are becoming standard tools, enriching the learning experience inside and outside classrooms.",
  },
  {
    id: 12,
    title: "Film Industry Innovations",
    summary: "The latest trends revolutionizing filmmaking.",
    category: "entertainment",
    content:
      "New storytelling techniques, streaming services, and immersive experiences are transforming how audiences enjoy films.",
  },
];


// Group news by category helper
function groupNewsByCategory(newsArray) {
    return newsArray.reduce((groups, newsItem) => {
        const category = newsItem.category;
        if (!groups[category]) groups[category] = [];
        groups[category].push(newsItem);
        return groups;
    }, {});
}

const Category = () => {
    const { categoryName } = useParams();
    const [expandedId, setExpandedId] = useState(null);

    const currentCategory = categoryName ? categoryName.toLowerCase() : null;

    const validCategories = [
        "technology",
        "health",
        "sports",
        "politics",
        "education",
        "entertainment",
    ];

    const isValidCategory =
        !currentCategory || validCategories.includes(currentCategory);

    const filteredNews = currentCategory
        ? allNews.filter((item) => item.category === currentCategory)
        : [];

    const groupedNews = !currentCategory ? groupNewsByCategory(allNews) : null;

    const pageTitle = currentCategory
        ? `Category News: ${capitalize(currentCategory)}`
        : "All Categories News";

    const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

    if (!isValidCategory) {
        return (
            <>
                <Navbar />
                <main className="max-w-5xl mx-auto p-8 text-center text-red-600 text-xl">
                    <h2>Category "{categoryName}" not found.</h2>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-5xl font-extrabold text-center pb-12 pt-12 mb-16 text-cyan-700 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-white-600 to-cyan-600 animate-text-gradient">
                    {pageTitle}
                </div>


                {/* If a specific category is selected */}
                {currentCategory ? (
                    filteredNews.length === 0 ? (
                        <p className="text-center text-gray-600 animate-pulse text-lg">
                            No news available in this category.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-10">
                            {filteredNews.map((item) => (
                                <NewsCard
                                    key={item.id}
                                    news={item}
                                    expandedId={expandedId}
                                    toggleExpand={toggleExpand}
                                />
                            ))}
                        </div>
                    )
                ) : (
                    // Show grouped view for all categories
                    Object.entries(groupedNews).map(([category, newsItems]) => (
                        <section key={category} className="mb-20">
                            <h2 className="text-3xl font-bold text-cyan-700 mb-8 capitalize border-b-4 border-cyan-500 inline-block pb-2 tracking-wide">
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {newsItems.map((item) => (
                                    <NewsCard
                                        key={item.id}
                                        news={item}
                                        expandedId={expandedId}
                                        toggleExpand={toggleExpand}
                                    />
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </main>

            <Footer />
        </>
    );
};

function NewsCard({ news, expandedId, toggleExpand }) {
    const isExpanded = expandedId === news.id;

    return (
        <article
            tabIndex={0}
            aria-label={`News card: ${news.title}`}
            className="bg-white rounded-3xl shadow-lg p-8 border border-cyan-300 hover:shadow-cyan-400/40 transition-shadow duration-300 transform hover:scale-105 cursor-pointer flex flex-col"
        >
            <h3
                className="text-3xl font-extrabold text-cyan-700 cursor-pointer select-none flex justify-between items-center"
                onClick={() => toggleExpand(news.id)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleExpand(news.id);
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-controls={`news-content-${news.id}`}
                title="Click to expand"
            >
                {news.title}
                <svg
                    className={`w-6 h-6 text-cyan-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </h3>

            <p className="font-semibold text-gray-700 mt-6 mb-4">{news.summary}</p>

            <div
                id={`news-content-${news.id}`}
                className={`text-gray-700 leading-relaxed whitespace-pre-line overflow-hidden transition-max-height duration-500 ease-in-out ${isExpanded ? "max-h-screen" : "max-h-0"
                    }`}
            >
                <p>{news.content}</p>
            </div>

            <button
                className="mt-auto self-start mt-6 font-semibold text-cyan-600 hover:text-cyan-900 focus:outline-none flex items-center gap-2"
                onClick={() => toggleExpand(news.id)}
                aria-expanded={isExpanded}
                aria-controls={`news-content-${news.id}`}
            >
                {isExpanded ? "Show Less" : "Read More"}
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </article>
    );
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Category;
