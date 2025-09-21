import logo from '../../assets/TheBrasserieVineyardLogo500x220.png';
import CircleButton from '../ui/CircleButton';



const HeaderSection = () => {
  const onCloseWebExtension = () => {
    // Logic to be added:
  };

  return (
    <header className="relative flex items-center justify-center bg-gray-100 p-4 border-b border-gray-200 h-20">
      {/* CircleButton in top-right corner */}
      <div className="absolute top-5 right-10">
        <CircleButton onButtonClick={onCloseWebExtension} />
      </div>

      {/* Centered logo */}
      <img src={logo} className="h-18 object-contain" />
    </header>
  );
};

export default HeaderSection;