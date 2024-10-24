import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function NotFound() {
  return (
    <>
      <div className="container mx-auto flex justify-center items-center h-96">
        <div>
          <h1 className="text-4xl">Page Not found</h1>
          <button className="text-sm mt-10 text-blue-700"><Link to="/"><span className="mr-2">Go back to the home page!!</span><ArrowForwardIcon /></Link></button>
        </div>
      </div>
    </>
  );
}
