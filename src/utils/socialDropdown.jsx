import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'; // Caret up icon
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'; // Social media icons

const SocialDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  const socialMediaIcons = [
    { name: 'Twitter', icon: faTwitter, url: 'https://twitter.com' },
    { name: 'GitHub', icon: faGithub, url: 'https://github.com' },
    { name: 'LinkedIn', icon: faLinkedin, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: faInstagram, url: 'https://instagram.com' },
  ];

  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        className="rounded-md w-12 h-12 bg-[#313338] text-white flex items-center justify-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faCaretSquareUp} className="w-6 h-6" />
      </button>

      {/* Dropdown menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
      >
        <div className="absolute z-10 mt-2 w-36 rounded-md shadow-lg bg-[#313338] ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {socialMediaIcons.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900"
              >
                <FontAwesomeIcon icon={social.icon} className="mr-2" />
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default SocialDropdown;
