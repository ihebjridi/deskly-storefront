import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Deskly - Premium Tech Store",
  description: "Learn about Deskly's mission to provide cutting-edge technology solutions and exceptional customer experiences.",
}

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
              About Deskly
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about bringing the latest technology innovations to our customers, 
              making cutting-edge electronics accessible to everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Mission Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-primary-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Deskly, we believe that technology should enhance your life, not complicate it. 
            Our mission is to curate and deliver the most innovative, reliable, and user-friendly 
            tech products that empower individuals and businesses to achieve more.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Innovation */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-tech-blue/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Innovation First</h3>
            <p className="text-gray-600">
              We stay ahead of the curve, constantly exploring emerging technologies to bring you the latest innovations.
            </p>
          </div>

          {/* Quality */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-tech-blue/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Quality Assured</h3>
            <p className="text-gray-600">
              Every product we offer undergoes rigorous testing to ensure it meets our high standards of quality and reliability.
            </p>
          </div>

          {/* Customer Focus */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-tech-blue/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Customer Centric</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We provide exceptional support and personalized solutions for every need.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-primary-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2020, Deskly began as a small team of tech enthusiasts who were frustrated 
                with the overwhelming complexity of choosing the right technology products.
              </p>
              <p>
                We realized that the tech market was flooded with options, but finding reliable, 
                user-friendly products that actually delivered on their promises was incredibly difficult.
              </p>
              <p>
                That's why we created Deskly - a curated marketplace where every product has been 
                personally tested and verified by our team of experts.
              </p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Company Image Placeholder</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        {/* <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-primary-900 mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Our diverse team of tech experts, designers, and customer service professionals 
            work together to bring you the best possible experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> */}
            {/* Team Member 1 */}
            {/* <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">JD</span>
              </div>
              <h3 className="font-semibold text-primary-900 mb-1">John Doe</h3>
              <p className="text-sm text-gray-600">CEO & Founder</p>
            </div> */}

            {/* Team Member 2 */}
            {/* <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">JS</span>
              </div>
              <h3 className="font-semibold text-primary-900 mb-1">Jane Smith</h3>
              <p className="text-sm text-gray-600">CTO</p>
            </div> */}

            {/* Team Member 3 */}
            {/* <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">MJ</span>
              </div>
              <h3 className="font-semibold text-primary-900 mb-1">Mike Johnson</h3>
              <p className="text-sm text-gray-600">Head of Product</p>
            </div> */}

            {/* Team Member 4 */}
            {/* <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">SW</span>
              </div>
              <h3 className="font-semibold text-primary-900 mb-1">Sarah Wilson</h3>
              <p className="text-sm text-gray-600">Customer Success</p>
            </div>
          </div>
        </div> */}

          {/* Stats Section */}
             <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-tech-blue mb-2">50,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-tech-blue mb-2">1,000+</div>
              <div className="text-gray-600">Products Curated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-tech-blue mb-2">99%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-tech-blue mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
