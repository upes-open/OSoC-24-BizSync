import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-6">
      <div className="flex flex-wrap justify-between items-center w-full">
        <div className="flex flex-col pb-4 flex-1 min-w-[200px]">
          <p className="text-xl font-bold mb-4">BizSync</p>
          <ul className="list-none md:flex-row flex flex-col gap-8 m-0">
            <li>
              <a href="#" className="text-white no-underline">
                &copy;
              </a>

              <a href="#bizsync2024" className="text-white no-underline">
                BizSync 2024
              </a>
            </li>
            <li>
              <a href="#privacy-policy" className="text-white no-underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#cookies-policy" className="text-white no-underline">
                Cookies Policy
              </a>
            </li>
            <li>
              <a href="#terms-of-use" className="text-white no-underline">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 flex-1 min-w-[200px] md:justify-end relative -bottom-4">
          <a href="#facebook" className="social-icon">
            <img
              src="https://img.icons8.com/?size=100&id=118466&format=png&color=FFFFFF"
              alt="Facebook"
              className="w-8 h-8"
            />
          </a>
          <a href="#" className="social-icon">
            <img
              src="https://img.icons8.com/?size=100&id=YfCbGWCWcuar&format=png&color=FFFFFF"
              alt="Twitter"
              className="w-8 h-8"
            />
          </a>
          <a href="#instagram" className="social-icon">
            <img
              src="https://img.icons8.com/?size=100&id=85154&format=png&color=FFFFFF"
              alt="Instagram"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
