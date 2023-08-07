
"use client"
import {  AiFillGithub, AiFillTwitterCircle,AiOutlineWechat } from "react-icons/ai";
import { TbBrandJuejin } from "react-icons/tb";
import Image from "next/image";

const Footer = () => {
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
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <Image src="/logo.png"  width={200} height={80}  alt="logo" className="w-32" />
        </div>
        <ul className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full text-white">
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
        </ul>
      </div>

      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">Personal learning works, looking forward to communicating together</p>
        <p className="text-white text-sm text-center font-medium mt-2">Dong Yuanwai</p>
      </div>

      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-xs">@Dong Yuanwai</p>
        <p className="text-white text-right text-xs">All rights reserved</p>
      </div>
    </div>
  )

};

export default Footer;