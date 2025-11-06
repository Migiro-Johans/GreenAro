import { Target, Eye, Heart, Users, Award, TrendingUp } from 'lucide-react';

function About() {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Integrity",
      description: "We conduct our business with the highest ethical standards and transparency."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Customer Focus",
      description: "Our members are at the heart of everything we do. Their success is our success."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Innovation",
      description: "We embrace technology and innovation to provide better financial services."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description: "We strive for excellence in service delivery and member satisfaction."
    }
  ];

  const milestones = [
    { year: "2010", event: "Green Aro SACCO founded with 100 members" },
    { year: "2013", event: "Reached 1,000 members milestone" },
    { year: "2016", event: "Launched digital banking platform" },
    { year: "2019", event: "Opened 3 additional branch offices" },
    { year: "2022", event: "Achieved KES 500M in assets" },
    { year: "2025", event: "Serving 10,000+ happy members" }
  ];

  const team = [
    {
      name: "John Doe",
      position: "Chief Executive Officer",
      description: "20+ years in financial services"
    },
    {
      name: "Jane Smith",
      position: "Head of Operations",
      description: "Expert in SACCO management"
    },
    {
      name: "David Johnson",
      position: "Head of Credit",
      description: "15 years in credit management"
    },
    {
      name: "Sarah Williams",
      position: "Customer Relations Manager",
      description: "Dedicated to member satisfaction"
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Green Aro</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building financial futures together since 2010. We are more than a SACCO – 
            we are a community committed to your financial success.
          </p>
        </div>

        {/* Who We Are */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 mb-4">
              Green Aro SACCO is a member-owned financial cooperative dedicated to 
              providing accessible, affordable, and reliable financial services to our community. 
              Since our establishment in 2010, we have grown from a small group of 100 founding 
              members to a thriving cooperative serving over 10,000 members across Kenya.
            </p>
            <p className="text-lg text-gray-700">
              We offer a comprehensive range of financial products including competitive loan 
              facilities, attractive savings accounts, and investment opportunities. Our commitment 
              to excellence, innovation, and member satisfaction has made us one of the most 
              trusted SACCOs in the region.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To empower our members through innovative financial solutions, exceptional 
              service, and a commitment to building lasting relationships that foster economic 
              growth and financial security for all.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Eye className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be the leading member-focused financial cooperative in Kenya, recognized for 
              excellence in service delivery, innovation, and our unwavering commitment to 
              improving the financial well-being of our community.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide our decisions and define who we are as an organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center"
              >
                <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Journey/Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming a trusted financial partner for thousands.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-4">
                    <p className="text-lg text-gray-800">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals driving Green Aro's success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="bg-gradient-to-br from-primary to-secondary h-32"></div>
                <div className="p-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto -mt-16 mb-4 border-4 border-white flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.position}</p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-green-50 mb-6 max-w-2xl mx-auto">
            Become part of the Green Aro family and experience the difference of a 
            member-focused financial cooperative.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Started Today
          </a>
        </section>
      </div>
    </div>
  );
}

export default About;