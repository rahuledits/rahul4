
import { Button } from "@/components/ui/button";
import { Check, Pencil, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
}

function CreativePricing({
    tag = "Simple Pricing",
    title = "Make Short Videos That Pop",
    description = "Edit, enhance, and go viral in minutes",
    tiers,
}: {
    tag?: string;
    title?: string;
    description?: string;
    tiers: PricingTier[];
}) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <motion.div 
                className="text-center space-y-6 mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="text-xl text-blue-400 font-medium">
                    {tag}
                </div>
                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        {title}
                    </h2>
                </div>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    {description}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tiers.map((tier, index) => (
                    <motion.div
                        key={tier.name}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                        <CardSpotlight
                            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 relative"
                            color="#8b5cf6"
                            radius={200}
                        >
                            {/* Remove extra scaling/highlighting for 'Professional' popular tier on home page */}
                            {tier.popular && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-3 py-1 rounded-full text-sm z-10">
                                    Popular!
                                </div>
                            )}

                            <div className="mb-6 relative z-10">
                                <div className="text-orange-400 mb-4">
                                    {tier.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {tier.name}
                                </h3>
                                <p className="text-gray-300">
                                    {tier.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mb-6 relative z-10">
                                <span className="text-4xl font-bold text-white">
                                    ${tier.price}
                                </span>
                                <span className="text-gray-400">
                                    /month
                                </span>
                            </div>

                            <div className="space-y-3 mb-6 relative z-10">
                                {tier.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-orange-400" />
                                        </div>
                                        <span className="text-white">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/services">
                                                            <Button
                                className={cn(
                                    "w-full h-12 font-semibold text-lg relative z-10",
                                    "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600",
                                    "text-white border-0 transition-all duration-300",
                                    "hover:scale-105 shadow-lg"
                                )}
                            >
                                Request Quote
                            </Button>
                            </Link>
                        </CardSpotlight>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export { CreativePricing, type PricingTier };
