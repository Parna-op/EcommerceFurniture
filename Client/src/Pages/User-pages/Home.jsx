import Hero from '../../Components/User-view/Hero'
import  Footer  from '../../Components/User-view/Footer'
import ItemSection from '../../Components/User-view/ItemSection'
import AboutSection from '../../Components/User-view/Aboutus'

function Home() {
  return (
    <div className='flex flex-col w-full min-h-screen overflow-hidden bg-gray-50'> 
      
      <div id="hero" className='w-full'>
         <Hero/>
      </div>

      <div className="relative z-20 flex flex-col w-full gap-12 bg-white shadow-2xl md:gap-0 rounded-t-3xl md:rounded-none">
        
        <div className="mt-8 md:mt-0">
           <ItemSection section={"BestSeller"} filteredProducts={"bestSellingProduct"} />
        </div>
        
        <div>
           <ItemSection section={"Trending Product"} filteredProducts={"newproduct"} />
        </div>
        
        <div className="px-4 md:px-0">
           <AboutSection/>
        </div>
        
        
        <div id="footer" className="w-full mt-auto">
          <Footer/>
        </div>

      </div>
      
    </div>
  )
}

export default Home