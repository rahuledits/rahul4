"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  backgroundImage?: string;
}
export function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  backgroundImage
}: DisplayCardProps) {
  return <div 
    className={cn("relative flex flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-4 sm:py-3 transition-all duration-700 w-full max-w-xs sm:w-[22rem] -skew-y-[8deg] select-none my-4 mx-auto shadow-lg after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2", className)}
    style={backgroundImage ? {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    } : undefined}
  >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-normal text-base sm:text-lg">{description}</p>
      <p className="text-muted-foreground text-sm sm:text-base">{date}</p>
    </div>;
}
interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}
export default function DisplayCards({
  cards
}: DisplayCardsProps) {
  const defaultCards = [{
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0"
  }, {
    className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0"
  }, {
    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10"
  }];
  const displayCards = cards || defaultCards;
  return <div className="flex flex-col sm:grid sm:[grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 px-0 rounded-3xl my-8 gap-6 w-full">
      {displayCards.map((cardProps, index) => <DisplayCard key={index} {...cardProps} />)}
    </div>;
}