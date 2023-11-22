import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SigninForm = () => {
  return (
    <Link to={"/sign-up"}>
      <Button className="button shad-button_primary">Go to Sign Up</Button>
    </Link>
  );
};

export default SigninForm;
