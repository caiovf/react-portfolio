import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { Footer } from './components/footer'; 
import { Home } from './pages/home';
import { About } from './pages/about';
import { Portfolio } from './pages/portfolio';

function App() {
  return (
    <Router>
		<Header />		
			<main className='layout-main'>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/portfolio" element={<Portfolio />} />
					<Route path="/portfolio/:slug" element={<Portfolio />} />
				</Routes>
			</main>
		<Footer />
    </Router>
  );
}

export default App;