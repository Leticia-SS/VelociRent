import { Users, Leaf, MapPin, Calendar, Heart, Lightbulb } from "lucide-react"
import styles from "./about-page.module.css"

const AboutPage = () => {
  const values = [
    {
      icon: <Leaf size={40} />,
      title: "Sustainability",
      description: "We're committed to reducing carbon emissions and promoting eco-friendly transportation solutions.",
    },
    {
      icon: <Users size={40} />,
      title: "Community",
      description: "Building stronger communities by connecting people and making cities more accessible for everyone.",
    },
    {
      icon: <Heart size={40} />,
      title: "Health & Wellness",
      description: "Encouraging active lifestyles and promoting physical and mental well-being through cycling.",
    },
    {
      icon: <Lightbulb size={40} />,
      title: "Innovation",
      description: "Continuously improving our technology and services to provide the best user experience.",
    },
  ]

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "BikeShare was established with a vision to transform urban mobility.",
    },
    {
      year: "2020",
      title: "First 100 Bikes",
      description: "Launched our pilot program with 100 bikes across 10 stations in downtown.",
    },
    {
      year: "2021",
      title: "City Expansion",
      description: "Expanded to 500 bikes and 50 stations, covering major neighborhoods.",
    },
    {
      year: "2022",
      title: "Student Program",
      description: "Launched our internship program for college students.",
    },
    {
      year: "2023",
      title: "1 Million Rides",
      description: "Celebrated our 1 millionth ride and continued growing our community.",
    },
    {
      year: "2024",
      title: "Regional Network",
      description: "Expanded to neighboring cities, creating a regional bike-sharing network.",
    },
  ]

  const team = [
    {
      name: "Sarah Chen",
      position: "CEO & Founder",
      bio: "Former urban planner with 10+ years of experience in sustainable transportation.",
      image: "https://placehold.co/200x200",
    },
    {
      name: "Marcus Rodriguez",
      position: "CTO",
      bio: "Tech entrepreneur passionate about mobility solutions and smart city technologies.",
      image: "https://placehold.co/200x200",
    },
    {
      name: "Emily Johnson",
      position: "Head of Operations",
      bio: "Operations expert with a background in logistics and supply chain management.",
      image: "https://placehold.co/200x200",
    },
    {
      name: "David Kim",
      position: "Head of Maintenance",
      bio: "Mechanical engineer specializing in bike technology and fleet management.",
      image: "https://placehold.co/200x200",
    },
  ]

  const stats = [
    {
      number: "2,500+",
      label: "Bikes in Fleet",
    },
    {
      number: "150+",
      label: "Station Locations",
    },
    {
      number: "50,000+",
      label: "Active Users",
    },
    {
      number: "2M+",
      label: "Total Rides",
    },
  ]

  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutHero}>
        <div className={styles.aboutHeroContent}>
          <h1>About BikeShare</h1>
          <p>Transforming urban mobility through sustainable, accessible, and innovative bike-sharing solutions</p>
        </div>
      </div>

      <div className={styles.aboutContainer}>
        <div className={styles.missionSection}>
          <div className={styles.missionContent}>
            <div className={styles.missionText}>
              <h2>Our Mission</h2>
              <p>
                At BikeShare, we believe that sustainable transportation should be accessible to everyone. Our mission
                is to reduce urban congestion, lower carbon emissions, and promote healthier lifestyles by providing
                convenient, affordable, and reliable bike-sharing services.
              </p>
              <p>
                We're not just a transportation company – we're building a movement towards more livable, sustainable
                cities where people can move freely while caring for our planet.
              </p>
            </div>
            <div className={styles.missionImage}>
              <img src="https://placehold.co/500x400" alt="BikeShare mission" />
            </div>
          </div>
        </div>

        <div className={styles.statsSection}>
          <h3>Our Impact</h3>
          <div className={styles.statsList}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.valuesSection}>
          <h3>Our Values</h3>
          <div className={styles.valuesList}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.timelineSection}>
          <h3>Our Journey</h3>
          <div className={styles.timeline}>
            {milestones.map((milestone, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{milestone.year}</div>
                <div className={styles.timelineContent}>
                  <h4>{milestone.title}</h4>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.teamSection}>
          <h3>Meet Our Team</h3>
          <div className={styles.teamList}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImage}>
                  <img src={member.image || "/placeholder.svg"} alt={member.name} />
                </div>
                <div className={styles.teamInfo}>
                  <h4>{member.name}</h4>
                  <p className={styles.teamPosition}>{member.position}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.contactSection}>
          <h3>Get in Touch</h3>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={24} />
                <div>
                  <h4>Headquarters</h4>
                  <p>123 Green Street, Eco City, EC 12345</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Calendar size={24} />
                <div>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Weekend: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <div className={styles.contactForm}>
              <h4>Send us a message</h4>
              <form className={styles.form}>
                <input type="text" placeholder="Your Name" className={styles.formInput} />
                <input type="email" placeholder="Your Email" className={styles.formInput} />
                <textarea placeholder="Your Message" rows={4} className={styles.formTextarea}></textarea>
                <button type="submit" className={styles.formButton}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.aboutCTA}>
          <h3>Join the BikeShare Community</h3>
          <p>Be part of the sustainable transportation revolution. Download our app and start riding today!</p>
          <div className={styles.aboutButtons}>
            <button className={styles.primaryButton}>Download App</button>
            <button className={styles.secondaryButton}>View Locations</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
