const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=1",
      content: "Deskly has the latest tech at incredible prices! Their gaming laptop selection is unmatched, and the technical support team knows their stuff.",
      rating: 5
    },
    {
      name: "Maria Garcia", 
      role: "Tech Reviewer",
      image: "https://i.pravatar.cc/150?img=2",
      content: "As someone who reviews tech for a living, I can say Deskly offers authentic products with excellent warranties. Their smart home section is fantastic!",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Digital Creator", 
      image: "https://i.pravatar.cc/150?img=3",
      content: "From cameras to editing equipment, Deskly has everything I need for content creation. Fast delivery and competitive prices make them my go-to tech store.",
      rating: 5
    }
  ]

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-tech-blue' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
                              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="mb-6">
                <StarRating rating={testimonial.rating} />
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-primary-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-white rounded-full px-8 py-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-tech-blue">4.9</span>
              <StarRating rating={5} />
            </div>
            <div className="text-gray-400">|</div>
            <div className="text-gray-600">
              <span className="font-semibold text-tech-blue">50,000+</span> Happy Customers
            </div>
            <div className="text-gray-400">|</div>
            <div className="text-gray-600">
              <span className="font-semibold text-tech-blue">99%</span> Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
