import Link from "next/link";
import Image from "next/image";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({headers: await headers() })

    if(session?.user) redirect('/')

    return (
        <main className="auth-layout">
            <div className="flex min-h-screen">
                {/* Left Section */}
                <section className="auth-left-section scrollbar-hide-default flex flex-col w-full lg:w-1/2 p-6 lg:p-12">
                    <Link href="/" className="auth-logo mb-8">
                        <Image
                            src="/public/assets/icons/logo.svg"
                            alt="Signalist logo"
                            height={32}
                            width={140}
                            className="h-8 w-auto"
                        />
                    </Link>

                    <div className="pb-6 lg:pb-8 flex-1">
                        {children}
                    </div>
                </section>

                {/* Right Section */}
                <section className="auth-right-section hidden lg:flex flex-col w-1/2 p-12 relative">
                    <div className="z-10 relative lg:mt-4 lg:mb-16">
                        <blockquote className="auth-blockquote text-xl font-medium text-gray-800 mb-4">
                            Signalist turned my watchlist into a winning list. The alerts are spot-on, and I feel more confident making moves in the market
                        </blockquote>

                        <div className="flex items-center justify-between">
                            <div>
                                <cite className="auth-testimonial-author font-semibold text-gray-900">
                                    --Ethan R.
                                </cite>
                                <p className="text-sm text-gray-500 max-md:text-xs">
                                    Retail Investor
                                </p>
                            </div>

                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Image
                                        src="/public/assets/icons/star.svg"
                                        alt="star"
                                        key={star}
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative mt-auto">
                        <Image
                            src="/public/assets/images/dashboard.png"
                            alt="dashboard preview"
                            width={1440}
                            height={1150}
                            className="auth-dashboard-preview absolute top-0 right-0 w-full h-auto max-w-none"
                        />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Layout;