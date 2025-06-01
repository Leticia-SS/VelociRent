import { Wrench, Building2, Calculator, GraduationCap, Users, Award, Clock } from "lucide-react"
import styles from "./internships-page.module.css"

const InternshipsPage = () => {
  const internshipTypes = [
    {
      id: 1,
      icon: <Wrench size={40} />,
      title: "Bike Mechanics",
      field: "Mechanical Engineering",
      description:
        "Get hands-on experience maintaining and repairing our fleet of bikes. Learn about sustainable transportation technology and develop practical engineering skills.",
      responsibilities: [
        "Assist with bike maintenance and repairs",
        "Help implement new bike features and improvements",
        "Participate in quality control processes",
        "Learn about sustainable transportation technology",
      ],
      requirements: [
        "Currently pursuing a degree in Mechanical Engineering",
        "Basic understanding of mechanics",
        "Problem-solving skills",
      ],
    },
    {
      id: 2,
      icon: <Building2 size={40} />,
      title: "Operations Management",
      field: "Business Administration",
      description:
        "Work with our operations team to optimize bike distribution, manage station logistics, and improve overall service efficiency.",
      responsibilities: [
        "Analyze station usage data",
        "Assist with bike redistribution planning",
        "Help optimize operational processes",
        "Contribute to service improvement initiatives",
      ],
      requirements: [
        "Currently pursuing a degree in Business Administration",
        "Strong analytical skills",
        "Interest in urban mobility",
      ],
    },
    {
      id: 3,
      icon: <Calculator size={40} />,
      title: "Financial Analysis",
      field: "Economics or Accounting",
      description:
        "Join our finance team to gain experience in financial planning, cost analysis, and business strategy for a growing mobility company.",
      responsibilities: [
        "Assist with financial reporting and analysis",
        "Help develop pricing strategies",
        "Participate in budget planning",
        "Analyze operational costs and efficiency",
      ],
      requirements: [
        "Currently pursuing a degree in Economics or Accounting",
        "Strong numerical skills",
        "Attention to detail",
      ],
    },
  ]

  const benefits = [
    {
      icon: <GraduationCap size={32} />,
      title: "Academic Credit",
      description: "Most of our internships qualify for academic credit at partner universities.",
    },
    {
      icon: <Users size={32} />,
      title: "Mentorship",
      description: "Work directly with experienced professionals who will guide your development.",
    },
    {
      icon: <Award size={32} />,
      title: "Real Impact",
      description: "Your work will directly contribute to improving urban mobility in your community.",
    },
    {
      icon: <Clock size={32} />,
      title: "Flexible Hours",
      description: "We offer part-time options that work around your class schedule.",
    },
  ]

  const testimonials = [
    {
      name: "Alex Johnson",
      university: "State University",
      program: "Mechanical Engineering",
      quote:
        "My internship at BikeShare gave me hands-on experience that my classes couldn't provide. I learned so much about sustainable transportation and even helped design a new locking mechanism that's now being implemented across the fleet.",
      image: "https://placehold.co/100x100",
    },
    {
      name: "Maya Patel",
      university: "City College",
      program: "Business Administration",
      quote:
        "Working with the operations team showed me how a modern mobility company functions. I was able to apply my classroom knowledge to real-world challenges and even led a project that improved bike distribution efficiency by 15%.",
      image: "https://placehold.co/100x100",
    },
    {
      name: "Carlos Rodriguez",
      university: "Tech Institute",
      program: "Economics",
      quote:
        "As a finance intern, I gained invaluable experience analyzing usage data and helping develop pricing strategies. The team valued my input and I was able to make meaningful contributions while building my professional skills.",
      image: "https://placehold.co/100x100",
    },
  ]

  return (
    <div className={styles.internshipsPage}>
      <div className={styles.internshipsHero}>
        <div className={styles.internshipsHeroContent}>
          <h1>Student Internships</h1>
          <p>Launch your career with hands-on experience in sustainable transportation</p>
        </div>
      </div>

      <div className={styles.internshipsContainer}>
        <div className={styles.internshipsIntro}>
          <div className={styles.internshipsIconContainer}>
            <GraduationCap size={48} />
          </div>
          <h2>Build your future with BikeShare</h2>
          <p>
            We offer meaningful internship opportunities for college students studying mechanical engineering,
            administration, economics, and accounting. Gain real-world experience while contributing to sustainable
            urban mobility solutions that make a difference in your community.
          </p>
        </div>

        <div className={styles.programsSection}>
          <h3>Internship Programs</h3>
          <div className={styles.programsList}>
            {internshipTypes.map((internship) => (
              <div key={internship.id} className={styles.programCard}>
                <div className={styles.programHeader}>
                  <div className={styles.programIcon}>{internship.icon}</div>
                  <h4>{internship.title}</h4>
                  <p className={styles.programField}>{internship.field}</p>
                </div>
                <div className={styles.programContent}>
                  <p className={styles.programDescription}>{internship.description}</p>
                  <div className={styles.programDetails}>
                    <div className={styles.programResponsibilities}>
                      <h5>Responsibilities</h5>
                      <ul>
                        {internship.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.programRequirements}>
                      <h5>Requirements</h5>
                      <ul>
                        {internship.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button className={styles.programButton}>Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.benefitsSection}>
          <h3>Why Intern With Us?</h3>
          <div className={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{benefit.icon}</div>
                <div className={styles.benefitContent}>
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.testimonialsSection}>
          <h3>Hear From Our Interns</h3>
          <div className={styles.testimonialsList}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialImage}>
                    <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                  </div>
                  <div className={styles.testimonialInfo}>
                    <h4>{testimonial.name}</h4>
                    <p>
                      {testimonial.program}, {testimonial.university}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.applicationSection}>
          <h3>Application Process</h3>
          <div className={styles.applicationSteps}>
            <div className={styles.applicationStep}>
              <div className={styles.stepNumber}>1</div>
              <h4>Submit Application</h4>
              <p>Complete our online application form with your resume and cover letter.</p>
            </div>
            <div className={styles.applicationStep}>
              <div className={styles.stepNumber}>2</div>
              <h4>Interview</h4>
              <p>Selected candidates will be invited for a virtual or in-person interview.</p>
            </div>
            <div className={styles.applicationStep}>
              <div className={styles.stepNumber}>3</div>
              <h4>Placement</h4>
              <p>Successful applicants will be matched with the appropriate department.</p>
            </div>
            <div className={styles.applicationStep}>
              <div className={styles.stepNumber}>4</div>
              <h4>Onboarding</h4>
              <p>Begin your internship with a comprehensive orientation program.</p>
            </div>
          </div>
        </div>

        <div className={styles.internshipsCTA}>
          <h3>Ready to jumpstart your career?</h3>
          <p>
            Apply for our internship program today and gain valuable experience in the sustainable mobility industry.
          </p>
          <div className={styles.internshipsButtons}>
            <button className={styles.primaryButton}>Apply Now</button>
            <button className={styles.secondaryButton}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternshipsPage
