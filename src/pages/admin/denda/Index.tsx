import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../store/themeConfigSlice";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Denda'));
  });

  return (
    <>
      <h1>Denda</h1>
    </>
  );
};

export default Index;
