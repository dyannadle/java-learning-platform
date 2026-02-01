import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { ModuleOneIntro } from './modules/ModuleOneIntro';
import { ModuleTwoVariables } from './modules/ModuleTwoVariables';
import { ProjectsGallery } from './pages/ProjectsGallery';
import { CodePlayground } from './pages/CodePlayground';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/learn" element={<div className="p-10 text-center text-slate-500">Learning Path Dashboard (Coming Soon) - <a href="/learn/module-1" className="text-blue-500 hover:underline">Try Module 1</a></div>} />
          <Route path="/learn/module-1" element={<ModuleOneIntro />} />
          <Route path="/learn/module-2" element={<ModuleTwoVariables />} />
          <Route path="/projects" element={<ProjectsGallery />} />
          <Route path="/playground" element={<CodePlayground />} />
          <Route path="*" element={<div className="p-10 text-center text-slate-500">404: Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
