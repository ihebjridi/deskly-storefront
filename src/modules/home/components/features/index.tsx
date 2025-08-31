import { Truck, Shield, Zap, HeadphonesIcon } from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Tech Delivery",
      description: "Free shipping on all electronics over $100. Express delivery for urgent tech needs."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Tech Warranty",
      description: "Comprehensive warranty on all devices. Extended protection plans available for premium gadgets."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Latest Innovation",
      description: "Access to cutting-edge technology and latest gadget releases before anyone else."
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "Expert Tech Support",
      description: "Dedicated tech support team available 24/7. Get help with setup, troubleshooting, and optimization."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
            Why Choose Deskly?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of technology with our cutting-edge devices and expert support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-tech-blue rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-gray-800 transition-all duration-300">
                <div className="text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
