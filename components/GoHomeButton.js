import { useRouter } from "next/router";
import { FaArrowLeft } from 'react-icons/fa';

const GoHomeButton = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.back(); 
  };

  return (
    <button
      onClick={handleGoHome}
      className="fixed left-20 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full p-4 shadow-lg transition-transform duration-300 hover:translate-x-[-10px]"
    >
      <FaArrowLeft />
    </button>
  );
};

export default GoHomeButton;
