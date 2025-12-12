import React from 'react'
import Hero from '../components/Hero'
import ProductsSection from '../components/ProductSection'
import CustomerFeedback from '../components/CustomerFeedBack'
import HowItWorks from '../components/HowItWorks'
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'

const Home = () => {
  return (
    <div>
        <Hero/>
        <ProductsSection/>
        <AboutUs/>
        <CustomerFeedback/>
        <HowItWorks/>
        <ContactUs/>
    </div>
  )
}

export default Home