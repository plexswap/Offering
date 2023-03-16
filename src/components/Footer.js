
import React from "react";
const Footer = () => {

    return (
        <footer className="bg-[#222222] body-font mt-3 w-full ">
            <div className="text-[#ffffff]bg-opacity-40">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-between">
                    <p className="text-[#ffffff] text-sm text-center sm:text-left">© {new Date().getFullYear()} SYMPLEXIA Laboratory of Prospecting and Experimentation of New Ideas   
                    
                    </p>
                    <span className="inline-flex sm:mt-0 mt-2 justify-center sm:justify-start">
                        <a 
                            href={`https://www.facebook.com/symplexia`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 text-[#ffffff] hover:text-[#FFC11A]">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a 
                            href={`https://twitter.com/symplexia`}
                            target="_blank"
                            rel="noopener noreferrer"                           
                            className="ml-3 text-[#ffffff] hover:text-[#FFC11A]">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a
                            href={`https://www.instagram.com/symplexia`}
                            target="_blank"
                            rel="noopener noreferrer"                           
                            className="ml-3 text-[#ffffff] hover:text-[#FFC11A]">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a 
                            href={`https://t.me/plexswap_us`}
                            target="_blank"
                            rel="noopener noreferrer"                           
                            className="ml-3 text-[#ffffff] hover:text-[#FFC11A]">
                            <svg  fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 16 16"> 
                                 <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"></path> 
                            </svg>
                        </a>
                    </span>
                    <p className="text-[#ffffff] text-xs text-center sm:text-left mt-2 sm:mt-0">Powered by:&nbsp; 
                        <a href="#" className="text-blue-600 hover:text-blue-200"><i>bRd Digitech</i></a>
                    </p>
                </div> 
            </div>
        </footer>
    )
}

export default Footer