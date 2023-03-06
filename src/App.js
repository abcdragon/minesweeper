import { MineInfoProvider } from './lib/MineInfoContext';
import MineMap from './components/MineMap';

import { Header } from './components/Header';

function App() {
  return (
    <div>
      <MineInfoProvider>
        <Header />
        <MineMap />
      </MineInfoProvider>
    </div>
  );
}

export default App;
