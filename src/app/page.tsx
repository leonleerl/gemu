export default function Home() {
  return (
<>
  <nav className="bg-white/80 backdrop-blur-md fixed top-0 left-0 w-full z-10 shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0 text-lg font-semibold text-gray-800">Shiritori Learning</div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-800 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-800 hover:text-blue-600">Learn</a>
          <a href="#" className="text-gray-800 hover:text-blue-600">Practice</a>
          <a href="#" className="text-gray-800 hover:text-blue-600">History</a>
          <a href="#" className="text-gray-800 hover:text-blue-600">Profile</a>
        </div>
      </div>
    </div>
  </nav>


  <main className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Learn Shiritori with Ease</h1>
      <p className="mt-4 text-lg text-white/90 drop-shadow-lg">Master the art of wordplay in Japanese with interactive tools and fun games.</p>


      <div className="mt-6 max-w-2xl mx-auto">
        <input type="text" placeholder="Search Shiritori words..." className="w-full px-4 py-3 rounded-lg shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none" />
      </div>


      <div className="mt-6 flex justify-center space-x-4">
        <a href="#" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">Start Learning</a>
        <a href="#" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">Quick Practice</a>
      </div>
    </div>


    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800">こんにちは (Konnichiwa)</h2>
        <p className="mt-2 text-gray-600">Translation: Hello</p>
      </div>
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800">ありがとう (Arigatou)</h2>
        <p className="mt-2 text-gray-600">Translation: Thank you</p>
      </div>
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800">さくら (Sakura)</h2>
        <p className="mt-2 text-gray-600">Translation: Cherry Blossom</p>
      </div>
    </div>
  </main>


          {/* <Navbar></Navbar> */}
          <ruby>日本語<rt>にほんご</rt></ruby>の<ruby>勉強<rt>べんきょう</rt></ruby>
          </>
  );
}
