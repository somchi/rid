import './App.css';
import { Content } from './components/content';
import { Sidebar } from './components/sidebar';

function App() {
  return (
    <div className="container">
      <Sidebar />
      <Content />
    </div>
  );
}
export default App;
