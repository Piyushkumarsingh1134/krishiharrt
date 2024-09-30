export default function Footer() {
    return (
      <div className="bg-lime-950 flex flex-wrap justify-around py-8 text-white">
        {/* About Section */}
        <div className="flex-1 w-1/4 mx-4">
          <h3 className="text-lg font-semibold mb-2 text-left ">About KrishiHatt</h3>
          <p className="text-sm text-justify leading-relaxed">
            KrishiHatt is an independent and unbiased business organisation owned by KrishiHattteam which doesn’t aim to push, promote or benefit any particular product or a business house. Its sole purpose is to bridge the gap between the consumers and companies by providing each an equally transparent platform to benefit from.
          </p>
        </div>
  
        {/* Quick Links Section */}
        <div className="flex-1 w-1/4 mx-4 text-center">
          <h3 className="text-lg font-semibold mb-2 ">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="text-sm hover:text-gray-300">FAQs</a></li>
            <li><a href="#" className="text-sm hover:text-gray-300">Contact Us</a></li>
          </ul>
        </div>
  
        {/* Store Information Section */}
        <div className="flex-1 w-1/4 mx-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Store Information</h3>
          <p className="text-sm leading-relaxed">MMDU Mullana, Haryana, India</p>
          <p className="text-sm leading-relaxed">+91 12345 67890</p>
          <p className="text-sm leading-relaxed">info@krishibazaar.in</p>
        </div>
      </div>
    );
  }
  