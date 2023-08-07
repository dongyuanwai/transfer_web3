"use client";
import { useState } from "react";
import Image from "next/image";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose, AiFillGithub, AiFillTwitterCircle,AiOutlineWechat } from "react-icons/ai";
import { TbBrandJuejin } from "react-icons/tb";


const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const jump = () => {
    window.open("https://github.com/dongyuanwai/transfer_web3")
  }
  const jumpTwritter = () => {
    window.open("https://twitter.com/dongyuanwai")
  }
  const jumpJuejin = () => {
    window.open("https://juejin.cn/user/3966693685594072/posts")
  }
  const jumpWeChat = ()=>{
    window.open("https://i.postimg.cc/ydZXWwJ1/web3wechat.png")
  }
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Image src="/logo.png" width={200} height={80} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <li className={`mx-4 cursor-pointer flex items-center`} onClick={jumpWeChat}>
          <AiOutlineWechat fontSize={24} className="mr-2" />
          WeChat
        </li>
        
        <li className={`mx-4 cursor-pointer flex items-center`} onClick={jumpJuejin}>
          <TbBrandJuejin fontSize={24} className="mr-2" />
          Juejin
        </li>
        <li className={`mx-4 cursor-pointer flex items-center`} onClick={jumpTwritter}>
          <AiFillTwitterCircle fontSize={24} className="mr-2" />
          Twritter
        </li>
        <li className={`mx-4 cursor-pointer flex items-center`} onClick={jump}>
          <AiFillGithub fontSize={24} className="mr-2" />
          GitHub
        </li>
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"  onClick={jumpWeChat}>
          Contact me
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>

            <li className={`mx-4 cursor-pointer flex items-center`} onClick={jumpJuejin}>
              <TbBrandJuejin fontSize={24} className="mr-2" />
              Juejin
            </li>
            <li className={`mx-4 cursor-pointer flex items-center`} onClick={jumpTwritter}>
              <AiFillTwitterCircle fontSize={24} className="mr-2" />
              Twritter
            </li>
            <li className={`mx-4 cursor-pointer flex items-center`} onClick={jump}>
              <AiFillGithub fontSize={24} className="mr-2" />
              GitHub
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;