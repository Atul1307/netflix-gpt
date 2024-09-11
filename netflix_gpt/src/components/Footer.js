import { FiGithub, FiLinkedin } from 'react-icons/fi';

const socialLinks = [
  {
    id: 1,
    icon: <FiGithub />,
    url: 'https://github.com/Atul1307',
  },
  {
    id: 2,
    icon: <FiLinkedin />,
    url: 'https://www.linkedin.com/in/atulsharma14/',
  },
];

const Footer = () => {
  return (
    <div className=' bg-black'>
      <div className='p-6 sm:p-4 '>
        <div className='flex font-general-regular flex-row justify-center items-center gap-4'>
          <p className='flex text-2xl sm:text-xl text-[#1DB9C3] italic dark:text-primary-light'>
            Developed by Atul
          </p>
          <ul className='flex gap-4'>
            {socialLinks.map((link) => (
              <a
                href={link.url}
                target='__blank'
                key={link.id}
                className='text-gray-400 hover:text-[#1DB9C3] dark:hover:text-[#1DB9C3] cursor-pointer rounded-lg bg-black hover:bg-white shadow-sm p-1.5 duration-300'
              >
                <i className='text-sm sm:text-2xl md:text-l'>{link.icon}</i>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
