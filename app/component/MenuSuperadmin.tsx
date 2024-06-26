import Link from "next/link";
import Buttonlogout from "./Buttonlogout";

export default function MenuSuperadmin() {

    return (
        <div className="deznav">
            <div className="deznav-scroll">
                <ul className="metismenu" id="menu">
                    <li className="menu-title">System</li>
                    <li>
                        <Link href="/" className="" aria-expanded="false">
                            <div className="menu-icon">
                                <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                                    <path d="M3.29077 9L12.2908 2L21.2908 9V20C21.2908 20.5304 21.0801 21.0391 20.705 21.4142C20.3299 21.7893 19.8212 22 19.2908 22H5.29077C4.76034 22 4.25163 21.7893 3.87656 21.4142C3.50149 21.0391 3.29077 20.5304 3.29077 20V9Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.29077 22V12H15.2908V22" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="nav-text">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <a href="#master" className="has-arrow " aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    width={25} height={24}
                                >
                                    <path d="M21 5 A9 3 0 0 1 12 8 A9 3 0 0 1 3 5 A9 3 0 0 1 21 5 z" />
                                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                </svg>

                            </div>
                            <span className="nav-text">Master Data</span>
                        </a>
                        <ul aria-expanded="false" id="master">
                            <li className="mini-dashboard">Master Data</li>
                            <li>
                                <Link href="/superadmin/simpatisan">Data Simpatisan</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#master" className="has-arrow " aria-expanded="false">
                            <div className="menu-icon">
                            <svg width={25} height={24} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14.59 9.535a3.053 3.053 0 011.127-4.164l-1.572-2.723a3.017 3.017 0 01-1.529.414A3.052 3.052 0 019.574 0H6.429a3.009 3.009 0 01-.406 1.535c-.839 1.454-2.706 1.948-4.17 1.106L.281 5.364a3 3 0 011.123 1.117 3.053 3.053 0 01-1.12 4.16l1.572 2.723c.448-.261.967-.41 1.522-.41A3.052 3.052 0 016.42 16h3.145a3.012 3.012 0 01.406-1.519 3.053 3.053 0 014.163-1.11l1.572-2.723a3.008 3.008 0 01-1.116-1.113zM8 11.24a3.24 3.24 0 110-6.48 3.24 3.24 0 010 6.48z"
                                    />
                                </svg>

                            </div>
                            <span className="nav-text">Setup</span>
                        </a>
                        <ul aria-expanded="false" id="master">
                            <li className="mini-dashboard">Setup</li>
                            <li>
                                <Link href="/superadmin/admin">Tambah Admin</Link>
                            </li>
                            
                        </ul>
                    </li>

                    <li>
                        <a href="#master" className="has-arrow " aria-expanded="false">
                            <div className="menu-icon">
                                <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.6209 16.593H4.32019" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.4313 6.90066H19.732" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.01706 6.84625C9.01706 5.5506 7.9589 4.5 6.65392 4.5C5.34893 4.5 4.29077 5.5506 4.29077 6.84625C4.29077 8.14191 5.34893 9.19251 6.65392 9.19251C7.9589 9.19251 9.01706 8.14191 9.01706 6.84625Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.2907 16.5533C20.2907 15.2576 19.2334 14.207 17.9284 14.207C16.6226 14.207 15.5645 15.2576 15.5645 16.5533C15.5645 17.8489 16.6226 18.8995 17.9284 18.8995C19.2334 18.8995 20.2907 17.8489 20.2907 16.5533Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="nav-text">App Setting</span>
                        </a>
                        <ul aria-expanded="false" id="master">
                            <li className="mini-dashboard">App Setting</li>
                            <li>
                                <Link href="/superadmin/slide">Slide</Link>
                            </li>
                            <li>
                                <Link href="/superadmin/pengumuman">Pengumuman</Link>
                            </li>
                            <li>
                                <Link href="/superadmin/berita">Berita</Link>
                            </li>
                        </ul>
                    </li>

                </ul>
                <div className="switch-btn">
                    <Link href="">
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18.36 6.63965C19.6184 7.89844 20.4753 9.50209 20.8223 11.2478C21.1693 12.9936 20.9909 14.803 20.3096 16.4474C19.6284 18.0918 18.4748 19.4972 16.9948 20.486C15.5148 21.4748 13.7749 22.0026 11.995 22.0026C10.2151 22.0026 8.47515 21.4748 6.99517 20.486C5.51519 19.4972 4.36164 18.0918 3.68036 16.4474C2.99909 14.803 2.82069 12.9936 3.16772 11.2478C3.51475 9.50209 4.37162 7.89844 5.63 6.63965"
                                stroke="#252525"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 2V12"
                                stroke="#252525"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span><Buttonlogout /></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
