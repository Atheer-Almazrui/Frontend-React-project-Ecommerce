import '../styles/heroSection.scss'

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="content-wrapper">
        <div className="hero-content">
          <h1>Welcome to Electronics Home</h1>
          <p>Discover the latest electronics for your smart home.</p>
          <button className="hero-btn">Shop Now</button>
        </div>
        <div className="image-container">
          <img className="hero-image" src="src\assets\hero-img.png" alt="Hero Image" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
