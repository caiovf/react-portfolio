import React, { useEffect} from 'react';
import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { Footer } from './components/footer'; 
import { Home } from './pages/home';
import { About } from './pages/about';
import { Portfolio } from './pages/portfolio';
import { PortfolioSingle } from './pages/portfolio-single';

function App() {
	function ScrollToTop({ children }) {
		const location = useLocation();
		useEffect(() => {
			window.scrollTo(0, 0);
		}, [location.pathname]);
	
		return children;
	}
	
  	return (
		<Router>
			<ScrollToTop>
				<Header />		
					<main className='layout-main'>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/portfolio" element={<Portfolio />} />
							<Route path="/portfolio/:slug" element={<PortfolioSingle />} />
							<Route path="/portfolio/category/:category" element={<Portfolio />} />							
							<Route path="/advancing-skills" element={<Portfolio />} />
						</Routes>
					</main>
				<Footer />
			</ScrollToTop>
		</Router>
	);
}

export default App;