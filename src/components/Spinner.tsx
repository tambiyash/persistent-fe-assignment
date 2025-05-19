import { MoonLoader } from "react-spinners";

const Spinner: React.FC = ({ size = 50 }: { size?: number }) => {
  return (
    <MoonLoader data-testid="spinner" color="#000000" loading={true} size={size} />
  );
};

export default Spinner;