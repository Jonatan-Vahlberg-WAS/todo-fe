import React from 'react'
import Head from 'next/head'

interface LayoutProps {
    pageTitle?: string
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
    return (
        <div className="bg-white h-screen w-screen">
            <Head>
                <title>{pageTitle ?? 'Todo'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-w-4xl mx-auto h-screen p-4">
                <p className="text-3xl mb-5 font-semibold">Todo</p>

                {children}
            </div>
        </div>
    )
}

export default Layout
