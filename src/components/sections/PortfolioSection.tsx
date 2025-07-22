import React from 'react';
import DisplayCards from "@/components/ui/display-cards";
import { Film, Edit, Camera, Video, Play } from 'lucide-react';

const homepagePortfolio = [
  {
    icon: <Film className="size-4 text-orange-300" />,
    title: "Classroom Documentary",
    description: "A documentary-style classroom project.",
    date: "Dec 2024",
    video: "/d.mp4",
    thumbnail: "/thumbnails/d.jpg",
    className: "[grid-area:stack] sm:hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Edit className="size-4 text-orange-300" />,
    title: "Bike Commercial",
    description: "A high-energy bike commercial.",
    date: "Nov 2024",
    video: "/b.mp4",
    thumbnail: "/thumbnails/b.jpg",
    className: "[grid-area:stack] sm:translate-x-12 sm:translate-y-8 sm:hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Video className="size-4 text-orange-300" />,
    title: "Midnight Dreams",
    description: "A psychological thriller short film.",
    date: "Sep 2024",
    video: "/car2.mp4",
    thumbnail: "/thumbnails/car2.jpg",
    className: "[grid-area:stack] sm:translate-x-24 sm:translate-y-16 sm:hover:translate-y-8",
  },
  {
    icon: <Play className="size-4 text-orange-300" />,
    title: "Talking Head Interview",
    description: "A professional talking head video.",
    date: "Aug 2024",
    video: "/car.mp4",
    thumbnail: "/thumbnails/car.jpg",
    className: "[grid-area:stack] sm:translate-x-36 sm:translate-y-24 sm:hover:translate-y-12",
  },
  {
    icon: <Camera className="size-4 text-orange-300" />,
    title: "Car Intro",
    description: "A cinematic car introduction.",
    date: "Oct 2024",
    video: "/car1.mp4",
    thumbnail: "/thumbnails/car1.jpg",
    className: "[grid-area:stack] sm:translate-x-48 sm:translate-y-32 sm:hover:translate-y-20",
  },
];


const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            My Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A curated collection of my best video editing and cinematography work, 
            showcasing diverse styles and creative approaches across various genres.
          </p>
        </div>
        <div className="flex justify-center mb-12 overflow-hidden">
          <div className="w-full max-w-5xl">
            <DisplayCards cards={homepagePortfolio} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
