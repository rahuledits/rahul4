import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface ServiceCardProps {
  service: any;
  index: number;
  isDarkMode: boolean;
}
const ServiceCard = ({
  service,
  index,
  isDarkMode
}: ServiceCardProps) => {
  const IconComponent = service.icon;
  return (
    <div className="group animate-fade-in relative w-full max-w-xs mx-auto my-4" style={{ animationDelay: `${index * 0.3}s` }}>
      {/* Holographic Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <Card className={`relative flex flex-col h-full overflow-hidden rounded-3xl border-2 group-hover:scale-[1.02] group-hover:shadow-2xl transition-all duration-700 ${isDarkMode ? 'bg-gray-900/40 border-gray-700/50' : 'bg-white/60 border-gray-200/50'} backdrop-blur-xl`}>
        {/* Icon and Title */}
        <div className="flex items-center gap-4 p-4">
          <span className={`rounded-xl p-3 bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center`}>
            <IconComponent className="w-7 h-7" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 text-gray-900 dark:text-white">{service.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">{service.description}</p>
          </div>
        </div>
        {/* Features */}
        <ul className="flex flex-wrap gap-2 px-4 pb-2">
          {service.features && service.features.map((feature: string, i: number) => (
            <li key={i} className="bg-gray-200 dark:bg-gray-800 text-xs px-3 py-1 rounded-full text-gray-700 dark:text-gray-200 font-medium mb-1">{feature}</li>
          ))}
        </ul>
        {/* CTA Button */}
        <div className="flex-1 flex items-end justify-end p-4">
          <Button className="w-full py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white flex items-center justify-center gap-2">
            Learn More <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default ServiceCard;