import { Link } from 'react-router-dom';
import { publicAsset } from '../../../utils/publicAsset';

export const FooterLogo: React.FC = () => {
  return (
    <Link to="/" className="cursor-pointer block shrink-0 ">
      <img
        src={publicAsset('/img/Logo.svg')}
        alt="Nice Gadgets"
        className="w-22.25 h-8 object-contain dark:hidden"
      />
      <img
        src={publicAsset('/img/Logo-dark.svg')}
        alt="Nice Gadgets"
        className="w-22.25 h-8 object-contain hidden dark:block"
      />
    </Link>
  );
};
