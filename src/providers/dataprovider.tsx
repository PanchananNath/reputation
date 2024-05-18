"use client";
import { User } from "@/model/model";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = React.createContext<{
  user: User;
  userid: string;
  setUserid: (userid: string) => void;
  
}>({
  user: {
    id: 0,
    username: "",
    name: "",
    email: "",
    type: "subscriber",
    password: "",
  },
    userid: "0",
    setUserid: () => {},
});

export function DataProvider({ children }: { children: ReactNode }) {
    const [userid, setUserid] = useState<string>("0");
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    name: "",
    email: "",
    type: "subscriber",
    password: "",
  });

  useEffect(() => {
    if (userid && userid !== "0") {
      fetch(`/api/getuser?userid=${userid}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          console.log(data);
        });
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        userid,
        setUserid,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
