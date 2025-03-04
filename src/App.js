import React, { useState, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import SideBar from './components/SideBar.js';
import Main from './Page/Main.js';
import Finder from './components/Finder.js';  
import VideoDetail from './Page/VideoDetail.js';
import { CustomThemeProvider, useTheme } from './context/themeProvider.js';
import { GlobalStyle } from './theme/GlobalStyle.js';
// import TestComponent from './components/TestComponent.js';

function App() {
  return (
    <div className="App">
      <CustomThemeProvider>
        <GlobalStyle/>
        <Routes>
          <Route path="/*" element={<AppLayout />} >
            <Route path='*' element={<Main/>}/>
            <Route path='search/:searchTerm' element={<Finder />} /> {/* 검색 */}
            <Route path='watch/:videoId' element={<VideoDetail/>} /> {/* 개별 동영상 상세 */}
          </Route>
        </Routes>
      </CustomThemeProvider>
    </div>
  );
}

function AppLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
        setIsSidebarExpanded(false);
      } else {
        setIsMobileView(false);
        setIsSidebarCollapsed(false);
        setIsSidebarExpanded(true);
      }
    };

    handleResize(); // 초기 체크
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => {
    if (isMobileView) {
      setIsSidebarExpanded(!isSidebarExpanded);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  // 다크모드 토글
  const {themeMode, toggleTheme} = useTheme();

  return (
    <div className={`app-layout ${isSidebarExpanded ? 'expanded' : 'collapsed'} ${isMobileView ? 'mobile' : ''}`}>
      <Header setIsSidebarExpanded={handleSidebarToggle} isSidebarExpanded={isSidebarExpanded} 
        themeMode={themeMode} toggleTheme={toggleTheme}/>
      <SideBar isSidebarCollapsed={isSidebarCollapsed} isSidebarExpanded={isSidebarExpanded} />
      <main className="main-content">
        <Outlet />
      </main>
      {/* <TestComponent/> */}
    </div>
  );
}

export default App;
