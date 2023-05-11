import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mantine/core';
import { logout } from '../Actions/auth';

function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const UserContent = () => {
    return (
      <div className="flex flex-col justify-center items-center mt-28">
        <div className="text-2xl font-semibold">
          You are currently logged in with following Email
        </div>
        <div className="bg-gray-200 py-2 px-4 rounded-md text-lg mt-5 font-mono font-semibold text-black">
          {user.email}
        </div>
        <Button
          onClick={logOut}
          size="lg"
          className="bg-slate-800 hover:bg-slate-700 mt-6"
        >
          Logout
        </Button>
      </div>
    );
  };

  const DefaultContent = () => {
    return (
      <div className="flex flex-col justify-center items-center mt-28">
        <div className="text-2xl font-semibold">
          You are currently not logged In
        </div>
        <Link to="/login">
          <Button size="lg" className="bg-slate-800 hover:bg-slate-700 mt-6">
            Login Now!
          </Button>
        </Link>
      </div>
    );
  };

  return <div>{isLoggedIn ? <UserContent /> : <DefaultContent />}</div>;
}

export default Home;
